#!/usr/bin/env node
/**
 * Optional post-deploy smoke test. Fetches the real HTML and linked Next CSS,
 * then checks that a live visitor receives the critical styling rules.
 * Usage: node scripts/verify-live-styles.mjs https://seu-dominio.com
 */
const origin = process.argv[2];
if (!origin || !/^https?:\/\//i.test(origin)) {
  console.error('Uso: node scripts/verify-live-styles.mjs https://seu-dominio.com');
  process.exit(2);
}
const pages = [
  {route:'/', selectors:['.onboarding-grid','.player-benefit-banner']},
  {route:'/streaming', selectors:['.stream-gate-backdrop','.stream-gate-dialog','.stream-access-landing']},
];
let failed = false;
async function load(url) {
  const response = await fetch(url, {
    headers: {'Cache-Control':'no-cache', 'Pragma':'no-cache'},
    signal: AbortSignal.timeout(15000),
    redirect:'follow',
  });
  if (!response.ok) throw Error(`${response.status} ${response.statusText} em ${url}`);
  return response.text();
}
for (const {route,selectors} of pages) {
  try {
    const address = new URL(route, origin);
    address.searchParams.set('_css_check', String(Date.now()));
    const html = await load(address.href);
    const cssHrefs = new Set(
      [...html.matchAll(/<link\b[^>]*\bhref=["']([^"']+\.css(?:\?[^"']*)?)["'][^>]*>/gi)]
      .map(match => match[1].replace(/&amp;/g, '&'))
    );
    if (!cssHrefs.size) throw Error('a página não referenciou arquivos CSS em <link>');
    const cssFiles = await Promise.all([...cssHrefs].map(href => load(new URL(href, address).href)));
    const css = cssFiles.join('\n');
    const missing = selectors.filter(selector => !css.includes(selector));
    if (missing.length) throw Error(`o CSS publicado não contém ${missing.join(', ')}`);
    console.log(`OK ${address.pathname}: ${cssFiles.length} CSS recebidos, ${selectors.length} estilos verificados`);
  } catch (error) {
    failed = true;
    console.error(`FALHA ${route}: ${error.message}`);
  }
}
if (failed) process.exitCode = 1;
