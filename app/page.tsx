import {Home} from '@/components/site';
import {getContent} from '@/lib/cms';
export default async function Page(){const data=await getContent();return <Home {...data}/>}
