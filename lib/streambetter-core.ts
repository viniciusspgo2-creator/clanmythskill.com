import { object, array } from './remote-json';
import type {Embed,StreamItem,StreamOverride} from './stream-types';
import {playbackSources,safeHttps} from './stream-normalize';
export const STREAMBETTER='https://streambetter.lol';
export type ProviderIds={movie:number[];tv:number[]};
const positive=(n:unknown)=>Number.isSafeInteger(Number(n))&&Number(n)>0&&Number(n)<=100000000;
export function streambetterUrl(kind:'movie'|'tv',id:number,season=1,episode=1){
 if(!positive(id))throw new Error('ID inválido.');
 if(kind==='movie')return `${STREAMBETTER}/filme/${id}`;
 if(!Number.isInteger(season)||season<0||season>1000||!Number.isInteger(episode)||episode<1||episode>10000)throw new Error('Episódio inválido.');
 return `${STREAMBETTER}/serie/${id}/${season}/${episode}`;
}
export function parseProviderIds(data:unknown):ProviderIds{
 const d=data as {success?:boolean;ids?:Record<string,unknown>;counts?:Record<string,unknown>};
 if(d?.success!==true||!d.ids||!d.counts)throw new Error('Catálogo inválido.');
 const result={} as ProviderIds;
 for(const kind of ['movie','tv'] as const){const list=d.ids[kind];if(!Array.isArray(list)||list.length>100000||d.counts[kind]!==list.length||!list.every(positive))throw new Error('Lista de IDs incompleta.');const ids=list.map(Number);if(new Set(ids).size!==ids.length)throw new Error('IDs duplicados.');result[kind]=ids;}
 return result;
}
export function normalizeProviderTitles(data:unknown,kind:'movie'|'tv'):StreamItem[]{
 const d=object(data);if(d.success!==true||!Array.isArray(d.titles))throw new Error('Resposta de títulos inválida.');
 return array(d.titles).slice(0,100).map(object).filter(t=>positive(t.tmdb_id)&&t.type===kind&&typeof t.title==='string'&&t.title.trim()).map(t=>{
  const poster=typeof t.poster_path==='string'?t.poster_path:'';const image=poster.startsWith('/')?safeHttps('https://image.tmdb.org/t/p/w500'+poster):safeHttps(poster);
  return {id:`${kind}:${Number(t.tmdb_id)}`,tmdbId:Number(t.tmdb_id),kind,title:String(t.title).slice(0,300),description:typeof t.overview==='string'?t.overview.slice(0,10000):'',category:kind==='movie'?'Filmes':'Séries',image,year:positive(t.release_year)?Number(t.release_year):undefined,embeds:[]};
 });
}

export function providerSources(item:StreamItem,enabled:boolean,ids:{movie:Set<number>;tv:Set<number>},override:StreamOverride={}):Embed[]{
 let sources=item.embeds.filter(e=>e.episodePlayer!=='streambetter'&&e.provider!=='StreamBetter');
 if(enabled&&!override.disableAutomatic&&(item.kind==='movie'||item.kind==='tv')&&item.tmdbId&&ids[item.kind].has(item.tmdbId))sources=[...sources,{provider:'StreamBetter',quality:'Player externo',kind:'embed',url:streambetterUrl(item.kind,item.tmdbId),...(item.kind==='tv'?{episodePlayer:'streambetter' as const}:{})}];
 return playbackSources(sources,override);
}
export function mergeProviderTitles(existing:StreamItem[],recent:StreamItem[]){const map=new Map(recent.map(i=>[i.id,i]));for(const item of existing)map.set(item.id,{...map.get(item.id),...item});return [...map.values()];}
