import { getPrincipal } from '@/lib/admin-auth';
import { getStats } from '@/lib/cms';
import { records, type AuditEntry } from '@/lib/cms-store';
import type { VipRequest } from '@/lib/vip-requests';
import { env } from '@/lib/platform';
export async function GET(){const user=await getPrincipal();if(!user)return Response.json({error:'Acesso restrito.'},{status:403});const requests=user.role==='editor'?[]:(await records<VipRequest>('vip:request:')).map(r=>r.value);const logs=(await records<AuditEntry>('audit:')).map(r=>r.value).filter(r=>user.role==='admin'||r.actor===user.email).slice(0,80);const codes=user.role==='admin'?await env.DB?.prepare('SELECT id,label,expires_at,revoked_at FROM stream_access_codes').all<{id:string;label:string;expires_at:string|null;revoked_at:string|null}>():null;return Response.json({user,stats:await getStats(),vip:{pending:requests.filter(r=>r.status==='pending').length,total:requests.length},expiringCodes:codes?.results.filter(r=>!r.revoked_at&&r.expires_at&&Date.parse(r.expires_at)>Date.now()&&Date.parse(r.expires_at)<Date.now()+7*86400000)||[],logs},{headers:{'Cache-Control':'no-store'}});}
