/** Local-only development adapter. Production keeps Neon; Sites keeps D1/R2. */
import { DatabaseSync, type SQLInputValue } from 'node:sqlite';
import { mkdirSync, readFileSync, chmodSync } from 'node:fs';
import { dirname, join } from 'node:path';
type Row=Record<string,unknown>;
const localGlobal=globalThis as typeof globalThis&{mythskillSqlite?:Map<string,DatabaseSync>};
export function createLocalPlatform(path:string){
 if(process.env.VERCEL)throw new Error('MYTHSKILL_LOCAL_DB is a development setting and cannot run on Vercel.');
 localGlobal.mythskillSqlite??=new Map();let database=localGlobal.mythskillSqlite.get(path);
 if(!database){mkdirSync(dirname(path),{recursive:true});database=new DatabaseSync(path);database.exec('PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;');database.exec(readFileSync(join(process.cwd(),'db/neon.sql'),'utf8'));chmodSync(path,0o600);localGlobal.mythskillSqlite.set(path,database);}
 const db=database;
 const inputs=(values:unknown[])=>values.map(v=>v===undefined?null:typeof v==='boolean'?Number(v):v) as SQLInputValue[];
 class Statement{constructor(public query:string,public params:unknown[]=[]){ }bind(...values:unknown[]){return new Statement(this.query,values);}async all<T=Row>(){return {results:db.prepare(this.query).all(...inputs(this.params)) as T[]};}async first<T=Row>(){return (await this.all<T>()).results[0]||null;}async run(){const r=db.prepare(this.query).run(...inputs(this.params));return{success:true,meta:{changes:Number(r.changes)}};}}
 const DB={prepare:(query:string)=>new Statement(query),async batch(items:Statement[]){db.exec('BEGIN IMMEDIATE');try{const out=[];for(const item of items)out.push(await item.run());db.exec('COMMIT');return out;}catch(e){db.exec('ROLLBACK');throw e;}}};
 const BUCKET={async put(id:string,bytes:ArrayBuffer,options:{httpMetadata:{contentType:string}}){await DB.prepare('INSERT INTO media(id,data,content_type) VALUES(?,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data,content_type=excluded.content_type').bind(id,Buffer.from(bytes).toString('base64'),options.httpMetadata.contentType).run();},async get(id:string){const row=await DB.prepare('SELECT data,content_type FROM media WHERE id=?').bind(id).first<{data:string;content_type:string}>();return row?{body:new Uint8Array(Buffer.from(row.data,'base64')),httpMetadata:{contentType:row.content_type}}:null;}};
 return{DB,BUCKET};
}
