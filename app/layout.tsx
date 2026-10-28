import Script from 'next/script';
import {JsonLd,siteUrl,absolute} from '@/lib/seo';
import {records} from '@/lib/cms-store';
import type {MediaItem} from '@/lib/media-library';
import type {Metadata} from 'next';
import {getContent} from '@/lib/cms';
import {SiteShell} from '@/components/site';
import './fonts.css';
import './globals.css';
import './styles/community-streaming.css';
import './styles/mythskill.css';
import './styles/mythskill-admin.css';
import './styles/mythskill-premium.css';
export const dynamic='force-dynamic';
export async function generateMetadata():Promise<Metadata>{const {settings:s,design}=await getContent();const image=design.branding.ogImage||'/og-placeholder.jpg';return {metadataBase:new URL(siteUrl()),title:{default:s.seoTitle,template:'%s | MythSkill'},description:s.seoDescription,icons:{icon:design.branding.favicon||'/favicon.svg'},openGraph:{title:s.seoTitle,description:s.seoDescription,locale:'pt_BR',type:'website',images:[{url:image,width:1200,height:630,alt:design.branding.wordmark}]},twitter:{card:'summary_large_image',title:s.seoTitle,description:s.seoDescription,images:[image]},robots:{index:!design.maintenance.enabled,follow:true},other:Object.fromEntries(design.seo.meta.map(m=>[m.name,m.content]))};}
export default async function RootLayout({children}:{children:React.ReactNode}){const {settings,design}=await getContent();const media=(await records<MediaItem>('media:asset:')).map(r=>r.value);return <html lang="pt-BR"><head>{['inter-400','inter-600'].map(font=><link rel="preload" key={font} href={'/fonts/mythskill/'+font+'.woff2'} as="font" type="font/woff2" crossOrigin="anonymous"/>)}</head><body><JsonLd data={{'@context':'https://schema.org','@graph':[{'@type':'Organization','@id':siteUrl()+'/#organization',name:'Clan '+design.branding.wordmark,url:siteUrl(),...(design.branding.logo?{logo:absolute(design.branding.logo)}:{})},{'@type':'WebSite',name:'Clan '+design.branding.wordmark,url:siteUrl(),inLanguage:'pt-BR'}]}}/><SiteShell settings={settings} design={design} media={media}>{children}</SiteShell>{design.seo.analyticsId&&<><Script src={'https://www.googletagmanager.com/gtag/js?id='+design.seo.analyticsId} strategy="afterInteractive"/><Script id="ms-analytics" strategy="afterInteractive">{'window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config",'+JSON.stringify(design.seo.analyticsId)+');'}</Script></>}{design.seo.customScripts.map((src,i)=><Script key={src} id={'ms-custom-'+i} src={src} strategy="afterInteractive"/>)}</body></html>}
