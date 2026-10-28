# Redesign MythSkill — execução por fases

## Fase 1 — auditoria e preservação

Base: `7b70f58644de80a419e552bd4868bf31edf47055` na main, checkout limpo na chegada. Backup integral e verificável do Git em `/workspace/backups/clanmythskill-before-redesign.bundle` (histórico completo; não contém dados do banco remoto). Nenhuma escrita no banco de produção ou publicação foi feita.

Stack confirmada: Next.js 16.3.4, React 19.2.6, TypeScript 5.9, Tailwind 4, pnpm 11.25.0, Zod 3, Lucide. Produção Vercel (integração GitHub confirmou último deploy bem-sucedido); domínio informado no GitHub `clanmythskillcom.vercel.app` e domínio próprio informado pelo dono `www.clanmythskill.com`. Caminho separado de prévia Vinext/Cloudflare com D1 e R2. O adaptador Next usa Neon HTTP/PostgreSQL; Drizzle descreve as tabelas D1. Manter compatibilidade e não substituir banco/hosting.

### Superfície existente

Rotas: `/`, `/sobre`, `/ativar-vip`, `/blog`, `/blog/[slug]`, `/guia`, `/streaming`, `/admin`, `/media/[id]`, sitemap, robots e 404. APIs: conteúdo público, visitas, login/logout e edição admin, upload de mídia, catálogo e temporada/episódio do streaming, configuração administrativa do streaming, códigos de acesso e resgate/verificação de sessões. Componentes principais: `site.tsx`, `community.tsx`, `player-guide.tsx`, `streaming.tsx`, `streaming-gate.tsx`, `native-player.tsx`, `episode-picker.tsx`, `admin.tsx`, `access-code-admin.tsx`.

Dados existentes: `content`, `posts`, `visits`, `pageviews`, `media`, `stream_access_codes`, `stream_access_sessions`, `stream_access_attempts`. Conteúdo/configuração e catálogo usam JSON e adaptadores preservados. Banco de produção e credenciais não estão disponíveis neste checkout; não inferir que um backup de código seja backup de dados. Mudanças serão aditivas, com exportação e histórico do CMS novo, sem apagar ou regravar registros legados.

Variáveis atuais (somente nomes): `DATABASE_URL` ou `POSTGRES_URL` ou `POSTGRES_PRISMA_URL`, `ADMIN_PASSWORD` (mínimo 16), `NEXT_PUBLIC_SITE_URL`; na prévia, bindings `DB`, `BUCKET` e `ADMIN_EMAIL`. TMDB fica salvo no servidor; não adicionar token no cliente.

Admin atual: estatísticas reais de visitas, textos hero/história/VIP/PIX/contatos, três servidores fixos, ID/início do YouTube, imagens/QR/OG por upload ou URL, título/descrição SEO, criação/edição/publicação/despublicação de artigos, catálogo/atualização/TMDB/StreamBetter, destaque/oculto/offline e fontes embed/HLS/MP4 por título, códigos por jogador/validade/revogação/histórico. O admin novo precisa manter esses recursos e adicionar todos os módulos pedidos. Auth Next atual: senha de ambiente, HMAC, cookie HttpOnly/SameSite com expiração de 6h, verificação de origem e rate limit em memória. Auth de prévia usa identidade ChatGPT autorizada. Reforçar auth sem quebrar os contratos usados no streaming.

### Decisões e plano

1. Identidade independente: Black Ops One (display), Inter (texto), JetBrains Mono (console); vermelho/preto/grafite com tokens. Não buscar nem copiar CSS/código/textos/estrutura do concorrente.
2. Preservar YouTube `8XxzRvILdOc`, início 93s. Não há um MP4 local: o mesmo vídeo será mantido, com poster e fallback para economia de dados/reduced-motion.
3. CMS novo com documento versionado em registros aditivos; rascunho/publicado, histórico e importação validada. Ler conteúdo legado sem descartá-lo. Dados locais isolados para E2E; não usar produção nos testes.
4. Reutilizar a lógica de streaming e suas APIs; reconstruir a apresentação e manter todos os controles administrativos. Status A2S é opcional, desligado por padrão e sem simular jogadores/ping; ocultar quando indisponível na hospedagem.
5. Fases seguintes: design system/showcase; shell/home; páginas; CMS/admin/segurança; conteúdo novo; validação/a11y/performance/créditos. Ao fim de cada fase: build, commit e resumo de cinco linhas. Commits locais não são publicação.

Validação da base: pnpm fixado instalado com lockfile congelado; tipos e build Next aprovados; 17 testes existentes passaram. `build:next` sem DATABASE_URL apenas validou a aplicação, sem alterar banco. A cobertura E2E real do novo painel usará banco local isolado. O logo novo foi recebido visualmente no chat, mas o arquivo original ainda não está exposto no filesystem; incorporação por upload parametrizado, sem redesenhar a marca.

## Fase 2 — design system

Criados tokens vermelho/preto/grafite, escala de 4px, raios, superfícies, glow e tipografia fluida. Fontes oficiais locais Black Ops One, Inter e JetBrains Mono com swap e cópias OFL. Componentes próprios de botão/card/spotlight, badge, formulário, modal acessível, abas, accordion, tooltip, killfeed, contador e skeleton; símbolos CS geométricos autorais. Showcase `/componentes` com noindex. As páginas antigas só recebem o novo shell a partir da fase 3.

Pesquisa GitHub concluída: Motion, AutoAnimate e Vanilla Tilt são MIT; escolhido implementar os efeitos pequenos com APIs nativas, sem copiar código ou adicionar bibliotecas de animação. Créditos em THIRD_PARTY.md. bcrypt.js e Playwright preparados para as fases de segurança/E2E. Tipos e build Next da fase passaram; os 55 erros/29 avisos de lint são da base auditada e permanecem no plano de correção, sem desligar regras para esconder o problema. A marca continuará parametrizada até o arquivo original do logo ficar acessível.

## Fase 3 — shell e home

Nova navegação flutuante/retrátil, menu acessível mobile, atalhos inferiores, restauração de foco, View Transitions quando disponível, flash reduzido, mira de ponteiro, efeitos decorativos opt-in e som baixo desligado/persistente. Home reconstruída nas 12 seções do briefing: hero com mesmo YouTube e poster, métricas, scoreboard expansível, console que digita/copia connect, buy menu VIP, teaser seguro de capas, bento, história com scroll progressivo, mapas/glossário, trilho Journal, FAQ buscável e CTA final. Sem fonte cadastrada, o teaser mostra um estado vazio, não títulos inventados. Endpoint de teaser expõe apenas capa/título, sem links de reprodução.

Conteúdo estruturado em documento de design para ser administrado na fase 5, preservando Settings/artigos existentes. Números desconhecidos (anos de clan/players) ficam sem valor, com traço; os dados reais conhecidos são três servidores e sete mapas do guia. Status ao vivo é opt-in e fica oculto quando não há informação. Novo layout usa classes ms- e componentes autorais, sem importar material do concorrente. Páginas internas antigas estão isoladas temporariamente para migração na fase 4.

Tipos/build Next aprovados. Chromium: 12 seções presentes, connect copiado corretamente, links Steam preservados, menu mobile fecha por Escape, 360px sem overflow e sem erros JS. Testada também a opção de economia de dados (poster em vez de carregamento do YouTube). Evidências locais em `/workspace/mythskill-qa`. Não foi alegada certificação do player externo ou de métricas de servidores não consultados.

## Fase 4 — páginas e streaming

Sobre editorial com história preservada, valores e equipe gerenciável; VIP com resumo/QR/chave, etapas, validação local, comprovante privado, revisão e mensagem WhatsApp; Journal com filtros/busca/carregar mais e grid assimétrico; artigo com índice, fontes, compartilhamento e relacionados; guia com cinco abas, consulta do valor anterior e cópia/restauração; código do Mithys com novo modal acessível mantendo os endpoints originais. Criadas 404 temática e página de manutenção. Regras de jogadores/admins preservadas em modal e integradas ao conteúdo gerenciável. Estética antiga do streaming foi remapeada para tokens, sem laranja/azul-marinho ou fontes antigas; lógica de catálogo/fontes/códigos permanece.

Chromium conferiu todas as rotas, navegação de abas, erro de código, menu, Escape e 360px sem overflow; sem erros JS. Rótulos dos formulários foram separados das dicas com for/id e aria-describedby. O fluxo de VIP está preparado para o endpoint privado e dashboard da fase 5; não se alegou registro de pedido antes dessa implementação. Tipos e build aprovados. Classes/estética das páginas antigas foram retiradas da navegação, preservando os arquivos e commits de auditoria no histórico.

Fase 5 — painel e persistência (28/10/2026)
- Console com 16 destinos, busca Ctrl+K, sidebar responsiva, conteúdo estruturado com duplicação/reordenação, rascunhos com revisão concorrente, publicação e histórico/restauração. Prévia autenticada aceita mensagens apenas da janela pai e mesma origem; conteúdo validado novamente.
- Mídia com WebP no navegador, recorte, alt obrigatório, pastas, foco aplicado no site e substituição mantendo URL. Journal em blocos/Markdown, agendamento, tags e SEO. Guia, mapas, FAQ, textos da interface, tema, manutenção e configuração editáveis. Páginas adicionais têm renderizador próprio.
- VIP com registro real, comprovante privado, conferência manual, notas/status e CSV. Bcrypt 12, sessões revogáveis de 6 horas, admin/editor/moderador VIP, senha, TOTP opcional e auditoria. Backup JSON exclui segredos/arquivos e recupera configurações em rascunho e operações ausentes sem reativar códigos revogados existentes.
- Mithys preserva fontes, provedores e fluxo de reprodução; adiciona metadados editoriais do catálogo, lote de até 50 códigos e edição de validade/nome. Operações de acesso/catálogo continuam imediatas, identificadas no painel. Nenhum dado remoto foi alterado. SQLite local é opt-in e proibido no Vercel; Neon e D1/R2 preservados.
- Atualização pedida pelo usuário: QGS HTTPS testada em todos os três IPs. 4FUN e MIX online; reserva respondeu offline na consulta direta. Card de destaque e placar compartilham consulta/cache 45s, pausam em aba oculta, distinguem offline/falha/dados antigos. Ping ausente na API fica oculto. Toggle/provedor/textos no admin; A2S UDP continua opcional.
Validação: tipos limpos; 5 arquivos de testes unitários passaram; Chromium sem erros JS no admin e nas páginas; login, CSRF, conflito de revisão, rascunho/publicação/texto público, upload real/arquivo falso, comprovante privado, VIP, lote/código válido/expirado/revogado e logout revogável conferidos no banco local. Build Next/Webpack limpo e guard de CSS emitido; Turbopack deste ambiente falhou ao abrir sua porta interna (EPERM), então foi usado o compilador Webpack suportado. SEO/performance e suíte final pertencem à fase 7. Nada foi enviado ou publicado.

Fase 6 — conteúdo e seed
Dez artigos originais novos (336–354 palavras cada, três seções, resumo, categoria, tags, capa, SEO e referências) ampliam o Journal de 10 para 20, mantendo integralmente os slugs e textos legados. Temas: calls, economia, flash em dupla, Dust2, Inferno, rate/FPS, sensibilidade, demos, relato de infrações e cultura 1999–2003. O conteúdo diferencia mecânicas do 1.6 das versões posteriores e não promete ajustes milagrosos.
Seed aditivo `scripts/seed-content.ts`: INSERT ON CONFLICT DO NOTHING para posts/configuração inicial; complemento de mapas/glossário/FAQ preserva os itens editados e usa marcador para rodar uma única vez; rascunho existente recebe apenas entradas ausentes. Testado duas vezes no banco local: 20 posts, 9 mapas, 12 verbetes e 13 FAQs; sem duplicatas. Nenhuma operação no banco de produção.
Tipos, testes e build de produção Next/Webpack passaram. O preenchimento inicial é explícito e revisável no painel; não sobrescreve artigo ou configuração existente. Revisão de lint, SEO, acessibilidade e performance na fase 7.
