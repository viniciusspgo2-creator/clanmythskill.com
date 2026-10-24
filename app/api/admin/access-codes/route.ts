import {env} from '@/lib/platform';
import {isAdmin,sameOrigin} from '@/lib/admin-auth';
import {issueAccessCode,revokeAccessCode,type AccessCodeRecord} from '@/lib/stream-access-core';
import {z} from 'zod';
export async function GET(){
 if(!await isAdmin())return Response.json({error:'Acesso restrito.'},{status:403});
 if(!env.DB)return Response.json({error:'Banco de dados indisponível.'},{status:503});
 const rows=await env.DB.prepare('SELECT id,label,suffix,created_at,expires_at,revoked_at,last_used_at,use_count FROM stream_access_codes ORDER BY created_at DESC LIMIT 500').all<AccessCodeRecord>();
 return Response.json({codes:rows.results},{headers:{'Cache-Control':'no-store'}});
}
const action=z.discriminatedUnion('action',[
 z.object({action:z.literal('generate'),label:z.string().trim().min(2).max(100),days:z.number().int().min(1).max(365).nullable()}),
 z.object({action:z.literal('revoke'),id:z.string().uuid()}),
]);
export async function POST(req:Request){
 if(!await isAdmin()||!sameOrigin(req))return Response.json({error:'Acesso restrito.'},{status:403});
 if(!env.DB)return Response.json({error:'Banco de dados indisponível.'},{status:503});
 try{const body=action.parse(await req.json());if(body.action==='generate')return Response.json(await issueAccessCode(env.DB,body.label,body.days),{headers:{'Cache-Control':'no-store'}});await revokeAccessCode(env.DB,body.id);return Response.json({ok:true});}
 catch{return Response.json({error:'Não foi possível concluir a operação. Confira os dados.'},{status:400});}
}
