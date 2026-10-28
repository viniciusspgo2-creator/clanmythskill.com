'use client';
import { createContext, useContext, type ImgHTMLAttributes, type ReactNode } from 'react';
import type { MediaItem } from '@/lib/media-library';
const MediaPresentation=createContext<MediaItem[]>([]);
export function MediaPresentationProvider({items,children}:{items:MediaItem[];children:ReactNode}){return <MediaPresentation.Provider value={items}>{children}</MediaPresentation.Provider>}
export function ManagedImage({src,alt='',style,...props}:ImgHTMLAttributes<HTMLImageElement>){const items=useContext(MediaPresentation);const item=typeof src==='string'?items.find(m=>m.url.split('?')[0]===src.split('?')[0]):null;return <img {...props} src={src} alt={alt===''?'':item?.alt||alt} style={{...style,...(item?{objectPosition:`${item.focusX}% ${item.focusY}%`}:{})}}/>}
