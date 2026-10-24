export type Embed={provider:string;quality:string;url:string};
export type StreamItem={id:string;kind:'channel'|'event'|'movie'|'tv';title:string;description:string;category:string;image:string;embeds:Embed[];status?:string;current?:{title:string;start:number;end:number;description:string};next?:string;year?:number;rating?:number;genres?:string[];tmdbId?:number;featured?:boolean;offline?:boolean;hidden?:boolean;};
export type StreamOverride={hidden?:boolean;offline?:boolean;featured?:boolean;sourceUrl?:string};
export type StreamData={items:StreamItem[];updatedAt:number;apiAvailable:boolean;errors:string[];tmdbConfigured:boolean;overrides?:Record<string,StreamOverride>;};
