// Standard Next.js admin: signed, expiring, HttpOnly session; no trusted client headers.
import {cookies} from 'next/headers';
export function sameOrigin(req:Request){return req.headers.get('origin')===new URL(req.url).origin;}
const encoder=new TextEncoder();
async function signature(value:string){const key=await crypto.subtle.importKey('raw',encoder.encode(process.env.ADMIN_PASSWORD||''),{name:'HMAC',hash:'SHA-256'},false,['sign']);return Buffer.from(await crypto.subtle.sign('HMAC',key,encoder.encode(value))).toString('base64url');}
export async function newSession(){const value=Buffer.from(JSON.stringify({exp:Date.now()+6*60*60*1000,nonce:crypto.randomUUID()})).toString('base64url');return value+'.'+await signature(value);}
export async function validPassword(candidate:string){const expected=process.env.ADMIN_PASSWORD;if(!expected||expected.length<16)return false;const hash=async(v:string)=>new Uint8Array(await crypto.subtle.digest('SHA-256',encoder.encode(v)));const[a,b]=await Promise.all([hash(candidate),hash(expected)]);let diff=0;for(let n=0;n<a.length;n++)diff|=a[n]^b[n];return diff===0;}
export async function verifySession(token:string){if(!process.env.ADMIN_PASSWORD||process.env.ADMIN_PASSWORD.length<16)return false;try{const[value,mac]=token.split('.');if(!value||!mac)return false;const expected=await signature(value);let diff=expected.length^mac.length;for(let i=0;i<expected.length;i++)diff|=expected.charCodeAt(i)^(mac.charCodeAt(i)||0);return diff===0&&JSON.parse(Buffer.from(value,'base64url').toString()).exp>Date.now();}catch{return false;}}
export async function isAdmin(){return verifySession((await cookies()).get('myth_admin')?.value||'');}
export async function getAdminState(){const authorized=await isAdmin();return {mode:'next',signedIn:authorized,authorized,displayName:'Administrador MythSkill',needsSetup:!process.env.ADMIN_PASSWORD||process.env.ADMIN_PASSWORD.length<16};}
