import {z} from 'zod';
import {isAdmin,sameOrigin} from '@/lib/admin-auth';
import {getStreaming,readValue,writeValue,testTmdb,safeHttps} from '@/lib/streaming';
import type {StreamOverride} from '@/lib/stream-types';
export async function GET(){if(!await isAdmin())return Response.json({error:'Acesso restrito.'},{status:403});const [data,overrides]=await Promise.all([getStreaming(false,true),readValue('stream_overrides',{})]);return Response.json({...data,overrides});}
const schema=z.discriminatedUnion('action',[z.object({action:z.literal('refresh')}),z.object({action:z.literal('catalog'),updatedAt:z.number(),items:z.array(z.object({id:z.string().max(200),kind:z.enum(['channel','event']),title:z.string().max(300),description:z.string().max(10000),category:z.string().max(100),image:z.string().max(2000),embeds:z.array(z.object({provider:z.string().max(200),quality:z.string().max(80),url:z.string().max(2000)})).max(64),status:z.string().max(50).optional(),current:z.object({title:z.string().max(300),description:z.string().max(10000),start:z.number(),end:z.number()}).optional(),next:z.string().max(300).optional()})).max(1000)}),z.object({action:z.literal('tmdb'),token:z.string().min(20).max(3000)}),z.object({action:z.literal('remove-tmdb')}),z.object({action:z.literal('override'),id:z.string().max(200),value:z.object({hidden:z.boolean().optional(),offline:z.boolean().optional(),featured:z.boolean().optional(),sourceUrl:z.string().max(2000).optional()})})]);
export async function POST(req:Request){
 if(!await isAdmin()||!sameOrigin(req))return Response.json({error:'Acesso restrito.'},{status:403});if(Number(req.headers.get('content-length')||0)>2000000)return Response.json({error:'Catálogo muito grande.'},{status:413});
 try{const body=schema.parse(await req.json());
 if(body.action==='catalog'){const current=await getStreaming(false,true);await writeValue('stream_cache',{...current,items:[...current.items.filter(i=>i.kind==='movie'||i.kind==='tv'),...body.items.map(i=>({...i,image:safeHttps(i.image),embeds:i.embeds.map(e=>({...e,url:safeHttps(e.url)})).filter(e=>e.url)}))],updatedAt:Date.now(),attemptedAt:Date.now(),apiAvailable:true,errors:[]});}
 if(body.action==='tmdb'){if(!await testTmdb(body.token))throw new Error('Token inválido');await writeValue('tmdb_token',body.token);await writeValue('stream_cache',null);}
 if(body.action==='remove-tmdb'){await writeValue('tmdb_token','');await writeValue('stream_cache',null);}
 if(body.action==='override'){if(body.value.sourceUrl&&!safeHttps(body.value.sourceUrl))return Response.json({error:'Use uma URL HTTPS pública válida.'},{status:400});const all=await readValue<Record<string,StreamOverride>>('stream_overrides',{});all[body.id]=body.value;await writeValue('stream_overrides',all);}
 if(body.action==='refresh'){const last=await readValue<number>('stream_admin_refresh',0);if(Date.now()-last<60000)return Response.json({error:'Aguarde um minuto antes de atualizar novamente.'},{status:429});await writeValue('stream_admin_refresh',Date.now());}
 return Response.json({...await getStreaming(body.action==='refresh'||body.action==='tmdb'||body.action==='remove-tmdb',true),overrides:await readValue('stream_overrides',{})});
 }catch{return Response.json({error:'Não foi possível concluir. Confira a configuração e a disponibilidade do provedor.'},{status:400});}
}
