export type VipStatus='pending'|'paid'|'activated'|'rejected';
export type VipRequest={id:string;name:string;nick:string;steamId:string;days:number;total:number;createdAt:string;updatedAt:string;status:VipStatus;notes:string;receipt:{key:string;name:string;type:string;size:number}};
export const vipStatusLabels:Record<VipStatus,string>={pending:'Pendente',paid:'Pago',activated:'Ativado',rejected:'Recusado'};
export function csvCell(value:unknown){const text=String(value??'');return '"'+(/^[=+@\-\t\r]/.test(text)?"'":'')+text.replaceAll('"','""')+'"';}
