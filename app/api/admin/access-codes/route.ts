import {env} from '@/lib/platform';
import {getPrincipal,sameOrigin} from '@/lib/admin-auth';
import {issueAccessCode,revokeAccessCode,type AccessCodeRecord} from '@/lib/stream-access-core';
import {audit} from '@/lib/cms-store';
import {z} from 'zod';
export async function GET(){if((await getPrincipal())?.role!=='admin')return Response.json({error:'Acesso restrito.'},{status:403});if(!env.DB)return Response.json({error:'Banco de dados indisponível.'},{status:503});const rows=await env.DB.prepare('SELECT id,label,suffix,created_at,expires_at,revoked_at,last_used_at,use_count FROM stream_access_codes ORDER BY created_at DESC LIMIT 500').all<AccessCodeRecord>();return Response.json({codes:rows.results},{headers:{'Cache-Control':'no-store'}});}
const label=z.string().trim().min(2).max(100).transform(v=>v.replace(/<[^>]*>/g,''));
const action=z.discriminatedUnion('action',[
 z.object({action:z.literal('generate'),label,days:z.number().int().min(1).max(365).nullable(),count:z.number().int().min(1).max(50).default(1)}),
 z.object({action:z.literal('revoke'),id:z.string().uuid()}),
 z.object({action:z.literal('update'),id:z.string().uuid(),label,expiresAt:z.string().datetime().nullable()}),
]);
export async function POST(req:Request){const user=await getPrincipal();if(user?.role!=='admin'||!sameOrigin(req))return Response.json({error:'Acesso restrito.'},{status:403});if(!env.DB)return Response.json({error:'Banco indisponível.'},{status:503});try{const body=action.parse(await req.json());if(body.action==='generate'){const generated=[];for(let i=0;i<body.count;i++)generated.push(await issueAccessCode(env.DB,body.label+(body.count>1?' #'+(i+1):''),body.days));await audit(user.email,'access.generate','mithys',`${generated.length} código(s) criados. Valores completos não são registrados.`);return Response.json(body.count===1?generated[0]:{codes:generated},{headers:{'Cache-Control':'no-store'}});}if(body.action==='update'){await env.DB.prepare('UPDATE stream_access_codes SET label=?,expires_at=? WHERE id=? AND revoked_at IS NULL').bind(body.label,body.expiresAt,body.id).run();}else await revokeAccessCode(env.DB,body.id);await audit(user.email,'access.'+body.action,body.id,body.action==='revoke'?'Código revogado.':'Identificação ou validade atualizada.');return Response.json({ok:true});}catch{return Response.json({error:'Confira os dados da operação.'},{status:400});}}
