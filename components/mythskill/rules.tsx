'use client';
import { useCopy } from '@/components/mythskill/copy';
import { useState } from 'react';
import { ShieldCheck, AlertTriangle, HeartHandshake } from 'lucide-react';
import { useSiteDesign } from './shell';
import { Modal, TabGroup } from './ui';
const icons=['🤝','🗣️','🛡️','💬','🎮','🚫','⚔️','🐞','🏅','📣'];
export function RulesButton(){
 const t=useCopy();const design=useSiteDesign();const[open,setOpen]=useState(false);
 const render=(rules:string[],admin:boolean)=><div className="ms-rules-content"><div className="ms-rules-alert"><AlertTriangle size={18}/><span>{admin?'Moderadores e administradores devem dar o exemplo.':'Respeito, fair play e diversão em primeiro lugar. Conheça as regras antes de entrar.'}</span></div><ol className="ms-rule-cards">{rules.map((rule,i)=><li key={i}><span className="ms-rule-emoji" aria-hidden="true">{admin?['🛡️','📋','⚖️','🤝','📣'][i%5]:icons[i%icons.length]}</span><div><small>REGRA {String(i+1).padStart(2,'0')}</small><p>{rule}</p></div></li>)}</ol><div className="ms-rules-foot"><HeartHandshake size={19}/> Uma comunidade forte começa pelo respeito.</div></div>;
 return <><button className="ms-link ms-rules-button" onClick={()=>setOpen(true)}><ShieldCheck size={16}/><span>Regras do clan</span></button><Modal open={open} onOpenChange={setOpen} title={t('ui_jogo_limpo_respeito_sempre__2344c4','Jogo limpo. Respeito sempre.')} description="Conheça o código de conduta dos jogadores e da administração."><TabGroup items={[{id:'players',label:t('ui_jogadores_c702ea','Jogadores'),content:render(design.rules.server,false)},{id:'admin',label:t('ui_administracao_855dc3','Administração'),content:render(design.rules.admin,true)}]}/></Modal></>;
}
