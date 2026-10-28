/** Additive seed: existing settings, articles, media, codes and catalog are preserved. */
import { env } from '../lib/platform';
import { defaults } from '../lib/defaults';
import { articles } from '../lib/articles';
import { createDefaultDesign, mergeDesign, type SiteDesign } from '../lib/mythskill-content';
if(!env.DB)throw new Error('Configure DATABASE_URL (produção) ou MYTHSKILL_LOCAL_DB (desenvolvimento) antes do seed.');
const values=[{key:'settings',value:defaults},{key:'mythskill:published',value:createDefaultDesign()}];
await env.DB.batch([
 ...values.map(r=>env.DB!.prepare('INSERT INTO content(key,value) VALUES(?,?) ON CONFLICT(key) DO NOTHING').bind(r.key,JSON.stringify(r.value))),
 ...articles.map(a=>env.DB!.prepare('INSERT INTO posts(slug,data) VALUES(?,?) ON CONFLICT(slug) DO NOTHING').bind(a.slug,JSON.stringify(a))),
]);
const marker='mythskill:seed:2026-10-redesign';
const seeded=await env.DB.prepare('SELECT value FROM content WHERE key=?').bind(marker).first();
if(!seeded){
 const base=createDefaultDesign();
 const append=<T extends {id:string}>(current:T[],extra:T[])=>{const known=new Set(current.map(v=>v.id));return [...current,...extra.filter(v=>!known.has(v.id))];};
 const add=(current:SiteDesign)=>{const next=mergeDesign(current);next.maps=append(next.maps,base.maps);next.glossary=append(next.glossary,base.glossary);next.faq=append(next.faq,base.faq);return next;};
 const published=await env.DB.prepare('SELECT value FROM content WHERE key=?').bind('mythskill:published').first<{value:string}>();
 const design=add(published?JSON.parse(published.value):base);
 const statements=[env.DB.prepare('INSERT INTO content(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').bind('mythskill:published',JSON.stringify(design))];
 const row=await env.DB.prepare('SELECT value FROM content WHERE key=?').bind('mythskill:draft').first<{value:string}>();
 if(row){const draft=JSON.parse(row.value);draft.snapshot.design=add(draft.snapshot.design);const known=new Set(draft.snapshot.articles.map((a:{slug:string})=>a.slug));draft.snapshot.articles.push(...articles.filter(a=>!known.has(a.slug)));draft.revision++;draft.updatedAt=new Date().toISOString();draft.updatedBy='seed:additive';statements.push(env.DB.prepare('UPDATE content SET value=? WHERE key=? AND value=?').bind(JSON.stringify(draft),'mythskill:draft',row.value));}
 statements.push(env.DB.prepare('INSERT INTO content(key,value) VALUES(?,?) ON CONFLICT(key) DO NOTHING').bind(marker,JSON.stringify({at:new Date().toISOString(),articles:articles.length})));
 await env.DB.batch(statements);
}
console.info(`Seed concluído: ${articles.length} artigos disponíveis; registros existentes preservados. Todo o conteúdo está acessível pelo painel.`);
