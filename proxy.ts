import { NextResponse, type NextRequest } from 'next/server';
import { readRecord } from './lib/cms-store';
import type { SiteDesign } from './lib/mythskill-content';
import { isSafeLink } from './lib/cms-validation';
export async function proxy(request:NextRequest){const design=await readRecord<SiteDesign|null>('mythskill:published',null);const redirect=design?.seo.redirects.find(r=>r.from===request.nextUrl.pathname&&r.to!==r.from&&isSafeLink(r.to));if(redirect)return NextResponse.redirect(new URL(redirect.to,request.url),301);return NextResponse.next();}
export const config={matcher:['/((?!api|admin|_next|media|images|fonts|favicon|og-placeholder|robots.txt|sitemap.xml).*)']};
