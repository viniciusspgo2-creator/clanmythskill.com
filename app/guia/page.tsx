import {pageMetadata} from '@/lib/seo';
import {PlayerGuide} from '@/components/player-guide';
import {getContent} from '@/lib/cms';
export default async function Page(){const {settings}=await getContent();return <PlayerGuide settings={settings}/>}

export const generateMetadata=()=>pageMetadata('/guia');
