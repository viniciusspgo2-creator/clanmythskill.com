import {articleCards} from '@/lib/articles';
import {pageMetadata} from '@/lib/seo';
import {Journal} from '@/components/site';
import {getContent} from '@/lib/cms';
export default async function Page(){const data=await getContent();return <Journal {...data} articles={articleCards(data.articles)}/>}

export const generateMetadata=()=>pageMetadata('/blog');
