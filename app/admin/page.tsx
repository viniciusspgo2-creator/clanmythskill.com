
import Link from 'next/link';
import {chatGPTSignInPath} from '@/app/chatgpt-auth';
import {getAdminState} from '@/lib/admin-auth';
import {AdminLogin} from '@/components/admin-login';
import {AdminConsole} from '@/components/mythskill/admin';
import {ShieldCheck} from 'lucide-react';
export const dynamic='force-dynamic';
export const metadata={title:'Admin MythSkill',robots:{index:false,follow:false}};
export default async function Page(){const state=await getAdminState();if(state.mode==='next'&&!state.authorized)return <AdminLogin needsSetup={state.needsSetup}/>;if(!state.signedIn)return <div className="ms-admin-login"><ShieldCheck size={38}/><p className="ms-kicker">MYTHSKILL / COMANDO CENTRAL</p><h1>Acesso da administração.</h1><a className="ms-button" href={chatGPTSignInPath('/admin')} target="_top">Entrar com ChatGPT →</a><Link className="ms-link" href="/">Voltar ao site</Link></div>;if(!state.authorized||!state.user)return <div className="ms-admin-login"><h1>Acesso restrito.</h1><p>Esta conta não está autorizada a administrar o site.</p><Link className="ms-button ms-button--secondary" href="/">Voltar ao site</Link></div>;return <AdminConsole user={state.user} mode={state.mode}/>}
