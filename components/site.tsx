'use client';
export { SiteShell } from './mythskill/shell';
export { Home } from './mythskill/home';
export { About, Vip, Journal, ArticleView, PageIntro, Servers, VipBanner, ArticleCard } from './legacy-site';
export { CopyAction as CopyButton } from './mythskill/ui';
export function Eyebrow({children}:{children:React.ReactNode}) { return <span className="ms-kicker">{children}</span>; }
