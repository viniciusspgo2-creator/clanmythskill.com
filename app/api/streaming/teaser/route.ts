import { readValue } from '@/lib/stream-store';
import type { StreamData, StreamOverride } from '@/lib/stream-types';
export async function GET(){const cache=await readValue<Pick<StreamData,'items'>>('stream_cache',{items:[]});const overrides=await readValue<Record<string,StreamOverride>>('stream_overrides',{});return Response.json({items:cache.items.filter(i=>['movie','tv'].includes(i.kind)&&!i.hidden&&!overrides[i.id]?.hidden&&i.image).slice(0,12).map(i=>({id:i.id,title:i.title,image:i.image,kind:i.kind}))},{headers:{'Cache-Control':'public, max-age=60'}});}
