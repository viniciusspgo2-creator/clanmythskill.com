import {sameOrigin,validPassword,newSession} from '@/lib/admin-auth';
import {platformMode} from '@/lib/platform';
import {z} from 'zod';
const attempts=new Map<string,{time:number;count:number}>();
export async function POST(req:Request){
 if(platformMode!=='next')return new Response(null,{status:404});if(!sameOrigin(req))return new Response(null,{status:403});
 const ip=req.headers.get('x-forwarded-for')?.split(',')[0]||'local';const old=attempts.get(ip);if(old&&Date.now()-old.time<60000&&old.count>=8)return Response.json({error:'Aguarde um minuto para tentar novamente.'},{status:429});attempts.set(ip,{time:old&&Date.now()-old.time<60000?old.time:Date.now(),count:old&&Date.now()-old.time<60000?old.count+1:1});if(attempts.size>1000){for(const[k,v]of attempts)if(Date.now()-v.time>60000)attempts.delete(k);}
 try{const {password}=z.object({password:z.string().max(500)}).parse(await req.json());if(!await validPassword(password))return Response.json({error:'Senha inválida ou acesso não configurado.'},{status:401});const secure=new URL(req.url).protocol==='https:'?'; Secure':'';return Response.json({ok:true},{headers:{'Set-Cookie':`myth_admin=${await newSession()}; Path=/; Max-Age=21600; HttpOnly; SameSite=Strict${secure}`}});}catch{return Response.json({error:'Não foi possível entrar.'},{status:400});}
}
