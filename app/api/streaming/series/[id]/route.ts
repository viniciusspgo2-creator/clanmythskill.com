import {hasStreamingAccess} from '@/lib/stream-access';
import {readValue,writeValue} from '@/lib/stream-store';
import {normalizeSeasons,normalizeEpisodes,type SeriesMetadata} from '@/lib/series-core';
export async function GET(req:Request,{params}:{params:Promise<{id:string}>}){
 if(!await hasStreamingAccess())return Response.json({error:'Acesso restrito.'},{status:401,headers:{'Cache-Control':'no-store'}});
 const {id}=await params;const value=new URL(req.url).searchParams.get('season');
 if(!/^\d{1,9}$/.test(id)||Number(id)<1||(value!==null&&(!/^\d{1,4}$/.test(value)||Number(value)>1000)))return Response.json({error:'Série ou temporada inválida.'},{status:400});
 const key=`tmdb_episodes:${Number(id)}:${value===null?'seasons':Number(value)}`;
 const cached=await readValue<{data:SeriesMetadata;updatedAt:number}|null>(key,null);
 if(cached&&Date.now()-cached.updatedAt<86400000)return Response.json(cached.data,{headers:{'Cache-Control':'private, no-store'}});
 const token=await readValue<string>('tmdb_token','');if(!token)return Response.json({error:'A lista de episódios não está disponível. Informe os números manualmente.'},{status:503});
 try{
  const path=`https://api.themoviedb.org/3/tv/${Number(id)}${value===null?'':`/season/${Number(value)}`}?language=pt-BR`;
  const r=await fetch(path,{headers:{Authorization:`Bearer ${token}`,Accept:'application/json'},signal:AbortSignal.timeout(10000)});if(!r.ok)throw new Error('Lista indisponível.');const raw=await r.json() as {seasons?:unknown;episodes?:unknown};
  const data:SeriesMetadata=value===null?{seasons:normalizeSeasons(raw.seasons)}:{episodes:normalizeEpisodes(raw.episodes)};
  await writeValue(key,{data,updatedAt:Date.now()});return Response.json(data,{headers:{'Cache-Control':'private, no-store'}});
 }catch{return cached?Response.json(cached.data,{headers:{'Cache-Control':'private, no-store'}}):Response.json({error:'Não foi possível carregar a lista. Você pode informar os números manualmente.'},{status:503});}
}
