import {Vip} from '@/components/site';
import {getContent} from '@/lib/cms';
export const metadata={title:'Ativar VIP'};
export default async function Page(){const {settings}=await getContent();return <Vip settings={settings}/>}
