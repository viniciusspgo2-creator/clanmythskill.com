'use client';
import {useCopy} from '@/components/mythskill/copy';
import {useEffect,useRef,useState} from 'react';
import {AlertCircle} from 'lucide-react';
import type {Embed} from '@/lib/stream-types';
export function NativePlayer({source,title}:{source:Embed;title:string}){const t=useCopy();
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
        if(!Hls.isSupported()){setError(t("ui_este_navegador_nao_oferece_suporte_a_est_e87588","Este navegador não oferece suporte a esta fonte de vídeo."));return;}
        const hls=new Hls();destroy=()=>hls.destroy();hls.loadSource(source.url);hls.attachMedia(el);
        hls.on(Hls.Events.MANIFEST_PARSED,play);
        hls.on(Hls.Events.ERROR,(_event,data)=>{if(data.fatal)setError(t("ui_nao_foi_possivel_carregar_a_transmissao__c8aa30","Não foi possível carregar a transmissão. Tente outra fonte ou avise a administração."));});
      }).catch(()=>{if(active)setError(t("ui_nao_foi_possivel_iniciar_o_player_atuali_59b02e","Não foi possível iniciar o player. Atualize a página e tente novamente."));});
    }else{el.src=source.url;play();}
    return()=>{active=false;destroy?.();el.pause();el.removeAttribute('src');el.load();};
  },[source.url,source.kind,t]);
  return <div className="native-player"><video ref={video} controls playsInline autoPlay aria-label={`Vídeo de ${title}`} onError={()=>setError(t("ui_a_fonte_nao_esta_disponivel_ou_nao_permi_b8d8de","A fonte não está disponível ou não permite reprodução neste site. Tente outra opção."))}/>{error&&<div className="native-player-error" role="alert"><AlertCircle size={24}/><p>{error}</p></div>}</div>;
}
