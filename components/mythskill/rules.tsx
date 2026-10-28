'use client';
import { CopyText, useCopy } from '@/components/mythskill/copy';
import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useSiteDesign } from './shell';
import { Modal, TabGroup } from './ui';
export function RulesButton(){const t=useCopy();const design=useSiteDesign();const[open,setOpen]=useState(false);return <><button className="ms-link ms-rules-button" onClick={()=>setOpen(true)}><ShieldCheck size={14}/><CopyText id="ui_regras_do_clan_304de2" text="Regras do clan"/></button><Modal open={open} onOpenChange={setOpen} title={t("ui_jogo_limpo_respeito_sempre__2344c4","Jogo limpo. Respeito sempre.")} description={t("ui_regras_de_convivencia_para_jogadores_e_a_03596b","Regras de convivência para jogadores e administração.")}><TabGroup items={[{id:'players',label:t("ui_jogadores_c702ea","Jogadores"),content:<ol className="ms-rule-list">{design.rules.server.map((r,i)=><li key={i}>{r}</li>)}</ol>},{id:'admin',label:t("ui_administracao_855dc3","Administração"),content:<ol className="ms-rule-list">{design.rules.admin.map((r,i)=><li key={i}>{r}</li>)}</ol>}]}/></Modal></>}
