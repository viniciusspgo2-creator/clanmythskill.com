// Standard Next.js/Vercel adapter. Sites aliases this module to platform-sites.ts.
import {neon} from '@neondatabase/serverless';
import {createLocalPlatform} from './local-platform';
const connection=process.env.DATABASE_URL||process.env.POSTGRES_URL||process.env.POSTGRES_PRISMA_URL;
const sql=connection?neon(connection):null;
class Statement{
 query:string;params:unknown[];
 constructor(query:string,params:unknown[]=[]){let n=0;this.query=query.replace(/\?/g,()=>`$${++n}`);this.params=params;}
 bind(...params:unknown[]){return new Statement(this.query,params);}
 async all<T=Record<string,unknown>>(){if(!sql)throw new Error('Configure DATABASE_URL.');const rows=await sql.query(this.query,this.params);return {results:rows as T[]};}
 async first<T=Record<string,unknown>>(){return (await this.all<T>()).results[0]||null;}
 async run(){if(!sql)throw new Error('Configure DATABASE_URL.');const r=await sql.query(this.query,this.params,{fullResults:true});return {success:true,meta:{changes:r.rowCount}};}
}
const DB=sql?{prepare:(query:string)=>new Statement(query),batch:async(items:Statement[])=>sql.transaction(items.map(s=>sql.query(s.query,s.params)))}:undefined;
// Banner files are persisted in Postgres, avoiding ephemeral filesystem uploads on Vercel.
const BUCKET=DB?{
 async put(id:string,bytes:ArrayBuffer,options:{httpMetadata:{contentType:string}}){await DB.prepare('INSERT INTO media(id,data,content_type) VALUES(?,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data,content_type=excluded.content_type').bind(id,Buffer.from(bytes).toString('base64'),options.httpMetadata.contentType).run();},
 async get(id:string){const row=await DB.prepare('SELECT data,content_type FROM media WHERE id=?').bind(id).first<{data:string;content_type:string}>();return row?{body:new Uint8Array(Buffer.from(row.data,'base64')),httpMetadata:{contentType:row.content_type}}:null;}
}:undefined;
const local=process.env.MYTHSKILL_LOCAL_DB?createLocalPlatform(process.env.MYTHSKILL_LOCAL_DB):null;
export const env={DB:local?.DB||DB,BUCKET:local?.BUCKET||BUCKET,ADMIN_EMAIL:process.env.ADMIN_EMAIL} as unknown as Cloudflare.Env;
export const platformMode='next' as const;
