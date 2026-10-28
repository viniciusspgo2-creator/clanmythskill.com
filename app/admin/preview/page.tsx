import { notFound } from 'next/navigation';
import { hasRole } from '@/lib/admin-auth';
import { getDraft } from '@/lib/cms-admin';
import { Preview } from '@/components/mythskill/preview';
export const dynamic='force-dynamic';
export const metadata={title:'Prévia privada',robots:{index:false,follow:false}};
export default async function Page(){if(!await hasRole('admin','editor'))notFound();return <Preview initial={(await getDraft()).snapshot}/>}
