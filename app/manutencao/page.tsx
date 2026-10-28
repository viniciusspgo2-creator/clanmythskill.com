import { getContent } from '@/lib/cms';
import { waLink } from '@/lib/defaults';
import { CsIcon } from '@/components/mythskill/cs-icons';
export const metadata={title:'Manutenção — MythSkill',robots:{index:false,follow:false}};
export default async function Page(){const{settings,design}=await getContent();return <div className="ms-container ms-maintenance"><CsIcon kind="bomb" width={60}/><p className="ms-kicker">PRÓXIMO MAPA</p><h1 className="ms-title">{design.maintenance.title}</h1><p className="ms-lead">{design.maintenance.body}</p><a className="ms-button" href={waLink(settings.whatsapp)}>Falar com a administração ↗</a></div>}
