import {randomBytes} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {mkdirSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
if(process.env.VERCEL||process.env.DATABASE_URL||process.env.POSTGRES_URL||process.env.POSTGRES_PRISMA_URL)throw new Error('Execute E2E em um shell sem credenciais de produção. O teste utiliza somente SQLite isolado.');
const directory=resolve('.sites-runtime');mkdirSync(directory,{recursive:true});
const variables={...process.env,MYTHSKILL_LOCAL_DB:resolve(directory,'e2e-'+Date.now()+'.sqlite'),ADMIN_PASSWORD:randomBytes(24).toString('hex'),ADMIN_SESSION_SECRET:randomBytes(32).toString('hex'),NEXT_PUBLIC_SITE_URL:'http://127.0.0.1:3003',E2E_BASE_URL:'http://127.0.0.1:3003',NODE_USE_ENV_PROXY:'1',...(existsSync('/usr/bin/chromium')?{CHROME_PATH:'/usr/bin/chromium'}:{})};
const seed=spawnSync(process.execPath,['--import','tsx','scripts/seed-content.ts'],{stdio:'inherit',env:variables});if(seed.status!==0)process.exit(seed.status||1);
const result=spawnSync(process.execPath,['node_modules/@playwright/test/cli.js','test',...process.argv.slice(2)],{stdio:'inherit',env:variables});process.exit(result.status||0);
