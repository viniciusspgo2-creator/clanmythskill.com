'use client';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {ShieldCheck,X,ArrowUpRight,ChevronDown,Trophy,Download,BookOpen,Radio,MessageCircle,Users,Crosshair,Gamepad2,Crown,LockKeyhole} from 'lucide-react';
import {communityLinks,serverRules,adminRules,communityFaq} from '@/lib/community';
import {waLink,type Settings} from '@/lib/defaults';

export function RulesButton({whatsapp,className='button ghost'}:{whatsapp:string;className?:string}){
  const[open,setOpen]=useState(false);
  const[tab,setTab]=useState<'server'|'admin'>('server');
  const close=useRef<HTMLButtonElement>(null);
  const modal=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(!open)return;
    const previous=document.activeElement as HTMLElement;
    const overflow=document.body.style.overflow;
    document.body.style.overflow='hidden';close.current?.focus();
    const handle=(e:KeyboardEvent)=>{
      if(e.key==='Escape')setOpen(false);
      if(e.key==='Tab'){
        const all=modal.current?.querySelectorAll<HTMLElement>('button,a[href]');
        const first=all?.[0],last=all?.[all.length-1];
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
        else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
      }
    };
    window.addEventListener('keydown',handle);
    return()=>{document.body.style.overflow=overflow;window.removeEventListener('keydown',handle);previous?.focus();};
  },[open]);
  return <><button type="button" className={className} onClick={()=>{setTab('server');setOpen(true)}}><ShieldCheck size={19}/> REGRAS DO SERVIDOR</button>
    {open&&<div className="rules-backdrop" onClick={e=>{if(e.currentTarget===e.target)setOpen(false)}}>
      <div ref={modal} className="rules-dialog" role="dialog" aria-modal="true" aria-labelledby="rules-title">
        <button ref={close} className="modal-close" onClick={()=>setOpen(false)} aria-label="Fechar regras"><X size={24}/></button>
        <span className="section-kicker"><ShieldCheck size={19}/> RESPEITO É A BASE DO CLAN</span>
        <h2 id="rules-title">{tab==='server'?'Regras do Servidor':'Regras da Administração'}</h2>
        <div className="rules-tabs" role="tablist" aria-label="Tipo de regras">
          <button role="tab" id="rules-server-tab" aria-selected={tab==='server'} aria-controls="rules-content" onClick={()=>setTab('server')}><Users size={18}/> Jogadores</button>
          <button role="tab" id="rules-admin-tab" aria-selected={tab==='admin'} aria-controls="rules-content" onClick={()=>setTab('admin')}><ShieldCheck size={18}/> Administração</button>
        </div>
        <div id="rules-content" role="tabpanel" aria-labelledby={tab==='server'?'rules-server-tab':'rules-admin-tab'}>
          <ol className="rules-list">{(tab==='server'?serverRules:adminRules).map((rule,i)=><li key={rule}><span>{String(i+1).padStart(2,'0')}</span>{rule}</li>)}</ol>
        </div>
        <p className="rules-reminder"><strong>Lembre-se:</strong> O desconhecimento das regras não isenta de punição. Ao entrar no servidor, você concorda automaticamente com todas as regras estabelecidas.</p>
        <div className="rules-contact"><p><strong>Dúvidas?</strong> Entre em contato com nossa administração através dos canais oficiais.</p><a className="button primary" href={waLink(whatsapp)} target="_blank" rel="noreferrer"><MessageCircle size={18}/> FALAR COM A ADMINISTRAÇÃO</a></div>
      </div>
    </div>}
  </>;
}
export function CommunityResources({settings:s}:{settings:Settings}){
  return <section className="section player-hub" id="central-do-player"><div className="container">
    <div className="section-heading"><div><span className="section-kicker"><Crosshair size={19}/> CENTRAL DO PLAYER</span><h2>TUDO PRONTO.<br/><em>AGORA É JOGAR.</em></h2></div><p>Prepare sua configuração, acompanhe a comunidade e conheça as regras antes de entrar no round.</p></div>
    <div className="official-panels-intro"><span className="section-kicker">CONSULTA EXTERNA · PAINEL EFFEXO</span><p>Escolha o que deseja consultar. Os dois acessos abrem o painel oficial da MythSkill em uma nova aba.</p></div>
    <div className="official-panels-grid">
      <a href={communityLinks.ranking} className="official-panel-card official-panel-card--ranking" target="_blank" rel="noopener noreferrer" aria-label="Abrir ranking e patentes no painel externo Effexo">
        <div className="official-panel-top"><span className="official-panel-symbol"><Trophy size={29}/></span><span className="official-panel-kicker">COMPETIÇÃO / JOGADORES <ArrowUpRight size={19}/></span></div>
        <h3>RANKING <em>&amp; PATENTES</em></h3>
        <p>Confira o ranking dos jogadores e as patentes exibidas no painel do servidor.</p>
        <span className="official-panel-action">CONSULTAR RANKING <ArrowUpRight size={20}/></span>
      </a>
      <a href={communityLinks.bans} className="official-panel-card official-panel-card--bans" target="_blank" rel="noopener noreferrer" aria-label="Abrir lista de banimentos no painel externo Effexo">
        <div className="official-panel-top"><span className="official-panel-symbol"><ShieldCheck size={29}/></span><span className="official-panel-kicker">MODERAÇÃO / PUNIÇÕES <ArrowUpRight size={19}/></span></div>
        <h3>LISTA DE <em>BANIMENTOS</em></h3>
        <p>Consulte os banimentos e registros de moderação disponibilizados pelo painel.</p>
        <span className="official-panel-action">CONSULTAR BANIMENTOS <ArrowUpRight size={20}/></span>
      </a>
    </div>
    <div className="player-hub-grid player-hub-grid--secondary">
      <Link href="/guia" className="hub-card"><BookOpen size={31}/><span>REQUISITOS + CONSOLE</span><h3>Seu jogo, bem ajustado.</h3><p>Veja o que seu computador precisa e copie comandos para mira, áudio e desempenho.</p><b>ABRIR GUIA DO PLAYER <ArrowUpRight size={19}/></b></Link>
      <a href={communityLinks.download} className="hub-card" target="_blank" rel="noopener noreferrer"><Download size={31}/><span>DOWNLOAD EXTERNO</span><h3>Precisa instalar o 1.6?</h3><p>Abra a página de download CS 1.6 No-Steam da iceeedR, indicada pelo clan.</p><b>VER PÁGINA DE DOWNLOAD <ArrowUpRight size={19}/></b></a>
    </div>
    <div className="hub-bottom"><RulesButton whatsapp={s.whatsapp}/><a className="text-link" href={communityLinks.server} target="_blank" rel="noreferrer"><Radio size={18}/> MYTHSKILL NA ICEEEDR <ArrowUpRight size={18}/></a></div>
  </div></section>;
}
export function CommunityFAQ({settings:s}:{settings:Settings}){
  return <section className="section faq-section" id="duvidas"><div className="container faq-layout"><div><span className="section-kicker">PERGUNTOU? A CALL TÁ AQUI.</span><h2>MENOS DÚVIDAS.<br/><em>MAIS ROUND.</em></h2><p className="faq-intro">Conexão, VIP, configuração e streaming: encontre o caminho antes de chamar a administração.</p><a href={waLink(s.whatsapp)} target="_blank" rel="noreferrer" className="text-link"><MessageCircle size={18}/> FALAR COM O CLAN <ArrowUpRight size={18}/></a></div><div className="faq-list">{communityFaq.map(f=><details key={f.question}><summary>{f.question}<ChevronDown size={20}/></summary><p>{f.answer}</p></details>)}</div></div></section>;
}

export function HomeOnboarding({settings:s}:{settings:Settings}){
 return <section className="section home-onboarding"><div className="container"><div className="section-heading"><div><span className="section-kicker">CHEGOU AGORA? ESSA É A CALL.</span><h2>DO PRIMEIRO CONNECT<br/><em>À ROTINA DO CLAN.</em></h2></div><p>Um caminho simples para entrar, conhecer a comunidade e aproveitar os benefícios disponíveis aos players.</p></div><div className="onboarding-grid"><article><span>01</span><Gamepad2 size={31}/><h3>Escolha seu round.</h3><p>4FUN, reserva ou MIX: escolha o endereço que combina com a sua partida. Conecte pela Steam ou copie o comando do console.</p><a href="#servidores" className="text-link">VER SERVIDORES <ArrowUpRight size={18}/></a></article><article><span>02</span><Users size={31}/><h3>Conheça a casa.</h3><p>Leia as regras, respeite os outros jogadores e chegue junto na resenha. Precisou de ajuda? A administração está nos canais oficiais.</p><RulesButton whatsapp={s.whatsapp} className="text-link"/></article><article><span>03</span><Crown size={31}/><h3>Fortaleça a comunidade.</h3><p>Conheça o VIP e participe da rotina do servidor. Os códigos do Streaming Mithys são distribuídos pela administração aos players elegíveis.</p><Link href="/ativar-vip" className="text-link">CONHECER O VIP <ArrowUpRight size={18}/></Link></article></div><div className="player-benefit-banner"><LockKeyhole size={32}/><div><span>UM BENEFÍCIO PARA QUEM TÁ JUNTO.</span><h3>Streaming Mithys: sua pausa entre as partidas.</h3><p>Acesso por código para os players que marcam presença e contribuem com o clan. Solicite a liberação à administração.</p></div><Link href="/streaming" className="button primary"><LockKeyhole size={20}/> ACESSAR STREAMING <ArrowUpRight size={19}/></Link></div></div></section>;
}
