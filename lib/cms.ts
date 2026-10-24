import { env } from '@/lib/platform';
import { defaults, type Settings } from './defaults';
import { articles, type Article } from './articles';
export async function getContent():Promise<{settings:Settings;articles:Article[]}> {
 if(!env.DB) return {settings:defaults,articles};
 const [saved,overrides] = await Promise.all([env.DB.prepare('SELECT value FROM content WHERE key = ?').bind('settings').first<{value:string}>(),env.DB.prepare('SELECT data FROM posts').all<{data:string}>()]);
 const map=new Map(articles.map(a=>[a.slug,a]));overrides.results.forEach(row=>{const a=JSON.parse(row.data) as Article;map.set(a.slug,a);});
 return {settings:{...defaults,...(saved?JSON.parse(saved.value):{})},articles:[...map.values()]};
}
export async function getStats(){
 if(!env.DB)throw new Error('Banco de dados indisponível.');
 const today=new Date().toLocaleDateString('en-CA',{timeZone:'America/Sao_Paulo'});
 const [unique,views,daily]=await Promise.all([env.DB.prepare('SELECT COUNT(*) AS total FROM visits').first<{total:number}>(),env.DB.prepare('SELECT SUM(total) AS total FROM pageviews').first<{total:number}>(),env.DB.prepare('SELECT p.day,p.total AS views,(SELECT COUNT(*) FROM visits v WHERE v.day=p.day) AS visitors FROM pageviews p ORDER BY p.day DESC LIMIT 14').all()]);
 return {visitors:Number(unique?.total)||0,views:Number(views?.total)||0,today,daily:daily.results};
}
