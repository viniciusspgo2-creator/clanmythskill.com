import {notFound} from 'next/navigation';
import {ArticleView} from '@/components/site';
import {getContent} from '@/lib/cms';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const {articles}=await getContent();const a=articles.find(a=>a.slug===slug&&a.published);return {title:a?.title||'Artigo não encontrado',description:a?.excerpt,openGraph:{type:'article',images:a?[a.image]:[]}};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const {articles}=await getContent();const a=articles.find(a=>a.slug===slug&&a.published);if(!a)notFound();return <ArticleView article={a} related={articles.filter(b=>b.slug!==slug&&b.published).slice(0,3)}/>}
