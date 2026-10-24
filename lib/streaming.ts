import {env} from '@/lib/platform';
import type {StreamItem,StreamData,StreamOverride,Embed} from './stream-types';
const API='https://api.reidoscanais.cam';
import {safeHttps} from './stream-normalize';
export {safeHttps} from './stream-normalize';
const str=(v:unknown)=>typeof v==='string'?v:'';
export async function readValue<T>(key:string,fallback:T):Promise<T>{const row=await env.DB?.prepare('SELECT value FROM content WHERE key=?').bind(key).first<{value:string}>();return row?(JSON.parse(row.value)??fallback) as T:fallback;}
export async function writeValue(key:string,value:unknown){if(!env.DB)throw new Error('Banco indisponível');await env.DB.prepare('INSERT INTO content(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').bind(key,JSON.stringify(value)).run();}
async function json(url:string,token?:string){const res=await fetch(url,{signal:AbortSignal.timeout(12000),headers:{Accept:'application/json',...(token?{Authorization:`Bearer ${token}`}:{})}});if(!res.ok)throw new Error(`HTTP ${res.status}`);return res.json() as Promise<any>;}
const genres:Record<number,string>={28:'Ação',12:'Aventura',16:'Animação',35:'Comédia',80:'Crime',99:'Documentário',18:'Drama',10751:'Família',14:'Fantasia',36:'História',27:'Terror',10402:'Música',9648:'Mistério',10749:'Romance',878:'Ficção científica',53:'Suspense',10752:'Guerra',37:'Faroeste',10759:'Ação e aventura',10765:'Ficção e fantasia',10762:'Infantil',10764:'Reality',10768:'Guerra e política'};
const embeds=(v:any):Embed[]=>Array.isArray(v)?v.map(e=>({provider:str(e.provider)||'Servidor',quality:str(e.quality)||'Padrão',url:safeHttps(e.embed_url)})).filter(e=>e.url):[];
export async function getStreaming(force=false,includeHidden=false):Promise<StreamData>{
 const now=Date.now();const cached=await readValue<StreamData&{attemptedAt?:number}>('stream_cache',{items:[],updatedAt:0,apiAvailable:false,errors:[],tmdbConfigured:false});
 let data=cached;
 if(force||now-(cached.attemptedAt||cached.updatedAt)>300000){
  const token=await readValue<string>('tmdb_token','');const errors:string[]=[];let channels:StreamItem[]=cached.items.filter(i=>i.kind==='channel');let events:StreamItem[]=cached.items.filter(i=>i.kind==='event');let apiAvailable=false;
  const out=await Promise.allSettled([json(API+'/channels'),json(API+'/sports')]);
  if(out[0].status==='fulfilled'&&out[0].value.success&&Array.isArray(out[0].value.data)){apiAvailable=true;channels=out[0].value.data.map((c:any)=>({id:'channel:'+str(c.id),kind:'channel',title:str(c.name),description:str(c.description),category:str(c.category)||'TV',image:safeHttps(c.logo_url),embeds:embeds(c.embeds),current:c.epg?.current?{title:str(c.epg.current.title),description:str(c.epg.current.description),start:Number(c.epg.current.start_time)||0,end:Number(c.epg.current.end_time)||0}:undefined,next:str(c.epg?.next?.title)}));}else errors.push('O provedor de canais não respondeu. Tente novamente mais tarde.');
  if(out[1].status==='fulfilled'&&out[1].value.success&&Array.isArray(out[1].value.data)){events=out[1].value.data.map((e:any)=>({id:'event:'+str(e.id),kind:'event',title:str(e.title),description:str(e.description),category:str(e.category)||'Esportes',image:safeHttps(e.poster),embeds:embeds(e.embeds),status:str(e.status)}));}else errors.push('A agenda esportiva está temporariamente indisponível.');
  let titles:StreamItem[]=cached.items.filter(i=>i.kind==='movie'||i.kind==='tv');
  if(token){const lists=await Promise.allSettled(['movie','tv'].map(kind=>json(`https://api.themoviedb.org/3/${kind}/popular?language=pt-BR&page=1`,token)));
   const fresh:StreamItem[]=[];lists.forEach((r,index)=>{const kind=index===0?'movie':'tv';if(r.status==='fulfilled'&&Array.isArray(r.value.results)){r.value.results.filter((m:any)=>!m.adult).forEach((m:any)=>fresh.push({id:kind+':'+m.id,kind,title:str(m.title||m.name),description:str(m.overview),category:kind==='movie'?'Filmes':'Séries',image:m.poster_path?'https://image.tmdb.org/t/p/w500'+m.poster_path:'',embeds:[],year:Number(str(m.release_date||m.first_air_date).slice(0,4))||undefined,rating:Number(m.vote_average)||0,genres:(m.genre_ids||[]).map((id:number)=>genres[id]).filter(Boolean),tmdbId:m.id}));}else errors.push(`Não foi possível atualizar ${kind==='movie'?'filmes':'séries'}. Verifique a configuração do catálogo.`);});if(fresh.length)titles=fresh;
  }else titles=[];
  data={items:[...channels,...events,...titles],updatedAt:out.some(r=>r.status==='fulfilled')?now:cached.updatedAt,apiAvailable,errors,tmdbConfigured:!!token};await writeValue('stream_cache',{...data,attemptedAt:now});
 }
 const overrides=await readValue<Record<string,StreamOverride>>('stream_overrides',{});
 return {...data,items:data.items.map(item=>{const o=overrides[item.id]||{};return {...item,hidden:o.hidden,offline:o.offline,featured:o.featured,embeds:o.sourceUrl?[{provider:'Player do clan',quality:'Web',url:safeHttps(o.sourceUrl)}].filter(e=>e.url):item.embeds};}).filter(i=>includeHidden||!i.hidden)};
}
export async function testTmdb(token:string){const data=await json('https://api.themoviedb.org/3/configuration',token);return !!data.images;}
