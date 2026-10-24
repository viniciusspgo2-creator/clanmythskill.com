import { env } from '@/lib/platform';
import { sameOrigin } from '@/lib/admin-auth';
export async function POST(req:Request){
 if(!sameOrigin(req))return new Response(null,{status:403});if(!env.DB)return new Response(null,{status:503});
 const old=req.headers.get('cookie')?.match(/(?:^|;\s*)myth_visitor=([a-f0-9-]{36})/)?.[1];const id=old||crypto.randomUUID();const day=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 await env.DB.batch([env.DB.prepare('INSERT INTO visits (id,day) VALUES (?,?) ON CONFLICT(id) DO NOTHING').bind(`${day}:${id}`,day),env.DB.prepare('INSERT INTO pageviews(day,total) VALUES (?,1) ON CONFLICT(day) DO UPDATE SET total=total+1').bind(day)]);
 return Response.json({ok:true},{headers:old?{}:{'Set-Cookie':`myth_visitor=${id}; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax; Secure`}});
}
