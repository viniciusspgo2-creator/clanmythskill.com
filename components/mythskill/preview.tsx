'use client';
import { useEffect, useState } from 'react';
import type { CmsSnapshot } from '@/lib/cms-validation';
import { snapshotSchema } from '@/lib/cms-validation';
import { SiteShell } from './shell';
import { Home } from './home';
import { About, Vip, Journal } from './pages';
import { PlayerGuide } from './guide';
export function Preview({initial}:{initial:CmsSnapshot}){const[data,setData]=useState(initial);const[path,setPath]=useState('/');useEffect(()=>{const handler=(event:MessageEvent)=>{if(event.origin!==window.location.origin||event.source!==window.parent||event.data?.type!=='mythskill:preview')return;const parsed=snapshotSchema.safeParse(event.data.snapshot);if(parsed.success){setData(parsed.data);setPath(event.data.path||'/');}};window.addEventListener('message',handler);return()=>window.removeEventListener('message',handler);},[]);return <SiteShell settings={data.settings} design={data.design} preview>{path==='/sobre'?<About settings={data.settings}/>:path==='/ativar-vip'?<Vip settings={data.settings}/>:path==='/blog'?<Journal settings={data.settings} articles={data.articles}/>:path==='/guia'?<PlayerGuide settings={data.settings}/>:<Home {...data}/>}</SiteShell>}
