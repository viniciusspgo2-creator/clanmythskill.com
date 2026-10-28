'use client';
import { createContext, useCallback, useContext, type ReactNode } from 'react';
const CopyContext=createContext<Record<string,string>>({});
export function CopyProvider({value,children}:{value:Record<string,string>;children:ReactNode}){return <CopyContext.Provider value={value}>{children}</CopyContext.Provider>}
export function useCopy(){const copy=useContext(CopyContext);return useCallback((id:string,fallback:string)=>copy[id]??fallback,[copy]);}
export function CopyText({id,text}:{id:string;text:string}){const copy=useContext(CopyContext);return <>{copy[id]??text}</>}
