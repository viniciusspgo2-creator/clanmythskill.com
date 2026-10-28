'use client';
export { SiteShell } from './mythskill/shell';
export { Home } from './mythskill/home';
export { About, Vip, Journal, ArticleView, PageIntro } from './mythskill/pages';
export { ServerScoreboard } from './mythskill/home';
export { CopyAction as CopyButton } from './mythskill/ui';
export function Eyebrow({children}:{children:React.ReactNode}) { return <span className="ms-kicker">{children}</span>; }
