import {articleCards} from '@/lib/articles';
import {pageMetadata,JsonLd} from '@/lib/seo';
import {Home} from '@/components/site';
import {getContent} from '@/lib/cms';
export default async function Page(){const data=await getContent();return <><JsonLd data={{'@context':'https://schema.org','@type':'FAQPage',mainEntity:data.design.faq.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))}}/><Home {...data} articles={articleCards(data.articles)}/></>}

export const generateMetadata=()=>pageMetadata('/');
