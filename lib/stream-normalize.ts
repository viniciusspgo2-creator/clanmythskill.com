import { object, array, text as str } from './remote-json';
import type {StreamItem,Embed,StreamData,StreamOverride} from './stream-types';
export function safeHttps(value:unknown):string{try{const u=new URL(String(value));if(u.protocol!=='https:'||u.username||u.password||u.port||u.hostname==='localhost'||u.hostname.endsWith('.local')||u.hostname.endsWith('.internal')||/^[\d.]+$/.test(u.hostname)||u.hostname.includes(':'))return '';return u.href;}catch{return '';}}
export function playbackSources(original:Embed[],override:StreamOverride={}):Embed[]{
 if(!override.sourceUrl)return original;
 const url=safeHttps(override.sourceUrl);if(!url)return [];
 const path=new URL(url).pathname.toLowerCase();
 const kind=override.sourceType&&override.sourceType!=='auto'?override.sourceType:path.endsWith('.m3u8')?'hls':path.endsWith('.mp4')?'mp4':'embed';
 return [{provider:'Player do clan',quality:kind==='embed'?'Web':'Vídeo',url,kind}];
}

export const normalizeEmbeds=(value:unknown):Embed[]=>array(value).map(raw=>{const e=object(raw);return{provider:str(e.provider)||'Servidor',quality:str(e.quality)||'Padrão',url:safeHttps(e.embed_url)};}).filter(e=>e.url);
export function normalizeChannels(data:unknown[]):StreamItem[]{return data.slice(0,1000).map(raw=>{const c=object(raw),epg=object(c.epg),current=object(epg.current);return{id:'channel:'+str(c.id),kind:'channel',title:str(c.name),description:str(c.description),category:str(c.category)||'TV',image:safeHttps(c.logo_url),embeds:normalizeEmbeds(c.embeds),current:epg.current?{title:str(current.title),description:str(current.description),start:Number(current.start_time)||0,end:Number(current.end_time)||0}:undefined,next:str(object(epg.next).title)};});}
export function normalizeEvents(data:unknown[]):StreamItem[]{return data.slice(0,1000).map(raw=>{const e=object(raw);return{id:'event:'+str(e.id),kind:'event',title:str(e.title),description:str(e.description),category:str(e.category)||'Esportes',image:safeHttps(e.poster),embeds:normalizeEmbeds(e.embeds),status:str(e.status)};});}
export async function browserCatalog(existing:StreamData,overrides:Record<string,StreamOverride>=existing.overrides||{},includeHidden=false):Promise<StreamData>{
 const get=async(path:string)=>{const r=await fetch('https://api.reidoscanais.cam/'+path,{signal:AbortSignal.timeout(12000)});if(!r.ok)throw new Error('Provedor indisponível');const d=object(await r.json());if(!d.success||!Array.isArray(d.data))throw new Error('Resposta inválida');return d.data;};
 const out=await Promise.allSettled([get('channels'),get('sports')]);let items=existing.items.filter(i=>i.kind==='movie'||i.kind==='tv');let changed=false;const errors:string[]=[];
 if(out[0].status==='fulfilled'){items=[...items,...normalizeChannels(out[0].value)];changed=true;}else {items=[...items,...existing.items.filter(i=>i.kind==='channel')];errors.push('O provedor de canais está temporariamente indisponível.');}
 if(out[1].status==='fulfilled'){items=[...items,...normalizeEvents(out[1].value)];changed=true;}else {items=[...items,...existing.items.filter(i=>i.kind==='event')];errors.push('A agenda esportiva está temporariamente indisponível.');}
 if(!changed)return existing;
 return {...existing,items:items.map(i=>({...i,...overrides[i.id],embeds:playbackSources(i.embeds,overrides[i.id])})).filter(i=>includeHidden||!i.hidden),apiAvailable:out[0].status==='fulfilled',updatedAt:Date.now(),errors};
}
