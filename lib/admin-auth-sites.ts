import {env} from '@/lib/platform';
import {getChatGPTUser} from '@/app/chatgpt-auth';
import type {Principal,AdminUser} from './auth-types';
export async function getPrincipal():Promise<Principal|null>{const user=await getChatGPTUser();const email=(env as unknown as Record<string,string>).ADMIN_EMAIL;return user&&email&&user.email.toLowerCase()===email.toLowerCase()?{id:user.email,name:user.displayName||'Administrador',email:user.email,role:'admin',revision:1}:null;}
export async function isAdmin(){return !!await getPrincipal();}
export async function hasRole(...roles:Principal['role'][]){const user=await getPrincipal();return user&&roles.includes(user.role)?user:null;}
export { sameOrigin } from './request-security';
export async function getAdminState(){const user=await getChatGPTUser();const principal=await getPrincipal();return{mode:'sites',signedIn:!!user,authorized:!!principal,displayName:user?.displayName||'Administrador',role:'admin',user:principal,needsSetup:false};}
export async function validPassword(_candidate:string){void _candidate;return false;}
export async function authenticate(_email:string,_password:string,_code=''){void _email;void _password;void _code;return null;}
export async function newSession(_user?:Principal,_agent=''):Promise<string>{void _user;void _agent;throw new Error('Use o acesso da plataforma.');}
export async function getAdminUsers():Promise<AdminUser[]>{return[];}
export async function saveAdminUsers(_users:AdminUser[]):Promise<void>{void _users;throw new Error('Gerencie a identidade na plataforma.');}
export async function revokeSession(_id:string){void _id;}
export async function logoutCurrent(){}
