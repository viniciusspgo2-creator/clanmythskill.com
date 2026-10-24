import {env} from '@/lib/platform';
import {sameOrigin} from '@/lib/admin-auth';
import {hasStreamingAccess} from '@/lib/stream-access';
import {redeemAccessCode,secretHash} from '@/lib/stream-access-core';
import {z} from 'zod';
export async function GET(){const allowed=await hasStreamingAccess();return Response.json({allowed},{status:allowed?200:401,headers:{'Cache-Control':'no-store'}});}
export async function POST(req:Request){
 if(!sameOrigin(req))return Response.json({error:'Origem inválida.'},{status:403});
 if(!env.DB)return Response.json({error:'O acesso está temporariamente indisponível. Procure a administração.'},{status:503});
 try{
  const {code}=z.object({code:z.string().min(1).max(100)}).parse(await req.json());
  const now=Date.now(),windowStart=Math.floor(now/60000)*60000;
  const address=req.headers.get('cf-connecting-ip')||req.headers.get('x-forwarded-for')?.split(',')[0]||'unidentified';
  const key=await secretHash(address+':'+windowStart);
  await env.DB.prepare('INSERT INTO stream_access_attempts (key,window_start,attempts) VALUES (?,?,1) ON CONFLICT(key) DO UPDATE SET attempts=stream_access_attempts.attempts+1').bind(key,windowStart).run();
  const attempts=await env.DB.prepare('SELECT attempts FROM stream_access_attempts WHERE key=?').bind(key).first<{attempts:number}>();
  if(Number(attempts?.attempts)>10)return Response.json({error:'Muitas tentativas. Aguarde um minuto antes de tentar novamente.'},{status:429,headers:{'Retry-After':'60'}});
  const session=await redeemAccessCode(env.DB,code,now);
  if(!session)return Response.json({error:'Código inválido, expirado ou revogado. Confira e tente novamente.'},{status:401});
  await env.DB.batch([env.DB.prepare('DELETE FROM stream_access_attempts WHERE window_start < ?').bind(now-86400000),env.DB.prepare('DELETE FROM stream_access_sessions WHERE expires_at < ?').bind(new Date(now).toISOString())]);
  const secure=new URL(req.url).protocol==='https:'?'; Secure':'';
  return Response.json({ok:true},{headers:{'Cache-Control':'no-store','Set-Cookie':`myth_stream=${session.token}; Path=/; Max-Age=${session.maxAge}; HttpOnly; SameSite=Lax${secure}`}});
 }catch{return Response.json({error:'Não foi possível validar o código. Tente novamente.'},{status:400});}
}
export async function DELETE(req:Request){if(!sameOrigin(req))return new Response(null,{status:403});return Response.json({ok:true},{headers:{'Set-Cookie':`myth_stream=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${new URL(req.url).protocol==='https:'?'; Secure':''}`}});}
