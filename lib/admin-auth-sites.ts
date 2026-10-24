import { env } from '@/lib/platform';
import { getChatGPTUser } from '@/app/chatgpt-auth';
export async function isAdmin(){const user=await getChatGPTUser();const email=(env as unknown as Record<string,string>).ADMIN_EMAIL;return !!(user&&email&&user.email.toLowerCase()===email.toLowerCase());}
export function sameOrigin(req:Request){return req.headers.get('origin')===new URL(req.url).origin;}
export async function getAdminState(){const user=await getChatGPTUser();return {mode:'sites',signedIn:!!user,authorized:await isAdmin(),displayName:user?.displayName||'Administrador',needsSetup:false};}
export async function validPassword(_candidate:string){return false;}
export async function newSession(){throw new Error('Use o acesso da plataforma.');return '';}
