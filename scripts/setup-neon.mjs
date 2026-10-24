import {neon} from '@neondatabase/serverless';
import {readFile} from 'node:fs/promises';
const url=process.env.DATABASE_URL||process.env.POSTGRES_URL||process.env.POSTGRES_PRISMA_URL;
if(!url){if(process.env.VERCEL){console.error('Configure DATABASE_URL (Neon) antes do deploy.');process.exit(1);}console.info('DATABASE_URL não configurada. O banco não foi alterado.');process.exit(0);}
const sql=neon(url);const schema=await readFile(new URL('../db/neon.sql',import.meta.url),'utf8');
await sql.transaction(schema.split(';').map(q=>q.trim()).filter(Boolean).map(q=>sql.query(q)));
console.info('Banco MythSkill pronto. Dados existentes preservados.');
