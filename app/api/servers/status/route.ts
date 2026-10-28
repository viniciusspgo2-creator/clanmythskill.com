import { getContent } from '@/lib/cms';
import { liveStatus } from '@/lib/live-server-status';
export const runtime='nodejs';
export async function GET(){const {settings,design}=await getContent();if(!design.liveStatusEnabled)return Response.json({available:false,servers:{}},{headers:{'Cache-Control':'public,max-age=30'}});const rows=await Promise.all(settings.servers.map(async s=>[s.ip,await liveStatus(s.ip,design.statusProvider)] as const));const servers=Object.fromEntries(rows.filter(([,status])=>status));return Response.json({available:Object.keys(servers).length>0,servers},{headers:{'Cache-Control':'public,max-age=30'}});}
