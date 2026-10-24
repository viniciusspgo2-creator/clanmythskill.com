import {getContent} from '@/lib/cms';
export const dynamic='force-dynamic';
export default async function sitemap(){const {articles}=await getContent();const base=process.env.NEXT_PUBLIC_SITE_URL||'https://clan-mythskill.spiffytang515.chatgpt.site';return ['','/sobre','/ativar-vip','/blog','/streaming','/guia',...articles.filter(a=>a.published).map(a=>'/blog/'+a.slug)].map(path=>({url:base+path,lastModified:new Date(),changeFrequency:'weekly' as const,priority:path===''?1:0.7}));}
