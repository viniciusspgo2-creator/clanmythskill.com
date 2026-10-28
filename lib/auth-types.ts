export type AdminRole='admin'|'editor'|'vip';
export type AdminUser={id:string;name:string;email:string;role:AdminRole;passwordHash:string;active:boolean;revision:number;createdAt:string;totpSecret?:string;totpLastCounter?:number};
export type Principal={id:string;name:string;email:string;role:AdminRole;revision:number};
export type AdminSession={id:string;userId:string;tokenHash:string;createdAt:string;expiresAt:string;revokedAt:string|null;agent:string};
export const publicUser=(u:AdminUser)=>({id:u.id,name:u.name,email:u.email,role:u.role,active:u.active,revision:u.revision,createdAt:u.createdAt,twoFactorEnabled:!!u.totpSecret});
