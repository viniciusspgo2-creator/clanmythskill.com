#!/usr/bin/env node
/**
 * Vercel/Next.js CSS guard. Fails builds when the important visual components
 * are not found in the production CSS actually emitted by Next.js.
 * No network access and no external dependencies are required.
 */
import {readFile, readdir} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const layout = await readFile(join(root, 'app/layout.tsx'), 'utf8');
const sourceFiles = ['app/globals.css','app/styles/community-streaming.css','app/styles/mythskill.css','app/styles/mythskill-admin.css'];
const required = [
 ['Layout e tokens','.ms-root'],['Navegação própria','.ms-nav'],['Hero','.ms-hero'],['Placar','.ms-scoreboard'],['Console','.ms-console'],['Buy menu','.ms-buy-menu'],['Radar QGS','.ms-live-card'],['Modal acessível','.ms-modal'],['Tema do painel','.ms-admin'],['Editor de seções','.ms-editor-item'],['Streaming: catálogo','.organized-streaming'],['Streaming: cards','.stream-grid'],['Streaming: player','.stream-modal'],['Streaming: episódios','.episode-picker'],['Códigos','.access-code-list']
];

async function allCssIn(directory) {
  let entries;
  try {entries = await readdir(directory, {withFileTypes: true});}
  catch (error) {if (error.code === 'ENOENT') return []; throw error;}
  const result = [];
  for (const item of entries) {
    const filepath = join(directory, item.name);
    if (item.isDirectory()) result.push(...await allCssIn(filepath));
    else if (item.isFile() && item.name.endsWith('.css')) result.push(filepath);
  }
  return result;
}

function check(text, stage) {
  const missing = required.filter(([, selector]) => !text.includes(selector));
  if (missing.length) {
    console.error(`ERRO: ${stage} sem estilos essenciais:`);
    for (const [description, selector] of missing) console.error(`  - ${description}: ${selector}`);
    process.exitCode = 1;
  } else console.log(`OK: ${stage} contém todos os ${required.length} seletores essenciais da Home, Streaming e Admin.`);
}

const mode = process.argv[2];
if (!['--source', '--build'].includes(mode)) {
  console.error('Uso: node scripts/verify-styles.mjs --source | --build');
  process.exit(2);
}
if (mode === '--source') {
  for (const path of sourceFiles) {
    const relativeImport = path.replace(/^app\//, './');
    if (!layout.includes(`import '${relativeImport}';`)) {
      console.error(`ERRO: app/layout.tsx não importa ${path}.`);
      process.exitCode = 1;
    }
  }
  const combined = (await Promise.all(sourceFiles.map(f => readFile(join(root, f), 'utf8')))).join('\n');
  check(combined, 'CSS fonte');
} else {
  // Next 16 may emit CSS in static/chunks rather than static/css.
  const files = await allCssIn(join(root, '.next/static'));
  if (!files.length) {
    console.error('ERRO: nenhum CSS compilado foi encontrado em .next/static.');
    process.exitCode = 1;
  } else {
    const combined = (await Promise.all(files.map(f => readFile(f, 'utf8')))).join('\n');
    check(combined, `CSS de produção (${files.length} arquivo(s))`);
  }
}
