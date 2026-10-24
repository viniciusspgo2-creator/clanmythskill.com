import {getChatGPTUser,chatGPTSignInPath} from '@/app/chatgpt-auth';
import {getAdminState} from '@/lib/admin-auth';
import {AdminLogin} from '@/components/admin-login';
import {AdminPanel} from '@/components/admin';
import {ShieldCheck,ArrowLeft} from 'lucide-react';
export const dynamic='force-dynamic';
export const metadata={title:'Admin MythSkill',robots:{index:false,follow:false}};
export default async function Page(){const state=await getAdminState();if(state.mode==='next'&&!state.authorized)return <AdminLogin needsSetup={state.needsSetup}/>;if(!state.signedIn)return <div className="admin-login"><img src="/images/logo.webp" alt="MythSkill" width="120" height="120"/><ShieldCheck size={26}/><span className="micro-label">MYTHSKILL // COMANDO CENTRAL</span><h1>ACESSO DA<br/><em>ADMINISTRAÇÃO.</em></h1><p>Entre com a conta autorizada para gerenciar o clan.</p><a className="button primary" href={chatGPTSignInPath('/admin')} target="_top">ENTRAR COM CHATGPT →</a><a className="text-link" href="/"><ArrowLeft size={15}/> VOLTAR AO SITE</a></div>;if(!state.authorized)return <div className="admin-login"><ShieldCheck size={40}/><h1>ACESSO RESTRITO.</h1><p>Esta conta não está autorizada a administrar o site.</p><a className="button ghost" href="/">VOLTAR AO SITE</a></div>;return <AdminPanel userName={state.displayName} mode={state.mode}/>}
