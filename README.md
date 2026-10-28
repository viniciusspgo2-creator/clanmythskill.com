# Clan MythSkill

Site em português para uma comunidade de Counter-Strike 1.6. Identidade própria em preto, grafite e vermelho; Black Ops One, Inter e JetBrains Mono locais. Next 16 / React 19 / TypeScript / pnpm, com produção Next/Vercel + Neon e adaptadores preservados para a prévia Vinext/Cloudflare D1/R2.

## O que está incluído

- Home em 12 seções, vídeo original, fallback por poster, placar expansível, console simulado, menu VIP, teaser Mithys, bento, timeline, mapas/glossário, Journal, FAQ e CTA.
- Radar do servidor: API QGS HTTPS com mapa, ocupação e consulta a cada 45 segundos. Offline confirmado é diferente de API indisponível; dados antigos são identificados. A API não fornece ping, portanto ele é ocultado.
- `/ranking`: TOP15 do 4FUN por **XP/pontuação**, lido da tabela pública do iceeedR. Cache de cinco minutos, instantâneo persistido, horário da última consulta e falha identificada. Não é atualização por WebSocket. O parser valida 15 posições e XP em ordem decrescente antes de exibir. Não há dados fictícios de fallback. Nenhum HTML, CSS ou script da fonte é incorporado à página.
- Sobre, VIP em etapas com comprovante privado, Journal com os 10 artigos antigos + 10 novos, guia por abas, streaming por código, 404 e manutenção.
- Console administrativo: conteúdo estruturado, seções com ordem/duplicação/toggle, páginas adicionais, navegação, biblioteca WebP com recorte/foco/alt, hero, servidores, ranking, VIP, solicitações, Mithys, artigos, guia, FAQ, tema, SEO, usuários e sistema.
- Rascunho com revisão concorrente, prévia autenticada ao vivo, publicação, histórico e restauração. Operações de segurança, solicitações, mídia, códigos e catálogo são aplicadas imediatamente e identificadas como tal no painel.

## Executar localmente

Recomendado Node.js 24; mínimo 22.13. O projeto fixa pnpm no campo `packageManager`.

```sh
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
```

Preencha as variáveis. Para desenvolvimento sem Neon, remova `DATABASE_URL` e habilite `MYTHSKILL_LOCAL_DB=.sites-runtime/development.sqlite`. Use senhas/chaves novas para a sua instalação.

```sh
pnpm content:seed
pnpm dev:next
```

SQLite existe somente para desenvolvimento/testes, com arquivo privado e fora do Git. O adaptador recusa sua execução quando `VERCEL` está definido. Nenhum armazenamento local temporário é usado como banco na produção.

## Publicar/atualizar na Vercel

O trabalho desta revisão foi feito em commits locais; não houve push ou deploy automático.

1. Faça backup real do banco Neon e dos arquivos antes de atualizar. O bundle Git de auditoria é backup de código, não de dados.
2. Preserve `DATABASE_URL`, artigos, catálogo, fontes, códigos e configurações existentes. Não troque o banco. Variantes `POSTGRES_URL` e `POSTGRES_PRISMA_URL` continuam reconhecidas.
3. Configure `ADMIN_PASSWORD` forte para o primeiro acesso e `ADMIN_SESSION_SECRET` aleatório, além de `ADMIN_EMAIL` opcional. Veja `.env.example`; nunca publique segredos com prefixo `NEXT_PUBLIC_`.
4. Configure `NEXT_PUBLIC_SITE_URL` com a URL definitiva. Ela é incorporada durante o build; alterar somente o ambiente do processo de execução não altera uma compilação pronta.
5. Use o preset **Next.js**, instalação `pnpm install --frozen-lockfile` e build `pnpm build:next` do `vercel.json`. O setup SQL cria apenas tabelas/índices ausentes, sem apagar dados. Há também `pnpm build:next:webpack`, compilador suportado e usado na validação deste ambiente após um erro de porta interna do Turbopack.
6. Execute `pnpm content:seed` em um ambiente com acesso ao mesmo banco quando quiser persistir os conteúdos iniciais. O seed adiciona entradas ausentes, mantém artigos/configurações existentes e usa marcador para não repetir os complementos de mapas/FAQ. Revise tudo em `/admin`.
7. Confira login, QR/Pix, contatos, três IPs, radar, ranking e fontes do Mithys antes da divulgação.

Neon armazena os dados e arquivos enviados pelo adaptador atual. Volumes grandes de mídia podem justificar R2/S3, preservando o contrato `BUCKET`. A prévia original mantém D1/R2 e identidade autorizada da plataforma, sem senha universal. O build `pnpm build` continua destinado a essa prévia.

## Primeiro acesso e permissões

A primeira autenticação válida cria a conta administrativa persistida com bcrypt de custo 12. Depois disso, a senha no banco prevalece; alterar `ADMIN_PASSWORD` no ambiente não redefine uma conta existente. O e-mail inicial padrão é `admin@mythskill.local`, e o primeiro acesso também permite deixar o campo de e-mail vazio para a conta principal.

Papéis: administrador completo; editor de conteúdo/Journal/mídia; moderador de solicitações VIP. Sessões assinadas duram seis horas, usam cookie HttpOnly/SameSite e Secure em HTTPS, são persistidas por hash e podem ser revogadas. Mudanças de senha/permissão invalidam sessões anteriores. O 2FA TOTP opcional oferece chave para cadastramento manual no autenticador e rejeita reutilização do mesmo código. Guarde uma sessão de outro administrador enquanto configura a recuperação operacional das contas.

Login e formulários têm limitação persistida de tentativas. Escritas exigem origem válida, autorização e validação no servidor. Uploads verificam tipo, extensão, assinatura e tamanho; HTML não confiável é removido do conteúdo editorial. Só administradores podem configurar scripts externos de analytics. Painel e prévia têm noindex.

## Conteúdo, mídia e backup

Salvar rascunho não altera o site público. Publicar conserva a versão anterior. Restaurar uma versão ou importar configuração carrega um rascunho para revisão. A revisão concorrente impede sobrescrever silenciosamente outra edição.

O editor do Journal trabalha em blocos ou Markdown convertido para blocos (`##` para títulos e linhas vazias para parágrafos). Artigos podem ser rascunhos, agendados ou arquivados; o servidor filtra datas futuras e arquivados. Os endereços antigos permanecem.

Imagens são convertidas para WebP no navegador, com limite de 2400 px, recorte central opcional e foco ajustável. O upload final aceita até 3 MB, exige alt e mantém o endereço quando substituído. O foco é aplicado às imagens públicas. Comprovantes VIP ficam separados da biblioteca pública.

O JSON de backup inclui conteúdo, referências de mídia, solicitações e hashes dos códigos. Exclui senhas, segredos, tokens de provedores e sessões. Ao importar um backup completo, a configuração entra em rascunho; registros operacionais ausentes são recuperados sem apagar existentes nem reativar códigos já revogados. **Arquivos binários exigem backup separado do armazenamento**; o JSON contém referências. Reconfigure tokens de provedores separadamente após recuperação. O cache do ranking pode ser consultado novamente na fonte.

O logo original enviado como imagem no chat não ficou disponível como arquivo no filesystem desta sessão. Foi preservado o placeholder textual `MYTHSKILL`, com campos de logo, alt, favicon e OG no painel. O favicon e a OG provisórios são próprios do novo tema, sem reproduzir a marca anexada. Envie o arquivo exato pela biblioteca e selecione-o em **Hero e identidade**.

## VIP

Preço inicial R$ 5,00 / 30 dias, Pix e WhatsApp **+55 12 99670-6509** preservados. O site registra dados e comprovante privado, prepara a mensagem e oferece compartilhamento nativo quando disponível. Um link WhatsApp não anexa arquivos automaticamente; use o clipe da conversa se necessário. Pagamento, benefícios e ativação são conferidos manualmente. Não há confirmação bancária ou ativação automática.

## Status e ranking

QGS: `https://api.qgshosting.com/status/index.php/source/IP:PORTA`. Consulta no backend a endereços cadastrados, valida resposta, agrupa pedidos simultâneos e usa cache. O admin pode desligar o radar ou escolher A2S direto. A2S requer `ENABLE_A2S=1` e UDP permitido pela hospedagem; falhas não geram números fictícios.

Ranking: `http://patente.iceeedr.com.br/index.php?ip=131.196.198.52%3A27248&order=XP&dir=DESC&page=1`. A fonte atualmente serve HTML por HTTP e redireciona sua versão HTTPS para HTTP. A leitura acontece no servidor; o navegador recebe dados estruturados do próprio site. O adaptador respeita proxy HTTP configurado no ambiente e não encaminha cookies ou credenciais dos usuários à fonte. Cheerio (MIT) interpreta somente campos de dados. Fonte fora do ar ou estrutura modificada gera estado indisponível/última leitura, com link ao original. A integração depende da disponibilidade e manutenção do painel externo.

Não foi criada integração de banidos, conforme a última orientação do proprietário. O link externo antigo de banimentos foi preservado junto aos demais links existentes.

## Mithys e vídeo

Todos os provedores, seleção de fontes, códigos, validade e revogação existentes foram mantidos. TMDB fornece metadados; StreamBetter associa fontes por IDs; HLS/MP4 e embeds usam os players anteriores. Sem fonte válida, não há botão de assistir. Filmes/séries externos podem conter anúncios, bloqueios e indisponibilidade; não há certificação de reprodução de todo o catálogo nem DRM.

Vídeo original: YouTube `8XxzRvILdOc`, início em 93 segundos. Autoplay mudo em telas amplas, poster e botão para reproduzir em telas menores; economia de dados e reduced-motion priorizam o poster. A pausa está disponível após o início. Conteúdo, anúncios e disponibilidade dependem do YouTube.

## Validação e comandos

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build:next:webpack
pnpm exec playwright install --with-deps
pnpm test:e2e
```

O runner E2E cria um SQLite isolado e senhas aleatórias de teste, recusa execução quando variáveis de banco de produção estão no shell e testa Chromium, Firefox e WebKit. A compilação precisa estar pronta. WebKit em Linux não equivale ao Safari instalado num Mac/iPhone; a conferência em aparelho Apple continua recomendada.

Medições, cobertura, decisões e limites: [docs/redesign/VALIDACAO.md](docs/redesign/VALIDACAO.md). Fases/commits: [docs/redesign/FASES.md](docs/redesign/FASES.md). Dependências, versões, autoria e licenças: [CREDITS.md](CREDITS.md) e [THIRD_PARTY.md](THIRD_PARTY.md).
