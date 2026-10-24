import {Journal} from '@/components/site';
import {getContent} from '@/lib/cms';
export const metadata={title:'Journal — guias de Counter-Strike 1.6'};
export default async function Page(){const data=await getContent();return <Journal {...data}/>}
