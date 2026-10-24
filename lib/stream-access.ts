import {cookies} from 'next/headers';
import {env} from '@/lib/platform';
import {isAdmin} from '@/lib/admin-auth';
import {verifyAccessSession} from './stream-access-core';
export async function hasStreamingAccess(){
 if(await isAdmin())return true;
 if(!env.DB)return false;
 const token=(await cookies()).get('myth_stream')?.value||'';
 return verifyAccessSession(env.DB,token);
}
