import { notFound } from 'next/navigation';
import { getContent } from '@/lib/cms';
import { getRanking } from '@/lib/ranking';
import { pageMetadata } from '@/lib/seo';
import { RankingView } from '@/components/mythskill/ranking';
export const dynamic='force-dynamic';
export const generateMetadata=()=>pageMetadata('/ranking');
export default async function Page(){if(!(await getContent()).design.ranking.enabled)notFound();const ranking=await getRanking();return <RankingView initial={ranking}/>}
