import {pageMetadata} from '@/lib/seo';
import {Vip} from '@/components/site';
import {getContent} from '@/lib/cms';
export default async function Page(){const {settings}=await getContent();return <Vip settings={settings}/>}

export const generateMetadata=()=>pageMetadata('/ativar-vip');
