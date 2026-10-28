'use client';
<<<<<<< HEAD
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
=======
import { CopyText, useCopy } from '@/components/mythskill/copy';
import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useSiteDesign } from './shell';
import { Modal, TabGroup } from './ui';
export function RulesButton(){const t=useCopy();const design=useSiteDesign();const[open,setOpen]=useState(false);return <><button className="ms-link ms-rules-button" onClick={()=>setOpen(true)}><ShieldCheck size={14}/><CopyText id="ui_regras_do_clan_304de2" text="Regras do clan"/></button><Modal open={open} onOpenChange={setOpen} title={t("ui_jogo_limpo_respeito_sempre__2344c4","Jogo limpo. Respeito sempre.")} description={t("ui_regras_de_convivencia_para_jogadores_e_a_03596b","Regras de convivência para jogadores e administração.")}><TabGroup items={[{id:'players',label:t("ui_jogadores_c702ea","Jogadores"),content:<ol className="ms-rule-list">{design.rules.server.map((r,i)=><li key={i}>{r}</li>)}</ol>},{id:'admin',label:t("ui_administracao_855dc3","Administração"),content:<ol className="ms-rule-list">{design.rules.admin.map((r,i)=><li key={i}>{r}</li>)}</ol>}]}/></Modal></>}
>>>>>>> 038104472d298e622b96be4362e7e17e2893a9a9
