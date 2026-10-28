'use client';
import { useSyncExternalStore } from 'react';
let now=0;let timer:ReturnType<typeof setInterval>|null=null;
const listeners=new Set<()=>void>();
function update(){now=Date.now();listeners.forEach(listener=>listener());}
function subscribe(listener:()=>void){listeners.add(listener);if(!timer){queueMicrotask(update);timer=setInterval(update,1000);}return()=>{listeners.delete(listener);if(!listeners.size&&timer){clearInterval(timer);timer=null;}};}
export function useNow(){return useSyncExternalStore(subscribe,()=>now,()=>0);}
