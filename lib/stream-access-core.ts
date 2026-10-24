export interface AccessStatement {
 bind(...values:unknown[]):AccessStatement;
 first<T>():Promise<T|null>;
 all<T>():Promise<{results:T[]}>;
 run():Promise<unknown>;
}
export interface AccessStore {prepare(query:string):AccessStatement}
export type AccessCodeRecord={id:string;label:string;suffix:string;created_at:string;expires_at:string|null;revoked_at:string|null;last_used_at:string|null;use_count:number};
export function normalizeAccessCode(value:string){return value.trim().toUpperCase().replace(/[\s-]/g,'');}
export async function secretHash(value:string){const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));return Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');}
export function isAccessActive(record:{expires_at:string|null;revoked_at:string|null},now=Date.now()){return !record.revoked_at&&(!record.expires_at||Date.parse(record.expires_at)>now);}
export async function issueAccessCode(db:AccessStore,label:string,days:number|null,now=Date.now()){
 const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';const bytes=crypto.getRandomValues(new Uint8Array(16));const characters=Array.from(bytes,b=>alphabet[b%alphabet.length]).join('');
 const code='MITHYS-'+characters.match(/.{4}/g)!.join('-');
 const record:AccessCodeRecord={id:crypto.randomUUID(),label,suffix:characters.slice(-4),created_at:new Date(now).toISOString(),expires_at:days?new Date(now+days*86400000).toISOString():null,revoked_at:null,last_used_at:null,use_count:0};
 await db.prepare('INSERT INTO stream_access_codes (id,code_hash,label,suffix,created_at,expires_at,revoked_at,last_used_at,use_count) VALUES (?,?,?,?,?,?,NULL,NULL,0)').bind(record.id,await secretHash(normalizeAccessCode(code)),label,record.suffix,record.created_at,record.expires_at).run();
 return {code,record};
}
export async function redeemAccessCode(db:AccessStore,code:string,now=Date.now()){
 const normalized=normalizeAccessCode(code);if(!/^MITHYS[A-HJ-NP-Z2-9]{16}$/.test(normalized))return null;
 const record=await db.prepare('SELECT id,label,suffix,created_at,expires_at,revoked_at,last_used_at,use_count FROM stream_access_codes WHERE code_hash=?').bind(await secretHash(normalized)).first<AccessCodeRecord>();
 if(!record||!isAccessActive(record,now))return null;
 const raw=Array.from(crypto.getRandomValues(new Uint8Array(32)),b=>b.toString(16).padStart(2,'0')).join('');
 const expires=Math.min(now+7*86400000,record.expires_at?Date.parse(record.expires_at):Infinity);
 await db.prepare('INSERT INTO stream_access_sessions (id,code_id,token_hash,created_at,expires_at) VALUES (?,?,?,?,?)').bind(crypto.randomUUID(),record.id,await secretHash(raw),new Date(now).toISOString(),new Date(expires).toISOString()).run();
 await db.prepare('UPDATE stream_access_codes SET use_count=use_count+1,last_used_at=? WHERE id=?').bind(new Date(now).toISOString(),record.id).run();
 return {token:raw,maxAge:Math.max(1,Math.floor((expires-now)/1000))};
}
export async function verifyAccessSession(db:AccessStore,token:string,now=Date.now()){
 if(!/^[a-f0-9]{64}$/.test(token))return false;
 const record=await db.prepare('SELECT c.expires_at,c.revoked_at,s.expires_at AS session_expires_at FROM stream_access_sessions s JOIN stream_access_codes c ON c.id=s.code_id WHERE s.token_hash=?').bind(await secretHash(token)).first<{expires_at:string|null;revoked_at:string|null;session_expires_at:string}>();
 return !!(record&&isAccessActive(record,now)&&Date.parse(record.session_expires_at)>now);
}
export async function revokeAccessCode(db:AccessStore,id:string,now=Date.now()){
 await db.prepare('UPDATE stream_access_codes SET revoked_at=? WHERE id=? AND revoked_at IS NULL').bind(new Date(now).toISOString(),id).run();
}
