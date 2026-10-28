import {getContent} from '@/lib/cms';
import {absolute} from '@/lib/seo';
export const dynamic='force-dynamic';
export default async function sitemap(){const {articles,design}=await getContent();const redirected=new Set(design.seo.redirects.map(r=>r.from));const paths=[...new Set(['/',...design.pages.map(p=>p.path)])].filter(p=>!redirected.has(p)&&!p.startsWith('/admin')&&!['/componentes','/manutencao'].includes(p));return[...paths.map(path=>({url:absolute(path),changeFrequency:'weekly' as const,priority:path==='/'?1:.7})),...articles.map(a=>({url:absolute('/blog/'+a.slug),lastModified:new Date(a.date),changeFrequency:'monthly' as const,priority:.6}))];}
