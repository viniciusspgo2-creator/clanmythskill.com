'use client';
import Image from 'next/image';
import {createContext,useContext,type ImgHTMLAttributes,type ReactNode} from 'react';
import type {MediaItem} from '@/lib/media-library';
const MediaPresentation=createContext<MediaItem[]>([]);
export function MediaPresentationProvider({items,children}:{items:MediaItem[];children:ReactNode}){return <MediaPresentation.Provider value={items}>{children}</MediaPresentation.Provider>}
export function ManagedImage({src,alt='',style,width,height,sizes,fetchPriority,...props}:ImgHTMLAttributes<HTMLImageElement>){const items=useContext(MediaPresentation);const item=typeof src==='string'?items.find(m=>m.url.split('?')[0]===src.split('?')[0]):null;return <Image {...props} src={typeof src==='string'&&src?src:'/og-placeholder.jpg'} width={Number(width)||640} height={Number(height)||400} sizes={sizes||(Number(width)>1000?'100vw':Number(width)<=240?'240px':'(max-width:700px) 90vw, (max-width:1100px) 45vw, 420px')} loading={fetchPriority==='high'?'eager':props.loading||'lazy'} fetchPriority={fetchPriority} unoptimized={typeof src!=='string'||!src.startsWith('/')||src.endsWith('.svg')} alt={alt===''?'':item?.alt||alt} style={{...style,...(item?{objectPosition:`${item.focusX}% ${item.focusY}%`}:{})}}/>}
