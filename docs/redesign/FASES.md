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
