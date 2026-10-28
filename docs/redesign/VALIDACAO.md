# Validação da revisão MythSkill

Data: 28/10/2026. Código e testes executados no ambiente local; nenhum push, deploy ou alteração do banco de produção foi realizado.

## Build, tipos e dados

- `pnpm lint`: sem erros ou avisos nos arquivos de aplicação, testes e configuração. Artefatos gerados do Playwright são ignorados pelo lint.
- `pnpm typecheck`: aprovado, incluindo testes/configuração Playwright e scripts TypeScript.
- `pnpm test`: seis arquivos / 30 casos declarados, todos aprovados. Cobrem sessão, senhas, fontes de reprodução, códigos, validade/revogação, RBAC editorial, CSRF, uploads falsos, CSV, TOTP/replay, protocolo A2S, QGS e validação do TOP15 por XP.
- `pnpm build:next:webpack`: produção Next aprovada; 15 seletores essenciais conferidos no CSS emitido. Webpack é o fallback suportado usado porque o Turbopack deste ambiente apresentou EPERM ao abrir sua porta interna. `pnpm build:next` permanece como comando original da Vercel.
- `pnpm build`: Vinext/Cloudflare também aprovado. A classificação `Unknown` de algumas rotas é uma limitação informativa do analisador estático do Vinext, sem falha de compilação.
- Seed executado duas vezes no SQLite de desenvolvimento: 20 artigos, 9 mapas, 12 verbetes e 13 FAQs; registros existentes preservados. Migração adicional gera somente índice de tentativas; sem DROP/TRUNCATE ou exclusão de conteúdo.

## Navegadores e fluxos

15 testes E2E aprovados em Chromium, Firefox 146 e WebKit 26, executados contra `next start` com SQLite exclusivo e credenciais aleatórias. Não usam o banco real do proprietário.

Cobertura: rotas públicas, 404, guia/abas, modal/ESC, comandos copiados, links Steam, SEO/canonical/JSON-LD, responsividade de 360 a 3840 px, solicitação VIP em etapas, comprovante privado, login/logout, edição de texto pelos campos do painel, rascunho e publicação refletida no site, upload real, criação/publicação/arquivamento de artigo, códigos válidos/inválidos/expirados/revogados e TOP15 real em ordem de XP. A criação do artigo e parte das operações usam a API autenticada do próprio painel; a edição inicial de texto usa a interface.

Sem JavaScript, Home, título principal, links Steam e artigos continuam presentes no HTML. Um fallback de loading de rota que dependia do script de streaming HTML foi removido após o teste identificá-lo. Os loaders de recursos continuam no cliente. Com reduced-motion, vídeo/efeitos priorizam poster e leitura estável. As sessões de teste não registraram exceções JavaScript após a correção dos problemas encontrados.

WebKit foi executado com bibliotecas Debian verificadas por SHA-256 extraídas no workspace; nenhum pacote foi instalado no sistema. Isso valida o motor de teste em Linux. O aplicativo Safari em macOS/iOS não está disponível aqui e não foi certificado. A conferência em um aparelho Apple continua pendente.

## Acessibilidade e desempenho

Axe com regras WCAG 2 A/AA e 2.1 A/AA: nenhuma violação nas páginas `/`, `/sobre`, `/ativar-vip`, `/blog`, `/guia`, `/ranking`, `/streaming` (acesso) e `/admin` (login), em viewport mobile. Inclui correções de contraste dos índices/console, nome acessível da marca e admin, semântica do console, tabela rolável por teclado e foco de modais. Isso não substitui uma avaliação humana com leitor de tela.

Lighthouse mobile: desempenho 99, acessibilidade 100, boas práticas 100, SEO 100; LCP 1,4 s, CLS 0,002 e TBT 100 ms. Resultados são registrados em `lighthouse-mobile.json`, junto com versão/configuração e métricas. Medição de laboratório em produção local, sem usuários reais: não constitui medida de INP de campo nem garantia de pontuação idêntica na hospedagem. O vídeo original continua disponível por ação no mobile; autoplay é reservado a telas amplas e respeita economia de dados/reduced-motion.

## Fontes externas verificadas

QGS: consultas reais aos três IPs cadastrados, incluindo resposta online com mapa e ocupação, resposta offline e tratamento distinto para falha da consulta. Card e placar compartilham cache de 45 segundos e não inventam ping.

Ranking: a fonte respondeu com 15 registros em `order=XP&dir=DESC`. A integração completa no backend, API e página foi conferida com dados reais, incluindo XP do primeiro jogador e ordem descendente. O modo padrão da fonte ordena por abates; a integração usa explicitamente XP, conforme a última orientação. Cache de cinco minutos e instantâneo persistido; falhas mostram indisponibilidade ou leitura anterior identificada. Há validação para mudanças de estrutura/ordem. Não existe garantia de disponibilidade permanente de uma fonte externa. Não foi implementada integração de banidos, conforme cancelamento do pedido.

URLs antigas e links externos fornecidos foram preservados. Os testes internos passaram; serviços externos podem limitar robôs ou exigir seus aplicativos/autenticação. Não foi certificado o funcionamento de todos os vídeos, embeds ou páginas de terceiros. A reprodução permanece sujeita ao provedor e às fontes configuradas pelo proprietário.

## Checagem de identidade e proveniência

- Paleta de interface preta/grafite/vermelha; não foi introduzido laranja ou azul-marinho. Tokens de compatibilidade legados apontam para o novo vermelho. Cores de capas/imagens de terceiros não são tokens da interface.
- Black Ops One para display, Inter para texto e JetBrains Mono para HUD. Sem Barlow/Bebas/Orbitron/Rajdhani/Exo na identidade nova.
- Home reorganizada em 12 seções, placar expansível, console, buy menu e bento. Componentes novos e classes `ms-*` autorais. Classes do player legado permanecem para compatibilidade funcional.
- Textos novos produzidos para a MythSkill; não foram reaproveitados slogans, depoimentos ou frases do concorrente. Nenhum arquivo, imagem, CSS ou código do concorrente foi utilizado. Dados do ranking são lidos como informação pública; sua apresentação foi criada neste projeto.
- Licenças/autoria em `CREDITS.md` e `THIRD_PARTY.md`; Cheerio verificado como MIT no GitHub. Ferramentas de auditoria externas ao produto são identificadas separadamente.

## Pendências materiais

O logo anexado no chat não ficou acessível como arquivo no filesystem desta sessão. O projeto mantém o placeholder textual e permite enviar o arquivo exato no admin, junto com favicon e OG. O PNG/SVG original precisa ser aplicado sem recriação. Nenhum logo parecido foi gerado como substituto.

A conferência de Safari em aparelho Apple, tokens/fontes privadas do Mithys, condições reais do VIP e operação do banco/hospedagem de produção exigem os ambientes ou informações correspondentes. Dados de produção não foram acessados para alegar sua certificação.
