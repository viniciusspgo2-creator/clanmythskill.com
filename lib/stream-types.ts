export type Embed={provider:string;quality:string;url:string;kind?:'embed'|'hls'|'mp4';episodePlayer?:'streambetter'};
export type StreamItem={id:string;kind:'channel'|'event'|'movie'|'tv';title:string;description:string;category:string;image:string;backdrop?:string;embeds:Embed[];status?:string;current?:{title:string;start:number;end:number;description:string};next?:string;year?:number;rating?:number;genres?:string[];tmdbId?:number;featured?:boolean;offline?:boolean;hidden?:boolean;};
export type StreamOverride={title?:string;description?:string;category?:string;image?:string;hidden?:boolean;offline?:boolean;featured?:boolean;sourceUrl?:string;sourceType?:'auto'|'embed'|'hls'|'mp4';disableAutomatic?:boolean};
export type StreamData={items:StreamItem[];updatedAt:number;apiAvailable:boolean;errors:string[];tmdbConfigured:boolean;overrides?:Record<string,StreamOverride>;streambetter?:StreambetterStatus;};

export type StreambetterStatus={enabled:boolean;catalogAvailable:boolean;updatedAt:number;counts:{movie:number;tv:number};error?:string};
