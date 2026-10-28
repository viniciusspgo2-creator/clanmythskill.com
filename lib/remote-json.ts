/** Narrow external JSON at the boundary instead of spreading untrusted objects. */
export type JsonObject=Record<string,unknown>;
export const object=(value:unknown):JsonObject=>value!==null&&typeof value==='object'&&!Array.isArray(value)?value as JsonObject:{};
export const text=(value:unknown)=>typeof value==='string'?value:'';
export const array=(value:unknown):unknown[]=>Array.isArray(value)?value:[];
