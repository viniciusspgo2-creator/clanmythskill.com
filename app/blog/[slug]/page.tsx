import {JsonLd,articleJsonLd} from '@/lib/seo';
import {notFound} from 'next/navigation';
import {ArticleView} from '@/components/site';
import {getContent} from '@/lib/cms';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const {articles}=await getContent();const a=articles.find(a=>a.slug===slug);return {title:a?.seoTitle||a?.title||'Artigo não encontrado',description:a?.seoDescription||a?.excerpt,alternates:{canonical:'/blog/'+slug},openGraph:{type:'article' as const,title:a?.seoTitle||a?.title,description:a?.seoDescription||a?.excerpt,images:a?[a.image]:[]},twitter:{card:'summary_large_image' as const,title:a?.title,images:a?[a.image]:[]}};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const {articles}=await getContent();const a=articles.find(a=>a.slug===slug&&a.published);if(!a)notFound();return <><JsonLd data={articleJsonLd(a)}/><ArticleView article={a} related={articles.filter(b=>b.slug!==slug&&b.published).slice(0,3)}/></>}
