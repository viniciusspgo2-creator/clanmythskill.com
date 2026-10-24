import {getStreaming,readValue} from '@/lib/streaming';
import type {StreamOverride} from '@/lib/stream-types';
export async function GET(){try{const data=await getStreaming();const overrides=await readValue<Record<string,StreamOverride>>('stream_overrides',{});const safe=Object.fromEntries(Object.entries(overrides).map(([id,o])=>[id,o.hidden?{hidden:true}:{...o}]));return Response.json({...data,overrides:safe},{headers:{'Cache-Control':'no-store'}});}catch{return Response.json({error:'O catálogo está temporariamente indisponível.'},{status:503});}}
