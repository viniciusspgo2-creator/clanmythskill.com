import {pageMetadata} from '@/lib/seo';
import {About} from '@/components/site';
import {getContent} from '@/lib/cms';
export default async function Page(){const {settings}=await getContent();return <About settings={settings}/>}

export const generateMetadata=()=>pageMetadata('/sobre');
