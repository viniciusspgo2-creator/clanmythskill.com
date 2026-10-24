import {About} from '@/components/site';
import {getContent} from '@/lib/cms';
export const metadata={title:'Sobre o clan'};
export default async function Page(){const {settings}=await getContent();return <About settings={settings}/>}
