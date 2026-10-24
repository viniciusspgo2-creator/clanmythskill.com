import {env} from '@/lib/platform';
export async function readValue<T>(key:string,fallback:T):Promise<T>{const row=await env.DB?.prepare('SELECT value FROM content WHERE key=?').bind(key).first<{value:string}>();return row?(JSON.parse(row.value)??fallback) as T:fallback;}
export async function writeValue(key:string,value:unknown){if(!env.DB)throw new Error('Banco indisponível');await env.DB.prepare('INSERT INTO content(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').bind(key,JSON.stringify(value)).run();}
