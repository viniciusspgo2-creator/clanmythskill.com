import {pageMetadata} from '@/lib/seo';
import {Streaming} from '@/components/streaming';
import {StreamingGate} from '@/components/streaming-gate';
import {hasStreamingAccess} from '@/lib/stream-access';
import {getContent} from '@/lib/cms';
export const dynamic='force-dynamic';
export default async function Page(){if(!await hasStreamingAccess()){const {settings}=await getContent();return <StreamingGate whatsapp={settings.whatsapp}/>;}return <Streaming/>;}

export const generateMetadata=()=>pageMetadata('/streaming');
