import {Streaming} from '@/components/streaming';
import {StreamingGate} from '@/components/streaming-gate';
import {hasStreamingAccess} from '@/lib/stream-access';
import {getContent} from '@/lib/cms';
export const dynamic='force-dynamic';
export const metadata={title:'Streaming Mithys — benefício dos players',description:'Um intervalo exclusivo para os players da MythSkill. Canais, esportes, filmes e séries em espaços próprios, com acesso por código.'};
export default async function Page(){if(!await hasStreamingAccess()){const {settings}=await getContent();return <StreamingGate whatsapp={settings.whatsapp}/>;}return <Streaming/>;}
