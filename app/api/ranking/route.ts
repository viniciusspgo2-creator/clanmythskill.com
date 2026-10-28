import { getContent } from '@/lib/cms';
import { getRanking } from '@/lib/ranking';
export const runtime='nodejs';
export async function GET(){if(!(await getContent()).design.ranking.enabled)return Response.json({available:false,disabled:true},{status:404});const ranking=await getRanking();return Response.json({available:!!ranking,ranking},{status:ranking?200:503,headers:{'Cache-Control':'public,max-age=60','X-Content-Type-Options':'nosniff'}});}
