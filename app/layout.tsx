import { records } from '@/lib/cms-store';
import type { MediaItem } from '@/lib/media-library';
import type {Metadata} from 'next';
import {getContent} from '@/lib/cms';
import {SiteShell} from '@/components/site';
import './fonts.css';
import './globals.css';
import './styles/community-streaming.css';
import './styles/mythskill.css';
import './styles/mythskill-admin.css';
export const dynamic='force-dynamic';
export async function generateMetadata():Promise<Metadata>{const {settings:s}=await getContent();return {metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'https://clan-mythskill.spiffytang515.chatgpt.site'),title:{default:s.seoTitle,template:'%s | MythSkill'},description:s.seoDescription,icons:{icon:'/images/logo.webp'},openGraph:{title:s.seoTitle,description:s.seoDescription,locale:'pt_BR',type:'website',images:[{url:s.socialImage,width:1200,height:630,alt:'Clan MythSkill — Counter-Strike 1.6'}]},twitter:{card:'summary_large_image',title:s.seoTitle,description:s.seoDescription,images:[s.socialImage]},robots:{index:true,follow:true}};}
export default async function RootLayout({children}:{children:React.ReactNode}){const {settings,design}=await getContent();const media=(await records<MediaItem>('media:asset:')).map(r=>r.value);return <html lang="pt-BR"><body><SiteShell settings={settings} design={design} media={media}>{children}</SiteShell></body></html>}
