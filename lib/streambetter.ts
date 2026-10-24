import {readValue,writeValue} from './stream-store';
import {STREAMBETTER,parseProviderIds,normalizeProviderTitles,type ProviderIds} from './streambetter-core';
import type {StreamItem,StreambetterStatus} from './stream-types';
type Snapshot={ids:ProviderIds;items:StreamItem[];updatedAt:number;attemptedAt:number;etag?:string;error?:string;retryAt?:number};
const empty:Snapshot={ids:{movie:[],tv:[]},items:[],updatedAt:0,attemptedAt:0};
export async function getStreambetter(force=false){
 const enabled=await readValue('streambetter_enabled',true);let cached=await readValue<Snapshot>('streambetter_catalog',empty);const now=Date.now();
 if(enabled&&now>=(cached.retryAt||0)&&(force||now-cached.updatedAt>6*3600000)){
  let retryAt=now+300000;
  try{
   const [idResult,...lists]=await Promise.allSettled([
    fetch(STREAMBETTER+'/api/titles/ids',{headers:cached.etag?{'If-None-Match':cached.etag}:{},signal:AbortSignal.timeout(12000)}),
    ...(['movie','tv'] as const).map(async kind=>{const r=await fetch(`${STREAMBETTER}/api/titles?type=${kind}&limit=60`,{signal:AbortSignal.timeout(12000)});if(!r.ok)throw new Error('Lista indisponível.');return normalizeProviderTitles(await r.json(),kind);})
   ]);
   if(idResult.status!=='fulfilled')throw new Error('O catálogo do provedor não respondeu.');
   const response=idResult.value as Response;
   if(response.status===429){const header=response.headers.get('retry-after')||'';const seconds=Number(header);retryAt=Math.max(retryAt,Number.isFinite(seconds)&&seconds>0?now+Math.min(seconds,86400)*1000:Date.parse(header)||retryAt);}
   let ids:ProviderIds;
   if(response.status===304&&cached.updatedAt)ids=cached.ids;
   else{if(!response.ok)throw new Error(response.status===429?'O provedor limitou as consultas.':'O catálogo do provedor não respondeu.');ids=parseProviderIds(await response.json());}
   const items=lists.flatMap((r,index)=>r.status==='fulfilled'?r.value as StreamItem[]:cached.items.filter(i=>i.kind===(index===0?'movie':'tv')));
   cached={ids,items,updatedAt:now,attemptedAt:now,etag:response.status===304?cached.etag:response.headers.get('etag')||undefined,...(lists.some(r=>r.status==='rejected')?{error:'Parte das novidades não atualizou. A lista anterior foi preservada.'}:{})};
  }catch(e){cached={...cached,attemptedAt:now,retryAt,error:(e as Error).message||'Não foi possível consultar o provedor.'};}
  await writeValue('streambetter_catalog',cached);
 }
 const status:StreambetterStatus={enabled,catalogAvailable:!!cached.updatedAt,updatedAt:cached.updatedAt,counts:{movie:cached.ids.movie.length,tv:cached.ids.tv.length},error:cached.error};
 return {status,items:enabled?cached.items:[],ids:{movie:new Set(cached.ids.movie),tv:new Set(cached.ids.tv)}};
}
