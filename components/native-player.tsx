'use client';
import {useEffect,useRef,useState} from 'react';
import {AlertCircle} from 'lucide-react';
import type {Embed} from '@/lib/stream-types';
export function NativePlayer({source,title}:{source:Embed;title:string}){
  const video=useRef<HTMLVideoElement>(null);
  const[error,setError]=useState('');
  useEffect(()=>{
    let active=true;let destroy:(()=>void)|undefined;
    const el=video.current;if(!el)return;
    setError('');
    const play=()=>{if(active)el.play().catch(()=>{});};
    if(source.kind==='hls'&&!el.canPlayType('application/vnd.apple.mpegurl')){
      import('hls.js').then(({default:Hls})=>{
        if(!active)return;
        if(!Hls.isSupported()){setError('Este navegador não oferece suporte a esta fonte de vídeo.');return;}
        const hls=new Hls();destroy=()=>hls.destroy();hls.loadSource(source.url);hls.attachMedia(el);
        hls.on(Hls.Events.MANIFEST_PARSED,play);
        hls.on(Hls.Events.ERROR,(_event,data)=>{if(data.fatal)setError('Não foi possível carregar a transmissão. Tente outra fonte ou avise a administração.');});
      }).catch(()=>{if(active)setError('Não foi possível iniciar o player. Atualize a página e tente novamente.');});
    }else{el.src=source.url;play();}
    return()=>{active=false;destroy?.();el.pause();el.removeAttribute('src');el.load();};
  },[source.url,source.kind]);
  return <div className="native-player"><video ref={video} controls playsInline autoPlay aria-label={`Vídeo de ${title}`} onError={()=>setError('A fonte não está disponível ou não permite reprodução neste site. Tente outra opção.')}/>{error&&<div className="native-player-error" role="alert"><AlertCircle size={24}/><p>{error}</p></div>}</div>;
}
