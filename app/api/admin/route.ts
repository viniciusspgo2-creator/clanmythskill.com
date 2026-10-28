/** Compatibility entrypoint: old clients now save to the same reviewable draft. */
import { z } from 'zod';
import { getContent, getStats } from '@/lib/cms';
import { hasRole, sameOrigin } from '@/lib/admin-auth';
import { getDraft, saveDraft } from '@/lib/cms-admin';
import { articleSchema, settingsSchema, validationError } from '@/lib/cms-validation';
export async function GET(){if(!await hasRole('admin'))return Response.json({error:'Acesso restrito.'},{status:403});return Response.json({...await getContent(true),stats:await getStats()},{headers:{'Cache-Control':'no-store'}});}
export async function PUT(req:Request){const user=await hasRole('admin');if(!user||!sameOrigin(req))return Response.json({error:'Acesso restrito.'},{status:403});if(Number(req.headers.get('content-length')||0)>1_000_000)return Response.json({error:'Conteúdo muito grande.'},{status:413});try{const body=z.object({type:z.enum(['settings','article']),value:z.unknown()}).parse(await req.json());const current=await getDraft();const snapshot=current.snapshot;if(body.type==='settings')snapshot.settings=settingsSchema.parse(body.value);else{const article=articleSchema.parse(body.value);snapshot.articles=[...snapshot.articles.filter(a=>a.slug!==article.slug),article];}const draft=await saveDraft(snapshot,current.revision,user);return Response.json({ok:true,draft,message:'Salvo como rascunho. Publique pelo novo painel.'});}catch(e){return Response.json({error:validationError(e)},{status:400});}}
