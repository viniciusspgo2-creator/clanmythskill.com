import test from 'node:test';
import assert from 'node:assert/strict';
import {streambetterUrl,parseProviderIds,normalizeProviderTitles,providerSources,mergeProviderTitles} from '../lib/streambetter-core';
import {normalizeSeasons,normalizeEpisodes} from '../lib/series-core';
import type {StreamItem} from '../lib/stream-types';
const movie:StreamItem={id:'movie:350',tmdbId:350,kind:'movie',title:'Título de teste',description:'',image:'',category:'Filmes',embeds:[]};
const ids={movie:new Set([350]),tv:new Set([1416])};
test('URLs do provedor usam IDs numéricos e episódio específico, incluindo especiais',()=>{
 assert.equal(streambetterUrl('movie',350),'https://streambetter.lol/filme/350');assert.equal(streambetterUrl('tv',1416,15,4),'https://streambetter.lol/serie/1416/15/4');assert.ok(streambetterUrl('tv',1416,0,1).endsWith('/0/1'));
 for(const args of [[NaN,1,1],[1,-1,1],[1,1,0],[1,1,1.5],[1,1001,1]])assert.throws(()=>streambetterUrl('tv',...args as [number,number,number]));
});
test('catálogo de disponibilidade rejeita listas parciais, duplicatas e IDs inválidos',()=>{
 assert.deepEqual(parseProviderIds({success:true,counts:{movie:2,tv:0},ids:{movie:[350,'123'],tv:[]}}),{movie:[350,123],tv:[]});
 for(const data of [{success:false},{success:true,counts:{movie:2,tv:0},ids:{movie:[350],tv:[]}},{success:true,counts:{movie:2,tv:0},ids:{movie:[350,350],tv:[]}},{success:true,counts:{movie:1,tv:0},ids:{movie:['https://evil.example'],tv:[]}}])assert.throws(()=>parseProviderIds(data));
});
test('player automático respeita catálogo, desativação e fonte específica do Admin',()=>{
 assert.equal(providerSources(movie,true,ids)[0].url,'https://streambetter.lol/filme/350');assert.equal(providerSources(movie,false,ids).length,0);assert.equal(providerSources({...movie,tmdbId:999},true,ids).length,0);assert.equal(providerSources(movie,true,ids,{disableAutomatic:true}).length,0);
 assert.equal(providerSources(movie,true,ids,{sourceUrl:'https://my-provider.example/test.mp4'})[0].kind,'mp4');
 const series=providerSources({...movie,id:'tv:1416',kind:'tv',tmdbId:1416},true,ids)[0];assert.equal(series.episodePlayer,'streambetter');assert.ok(series.url.endsWith('/1416/1/1'));
 assert.equal(providerSources({...movie,embeds:[series]},false,ids).length,0);
});
test('novidades normalizadas não duplicam títulos nem sobrescrevem a informação do TMDB',()=>{
 const recent=normalizeProviderTitles({success:true,titles:[{tmdb_id:350,type:'movie',title:'Recente',poster_path:'/poster.jpg',overview:'Descrição',release_year:2020},{tmdb_id:2,type:'tv',title:'Outra categoria'}]},'movie');assert.equal(recent.length,1);assert.equal(recent[0].image,'https://image.tmdb.org/t/p/w500/poster.jpg');const merged=mergeProviderTitles([movie],recent);assert.equal(merged.length,1);assert.equal(merged[0].title,movie.title);
});
test('listas de episódios preservam numeração, especiais e retiram lançamentos futuros',()=>{
 const seasons=normalizeSeasons([{season_number:0,name:'Especiais',episode_count:2},{season_number:2,name:'Temporada 2',episode_count:10},{season_number:1,name:'Vazia',episode_count:0}]);assert.deepEqual(seasons.map(s=>s.number),[0,2]);
 const episodes=normalizeEpisodes([{episode_number:3,name:'Futuro',air_date:'2027-01-01'},{episode_number:1,name:'Estreia',air_date:'2020-01-01'},{episode_number:2,name:'Sem data',air_date:null},{episode_number:-1}], '2026-10-24');assert.deepEqual(episodes.map(e=>e.number),[1,2]);
});
