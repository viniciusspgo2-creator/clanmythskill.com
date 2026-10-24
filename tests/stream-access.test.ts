import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {issueAccessCode,redeemAccessCode,verifyAccessSession,revokeAccessCode,normalizeAccessCode,type AccessStore} from '../lib/stream-access-core';
function store(){
 const sqlite=new DatabaseSync(':memory:');
 sqlite.exec('CREATE TABLE stream_access_codes (id TEXT PRIMARY KEY,code_hash TEXT NOT NULL UNIQUE,label TEXT NOT NULL,suffix TEXT NOT NULL,created_at TEXT NOT NULL,expires_at TEXT,revoked_at TEXT,last_used_at TEXT,use_count INTEGER NOT NULL DEFAULT 0);CREATE TABLE stream_access_sessions (id TEXT PRIMARY KEY,code_id TEXT NOT NULL,token_hash TEXT NOT NULL UNIQUE,created_at TEXT NOT NULL,expires_at TEXT NOT NULL)');
 const db:AccessStore={prepare(query){let values:unknown[]=[];return {bind(...args){values=args;return this},async first<T>(){return sqlite.prepare(query).get(...values as any[]) as T||null},async all<T>(){return {results:sqlite.prepare(query).all(...values as any[]) as T[]}},async run(){return sqlite.prepare(query).run(...values as any[])}}}};
 return {db,sqlite};
}
test('código gerado funciona e o banco armazena somente hashes dos segredos',async()=>{
 const {db,sqlite}=store();try{
 const {code,record}=await issueAccessCode(db,'Player 4FUN',30);assert.match(code,/^MITHYS-(?:[A-HJ-NP-Z2-9]{4}-){3}[A-HJ-NP-Z2-9]{4}$/);assert.equal(record.label,'Player 4FUN');
 const row=sqlite.prepare('SELECT code_hash FROM stream_access_codes').get()!;assert.equal(String(row.code_hash).length,64);assert.notEqual(row.code_hash,normalizeAccessCode(code));
 const session=await redeemAccessCode(db,code.toLowerCase().replaceAll('-',' '));assert.ok(session);assert.equal(await verifyAccessSession(db,session.token),true);
 const saved=sqlite.prepare('SELECT token_hash FROM stream_access_sessions').get()!;assert.notEqual(saved.token_hash,session.token);assert.equal((sqlite.prepare('SELECT use_count FROM stream_access_codes').get()!).use_count,1);
 }finally{sqlite.close();}
});
test('revogar um código invalida sessões já abertas e impede novas entradas',async()=>{
 const {db,sqlite}=store();try{const {code,record}=await issueAccessCode(db,'Player',null);const session=await redeemAccessCode(db,code);assert.ok(session);assert.equal(await verifyAccessSession(db,session.token),true);await revokeAccessCode(db,record.id);assert.equal(await verifyAccessSession(db,session.token),false);assert.equal(await redeemAccessCode(db,code),null);}finally{sqlite.close();}
});
test('código expirado e sessão vencida não liberam conteúdo',async()=>{
 const {db,sqlite}=store();try{const now=Date.now();const expired=await issueAccessCode(db,'Expirado',1,now-2*86400000);assert.equal(await redeemAccessCode(db,expired.code,now),null);const valid=await issueAccessCode(db,'Temporário',30,now);const session=await redeemAccessCode(db,valid.code,now);assert.ok(session);assert.equal(await verifyAccessSession(db,session.token,now+8*86400000),false);assert.equal(await verifyAccessSession(db,'token adulterado',now),false);}finally{sqlite.close();}
});
test('código inválido ou não cadastrado não cria sessão',async()=>{
 const {db,sqlite}=store();try{assert.equal(await redeemAccessCode(db,'MITHYS-AAAA-AAAA-AAAA-AAAA'),null);assert.equal(await redeemAccessCode(db,'incorreto'),null);assert.equal((sqlite.prepare('SELECT COUNT(*) as total FROM stream_access_sessions').get()!).total,0);}finally{sqlite.close();}
});
