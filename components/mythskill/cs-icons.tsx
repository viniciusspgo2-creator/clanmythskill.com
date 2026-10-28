import type { SVGProps } from 'react';
/** HUD symbols; weapon silhouette by Skoll / game-icons.net, CC BY 3.0. */
export function CsIcon({kind='crosshair',...props}:SVGProps<SVGSVGElement>&{kind?:'crosshair'|'grenade'|'knife'|'awp'|'bomb'}) {
 if(kind==='awp')return <svg viewBox="0 0 512 512" aria-hidden="true" {...props}><image href="/images/ak47.svg" width="512" height="512"/></svg>;
 return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{kind==='crosshair'?<><circle cx="16" cy="16" r="8"/><path d="M16 2v9m0 10v9M2 16h9m10 0h9"/><circle cx="16" cy="16" r="1"/></>:kind==='grenade'?<><path d="m13 8 2-4h7l3 4-3 7"/><rect x="8" y="10" width="14" height="19" rx="5"/><path d="M8 17h14M8 23h14M15 11v17m0-20h8"/></>:kind==='knife'?<><path d="M4 28 12 20 14 22 6 30ZM12 18 28 3c1 9-4 16-12 19M10 16l8 8"/></>:kind==='bomb'?<><rect x="5" y="11" width="22" height="17" rx="2"/><rect x="11" y="15" width="10" height="6"/><path d="M10 11V6h5l2 5m4 0V3h6M9 25h2m4 0h2m4 0h2"/></>:<><path d="m3 22 5-7h14l3 2h6M9 15l3-3h7M14 12V8h6v4M7 18H3m8 2-3 7m8-7 3 6m2-9v7M25 17v4h-6"/></>}</svg>;
}
