'use client';
import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useSiteDesign } from './shell';
import { Modal, TabGroup } from './ui';
export function RulesButton(){const design=useSiteDesign();const[open,setOpen]=useState(false);return <><button className="ms-link ms-rules-button" onClick={()=>setOpen(true)}><ShieldCheck size={14}/>Regras do clan</button><Modal open={open} onOpenChange={setOpen} title="Jogo limpo. Respeito sempre." description="Regras de convivência para jogadores e administração."><TabGroup items={[{id:'players',label:'Jogadores',content:<ol className="ms-rule-list">{design.rules.server.map((r,i)=><li key={i}>{r}</li>)}</ol>},{id:'admin',label:'Administração',content:<ol className="ms-rule-list">{design.rules.admin.map((r,i)=><li key={i}>{r}</li>)}</ol>}]}/></Modal></>}
