import { notFound, permanentRedirect } from 'next/navigation';
import { getContent } from '@/lib/cms';
import { ManagedPageView } from '@/components/mythskill/managed-page';
export async function generateMetadata({params}:{params:Promise<{path:string[]}>}){const path='/'+(await params).path.join('/');const {design}=await getContent();const page=design.pages.find(p=>p.path===path);return page?{title:page.title,description:page.description}:{};}
export default async function Page({params}:{params:Promise<{path:string[]}>}){const path='/'+(await params).path.join('/');const {design}=await getContent();const redirect=design.seo.redirects.find(r=>r.from===path);if(redirect)permanentRedirect(redirect.to);const page=design.pages.find(p=>p.path===path);if(!page)notFound();return <ManagedPageView page={page}/>}
