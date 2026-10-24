import { getContent } from '@/lib/cms';
export async function GET(){const data=await getContent();return Response.json({...data,articles:data.articles.filter(a=>a.published)},{headers:{'Cache-Control':'no-store'}});}
