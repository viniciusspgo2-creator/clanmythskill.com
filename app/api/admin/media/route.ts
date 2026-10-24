import { env } from '@/lib/platform';
import { isAdmin,sameOrigin } from '@/lib/admin-auth';
export async function POST(req:Request){
 if(!await isAdmin()||!sameOrigin(req))return Response.json({error:'Acesso restrito.'},{status:403});if(!env.BUCKET)return Response.json({error:'Armazenamento indisponível.'},{status:503});if(Number(req.headers.get('content-length')||0)>4500000)return Response.json({error:'Máximo de 4 MB.'},{status:413});
 try{const data=await req.formData();const file=data.get('file');if(!(file instanceof File)||file.size>4000000||!['image/jpeg','image/png','image/webp'].includes(file.type))return Response.json({error:'Envie JPG, PNG ou WebP de até 4 MB.'},{status:400});
 const bytes=await file.arrayBuffer();const h=new Uint8Array(bytes);const valid=(file.type==='image/png'&&h[0]===137&&h[1]===80&&h[2]===78)||(file.type==='image/jpeg'&&h[0]===255&&h[1]===216)||(file.type==='image/webp'&&String.fromCharCode(...h.slice(0,4))==='RIFF'&&String.fromCharCode(...h.slice(8,12))==='WEBP');if(!valid)return Response.json({error:'O arquivo não é uma imagem válida.'},{status:400});
 const id=crypto.randomUUID();await env.BUCKET.put(id,bytes,{httpMetadata:{contentType:file.type}});return Response.json({url:`/media/${id}`});}catch{return Response.json({error:'Falha no envio da imagem.'},{status:400});}
}
