import test from 'node:test';
import assert from 'node:assert/strict';
import {safeHttps,normalizeChannels,normalizeEvents,browserCatalog} from '../lib/stream-normalize';
import {validPassword,newSession,verifySession} from '../lib/admin-auth';
import {articles} from '../lib/articles';

test('players aceitam somente URLs HTTPS públicas sem credenciais',()=>{
 for(const url of ['http://player.example/x','javascript:alert(1)','https://localhost/x','https://127.0.0.1/x','https://[::1]/x','https://server.local/x','https://user:pass@player.example/x','https://player.example:8888/x'])assert.equal(safeHttps(url),'');
 assert.equal(safeHttps('https://player.example/embed/canal'),'https://player.example/embed/canal');
});
test('normalização aceita EPG opcional e remove fonte insegura',()=>{
 const items=normalizeChannels([{id:'canal',name:'Canal',embeds:[{embed_url:'javascript:alert(1)'},{provider:'Servidor 2',quality:'HD',embed_url:'https://player.example/a'}]}]);
 assert.equal(items[0].embeds.length,1);assert.equal(items[0].current,undefined);assert.equal(items[0].id,'channel:canal');
 const epg=normalizeChannels([{id:'a',epg:{current:{title:'Programa',start_time:1792806300,end_time:1792809300}}}])[0].current;
 assert.equal(epg?.start,1792806300);assert.equal(normalizeEvents([{id:'match',title:'Jogo',status:'upcoming'}])[0].status,'upcoming');
});
test('consulta direta respeita ocultação, offline e fonte cadastrada',async()=>{
 const original=globalThis.fetch;globalThis.fetch=async(input)=>new Response(JSON.stringify({success:true,data:String(input).endsWith('channels')?[{id:'oculto',name:'Oculto'},{id:'visivel',name:'Visível'}]:[]}));
 try{const result=await browserCatalog({items:[],updatedAt:0,errors:[],apiAvailable:false,tmdbConfigured:false,overrides:{'channel:oculto':{hidden:true},'channel:visivel':{offline:true,sourceUrl:'https://player.example/custom'}}});assert.equal(result.items.length,1);assert.equal(result.items[0].offline,true);assert.equal(result.items[0].embeds[0].url,'https://player.example/custom');}finally{globalThis.fetch=original;}
});
test('senha não configurada ou fraca mantém o painel bloqueado',async()=>{
 const old=process.env.ADMIN_PASSWORD;delete process.env.ADMIN_PASSWORD;assert.equal(await validPassword('qualquer'),false);process.env.ADMIN_PASSWORD='fraca';assert.equal(await validPassword('fraca'),false);if(old)process.env.ADMIN_PASSWORD=old;else delete process.env.ADMIN_PASSWORD;
});
test('sessão assinada rejeita adulteração, expiração e troca de senha',async()=>{
 const old=process.env.ADMIN_PASSWORD;const now=Date.now;process.env.ADMIN_PASSWORD='test-only-password-long-value';
 try{assert.equal(await validPassword('senha incorreta'),false);assert.equal(await validPassword('test-only-password-long-value'),true);const token=await newSession();assert.equal(await verifySession(token),true);assert.equal(await verifySession(token+'x'),false);assert.equal(await verifySession('invalid.'+token.split('.')[1]),false);Date.now=()=>now()+7*3600000;assert.equal(await verifySession(token),false);Date.now=now;process.env.ADMIN_PASSWORD='rotated-test-only-password-value';assert.equal(await verifySession(token),false);}finally{Date.now=now;if(old)process.env.ADMIN_PASSWORD=old;else delete process.env.ADMIN_PASSWORD;}
});
test('blog inicial tem 10 artigos completos com endereços únicos',()=>{
 assert.equal(articles.length,10);assert.equal(new Set(articles.map(a=>a.slug)).size,10);for(const a of articles){assert.ok(a.published);assert.ok(a.sections.length>=3);assert.ok(a.sections.flatMap(s=>s.paragraphs).join(' ').split(/\s+/).length>=300);}
});
