'use client';
import type { ManagedPage, PageSection } from '@/lib/mythskill-content';
import { Card } from './ui';
import { SmartLink } from './shell';
import { ManagedImage } from './managed-image';
export function ManagedSection({section}:{section:PageSection}){return <section id={section.id} className="ms-section"><div className="ms-container"><p className="ms-kicker">{section.eyebrow}</p><h2 className="ms-heading">{section.title}</h2><div className="ms-prose">{section.body.split(/\n\n+/).map((text,i)=><p key={i}>{text}</p>)}</div>{!!section.items.length&&<div className="ms-grid">{section.items.map(item=><Card key={item.id}>{item.image&&<ManagedImage src={item.image} alt={item.title} width={640} height={400} loading="lazy"/>}<h3>{item.title}</h3><p>{item.body}</p>{item.href&&<SmartLink href={item.href} className="ms-link">{item.label||item.title} ↗</SmartLink>}</Card>)}</div>}</div></section>}
export function ManagedPageView({page}:{page:ManagedPage}){return <><header className="ms-page-hero"><div className="ms-container"><p className="ms-kicker">MYTHSKILL</p><h1 className="ms-title">{page.title}</h1><p className="ms-lead">{page.description}</p></div></header>{page.sections.filter(s=>s.enabled).map(section=><ManagedSection section={section} key={section.id}/>)}</>}
