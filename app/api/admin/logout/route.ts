import { sameOrigin, logoutCurrent } from '@/lib/admin-auth';
export async function POST(req:Request){if(!sameOrigin(req))return new Response(null,{status:403});await logoutCurrent();return Response.json({ok:true},{headers:{'Set-Cookie':`myth_admin=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict${new URL(req.url).protocol==='https:'?'; Secure':''}`}});}
