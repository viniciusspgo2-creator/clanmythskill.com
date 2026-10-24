# Clan MythSkill — Next.js

Site completo em português para o clan de Counter-Strike 1.6. Interface própria em carvão e laranja, responsiva, com imagens exclusivas, Home, Sobre, Ativar VIP, Journal com 10 artigos e Streaming Mithys.

## Abrir o site

A prévia hospedada usa o código App Router com o runtime compatível Vinext/Cloudflare. Ela permanece privada para o proprietário. O diretório também funciona como um projeto Next.js padrão para a Vercel, usando Neon/Postgres.

- Home: `/`
- Sobre: `/sobre`
- VIP: `/ativar-vip`
- Blog: `/blog`
- Guia do Player: `/guia`
- Streaming: `/streaming`
- Administração: `/admin`

## Publicar na Vercel — passo a passo

1. Extraia o ZIP. A pasta que contém `package.json` é a raiz do projeto.
2. Coloque essa pasta em um repositório GitHub e importe-o em **Vercel → Add New → Project**.
3. Em **Framework Preset**, selecione **Next.js**.
4. Em **Build & Output Settings**, ative a edição de **Build Command** e use `pnpm build:next`. Não defina uma pasta de saída manual.
5. Em **Storage / Marketplace**, conecte um banco **Neon Postgres** ao projeto. O banco desta publicação é separado do banco da prévia.
6. Em **Settings → Environment Variables**, cadastre `DATABASE_URL` com a string de conexão PostgreSQL do Neon. O projeto também reconhece `POSTGRES_URL` e `POSTGRES_PRISMA_URL` caso a integração já os forneça.
7. Cadastre `ADMIN_PASSWORD` com uma senha exclusiva de pelo menos **16 caracteres**. Nunca use o prefixo `NEXT_PUBLIC_` nessa senha ou no banco.
8. Cadastre `NEXT_PUBLIC_SITE_URL` com o endereço final, como `https://seu-projeto.vercel.app`, sem `/` no fim.
9. Use **Node.js 22.x** ou superior. Clique em **Deploy**. Durante a compilação, o comando prepara as tabelas no Neon sem apagar dados existentes.
10. Abra `https://seu-endereco/admin` e entre com a senha escolhida. Na prévia privada, o painel usa sua conta ChatGPT autorizada, sem senha padrão.
11. Em **Streaming Mithys → Capas e informações — TMDB**, salve seu **API Read Access Token**. O token não é incluído no código enviado ao navegador.

A ausência do banco interrompe o build da Vercel com uma mensagem clara. Não é necessário executar comandos SQL à mão. Se mudar as variáveis após um deploy, use **Deployments → Redeploy**.

## Rodar no computador

Requisitos: Node.js >=22.13 e pnpm. Instale com `pnpm install`, copie `.env.example` para `.env.local` e preencha as variáveis. Execute `node --env-file=.env.local scripts/setup-neon.mjs` uma vez e depois `pnpm dev:next`. Para produção local: `pnpm build:next` e `pnpm start:next` (garanta que as variáveis estejam carregadas no ambiente).

## O que o painel gerencia

- Visualizações e soma de visitantes únicos por dia, sem números de demonstração. Navegadores são identificados por cookie aleatório; não são coletados IPs para as estatísticas.
- Textos da hero, história do clan, preço/período VIP, chave PIX, contatos e servidores.
- Banners e QR Code por upload (JPG/PNG/WebP até 4 MB) ou URL HTTPS.
- Título e descrição SEO, metadados de compartilhamento, robots e sitemap.
- Criação, edição, publicação e despublicação de artigos. Despublique um artigo para retirá-lo do site sem perder o texto.
- Catálogo de streaming: sincronização, estado da API, filtros administrativos, destaque, ocultação, sinalização manual de offline e substituição de player por item.
- Token TMDB validado no servidor, capas, sinopses e gêneros de filmes/séries.
- Códigos do streaming: gerar por nome/nick, validade de 7/30/90 dias ou sem expiração, histórico de entradas e revogação.
- Capa de compartilhamento para WhatsApp e redes em **Banners e imagens**. O arquivo padrão tem 1200 × 630 px.

Na Vercel, os banners enviados são armazenados no Postgres, pois o disco da função não é permanente. Na prévia, imagens usam R2 e registros usam D1. Para volumes grandes de imagens, um armazenamento dedicado poderá substituir esse adaptador.

## VIP: comportamento exato

O preço inicial é R$ 5,00 para 30 dias, seguindo o exemplo fornecido. O período pode ser alterado no painel. Não foram inventadas vantagens como armas, vida, slots ou imunidade: confirme as vantagens reais com a administração.

O jogador seleciona um comprovante local, revisa os dados e abre o WhatsApp **+55 12 99670-6509** com a mensagem pronta. **Links do WhatsApp não anexam arquivos.** A página instrui o jogador a usar o clipe do WhatsApp, ou o compartilhamento nativo de arquivo quando o dispositivo oferece essa função. O site não recebe o comprovante, não confirma o PIX e não ativa acesso no servidor automaticamente. A confirmação final é feita pela administração.

O QR Code incluído é exatamente o anexo original, sem redesenho. Se mudar a chave PIX, substitua também o QR Code no painel.

## Streaming: origem e atualização

API fornecida: `https://api.reidoscanais.cam`. O servidor consulta `/channels` e `/sports`; se essa rota falhar, o navegador usa diretamente a API pública com CORS habilitado. O botão de atualização no Admin também pode persistir esse catálogo consultado pelo navegador. a busca e os filtros atuam no catálogo sincronizado. O EPG é atualizado em intervalos de 5 minutos. A atualização manual tem intervalo mínimo de um minuto. Falhas preservam o último catálogo salvo e exibem um aviso. Sem catálogo anterior, aparece um estado de indisponibilidade com nova tentativa.

O painel indica se a API respondeu e quando houve sincronização. **Resposta da API não comprova reprodução.** Os estados offline e oculto são ajustes manuais. A administração pode abrir as fontes para conferir e substituir um player. Não há números simulados, medição de ping dos servidores de jogo nem confirmação automática de todos os players externos.

O TMDB fornece **metadados**, e não filmes completos. O **Token de Leitura da API é suficiente**; não é necessário cadastrar também uma chave de API. Após configurar o token, o catálogo traz os 20 filmes e as 20 séries populares retornados pelo serviço. Canais, esportes, filmes e séries têm espaços separados, busca, filtros próprios e favoritos em cada categoria. A hero alterna capas e cenários reais do catálogo TMDB, com pausa e redução de movimento.

A integração automática **StreamBetter** vem ativa nesta versão. Para substituir uma fonte, abra **Admin → Streaming Mithys**, selecione um título, informe uma fonte HTTPS e escolha **embed**, **HLS (.m3u8)** ou **MP4**. Salve o player do título. Embeds usam iframe; HLS e MP4 usam vídeo com controles e HLS.js quando necessário. O provedor deve permitir incorporação e, para vídeo direto, acesso CORS. Com a integração StreamBetter ativa, os IDs encontrados na lista do provedor recebem player automaticamente; fontes manuais têm prioridade. Sem fonte automática ou manual, o site informa que a reprodução não está cadastrada e oferece o link oficial de onde assistir. O TMDB é atribuído com logo e aviso oficial.

A pedido do proprietário, o atributo sandbox foi removido dos iframes externos. O site exibe um aviso destacado de conteúdo de terceiros com anúncios antes da reprodução. Fontes podem abrir outras abas. Não há alteração do código do provedor nem bloqueador ou promessa de remoção de anúncios. A disponibilidade depende de cada fonte.

### Filmes e séries — StreamBetter

A integração usa os embeds públicos documentados em https://streambetter.lol/docs: `/filme/{tmdb_id}` e `/serie/{tmdb_id}/{temporada}/{episodio}`. Esses embeds não exigem chave da API paga de links diretos. O site não extrai vídeos nem contorna as verificações do provedor.

A lista `/api/titles/ids` é validada e armazenada por 6 horas, com ETag. A vitrine combina os populares do TMDB com até 60 novidades de filmes e 60 de séries retornadas por `/api/titles`. Apenas IDs listados recebem o player automático. O total informado pelo provedor no Admin se refere à lista de IDs completa, não ao tamanho da vitrine. Uma falha preserva os últimos dados válidos e adia novas tentativas.

Em **Admin → Streaming Mithys → Player automático — StreamBetter**, você pode desativar a integração e atualizar o catálogo. No editor de cada título, é possível desativar apenas seu player automático ou substituí-lo por uma URL específica. Canais e esportes continuam com a integração já configurada.

Nas séries, os controles escolhem temporada e episódio e remontam o iframe para a seleção. A lista de temporadas e episódios usa o token TMDB guardado no servidor, com cache de 24 horas. Se a lista não responder, o player pode informar os números manualmente. Especiais usam temporada 0. A listagem do TMDB não confirma que o fornecedor tenha uma fonte para cada episódio.

Legendas, troca automática de fonte, anúncios, autoplay do próximo episódio e verificações dentro do iframe pertencem ao provedor. Durante a conferência, a API pública respondeu; o iframe solicitou uma verificação humana do Cloudflare neste navegador. A reprodução do vídeo completo não foi certificada.

### Acesso por código

O streaming é um benefício dos players liberados pela administração. **Admin → Códigos de acesso → Gerar código** permite identificar o jogador, definir validade e copiar o código completo, exibido somente nesse momento. Envie-o ao player pelo canal escolhido pela administração. O site não envia mensagens automaticamente. A lista mostra apenas o sufixo; se perder um código, revogue e gere outro.

O popup solicita o código. A página e a API do catálogo verificam a permissão no servidor. Os códigos são aleatórios e o banco guarda hashes; a sessão usa cookie HttpOnly de até 7 dias, limitado também pela validade do código. Revogar impede novas entradas e invalida sessões existentes nas verificações do servidor. A tela já aberta confere o acesso a cada 30 segundos e ao voltar para a aba. Isso não é DRM: não controla URLs públicas do provedor que alguém já tenha copiado. Administradores autenticados acessam sem código.

A administração decide a elegibilidade e a presença dos players; não há integração automática com frequência no servidor de CS. O formulário tem limitação de tentativas por minuto persistida no banco.

## Vídeo da hero

YouTube `8XxzRvILdOc`, início em **93 segundos (1:33)**, mudo, sem controles, escurecido, com repetição. O IFrame API só torna o vídeo visível após receber o estado de reprodução. A Home usa somente o vídeo e camadas de escurecimento, sem imagem sobreposta ou imagem de reserva. Há botão de pausa e respeito a redução de movimento. Autoplay, incorporação, anúncios e identificação do YouTube dependem da plataforma. A API atual não garante remover toda a marca ou informação do canal.

## Segurança e dados

Painel e APIs de escrita verificam autorização no servidor e origem da requisição. No Next.js padrão, o login usa senha de ambiente, sessão assinada de 6 horas, cookie HttpOnly/SameSite e limitação de tentativas por processo. Na prévia, usa identidade da plataforma e email autorizado configurado no ambiente. Não há senha universal, token TMDB no cliente ou credenciais no ZIP.

## Fontes de conteúdo e referências técnicas

- História oficial: https://blog.counter-strike.net/index.php/history/
- Jogo e data comercial: https://store.steampowered.com/app/10/CounterStrike/
- Anúncio Steam/1.6 de 15/09/2003: https://store.steampowered.com/oldnews/184
- Referências individuais: seção Fontes e referências de cada artigo.
- Motion, pesquisado como referência de animação: https://github.com/motiondivision/motion (microinterações finais implementadas em CSS, sem essa dependência).
- Ícones Lucide: https://github.com/lucide-icons/lucide
- Parâmetros YouTube: https://developers.google.com/youtube/player_parameters
- TMDB: https://developer.themoviedb.org/docs/authentication-application
- Neon: https://neon.com/docs/serverless/serverless-driver

A história do clan é uma narrativa editorial criada a pedido, sem datas, estatísticas, títulos conquistados ou depoimentos inventados. Revise a história com a equipe antes de divulgação pública.

## Comandos

- `pnpm typecheck`: TypeScript
- `pnpm build:next`: banco Neon + Next.js padrão
- `pnpm dev:next` / `pnpm start:next`: desenvolvimento e produção Next
- `pnpm build`: build de publicação da prévia via Vinext/Sites
- `pnpm db:generate`: migrações D1 da prévia

Arquivos centrais: `app/`, `components/`, `lib/defaults.ts`, `lib/articles.ts`, `lib/platform.ts`, `lib/platform-sites.ts`, `db/neon.sql`. O Vite troca os adaptadores apenas para a hospedagem da prévia; o Next usa os adaptadores padrão.

## Atualizar um projeto já publicado

1. Faça um backup do código atual e substitua os arquivos do repositório ligado à Vercel pelos deste pacote. **Redeploy sem atualizar o código mantém a versão antiga.**
2. Preserve as variáveis `DATABASE_URL`, `ADMIN_PASSWORD` e `NEXT_PUBLIC_SITE_URL` que já usa. Não substitua o banco nem coloque segredos no GitHub.
3. Confirme o comando `pnpm build:next` e publique o novo commit. Ele cria as tabelas de códigos/sessões sem apagar configurações, artigos ou estatísticas existentes.
4. Acesse `/admin`. Em **Códigos de acesso**, gere os primeiros códigos. Em **Streaming Mithys**, confira se o StreamBetter está ativo e clique em **Atualizar catálogo**. Cadastre uma URL específica apenas quando quiser substituir a fonte automática.
5. Em **Banners e imagens**, a nova capa de compartilhamento pode ser substituída. `NEXT_PUBLIC_SITE_URL` precisa apontar para seu domínio real; a miniatura exige site e imagem acessíveis publicamente. O WhatsApp pode manter a prévia antiga em cache.

A imagem antiga padrão do primeiro servidor 4FUN é atualizada para o novo operador; imagens personalizadas e os demais textos/preços salvos são preservados. Novos conteúdos da Home, guia, FAQ, regras e destaques VIP fazem parte do código.

## Validação

17 testes automatizados cobrem autenticação, expiração, revogação de códigos e sessões, URLs de reprodução, preservação das configurações, os 10 artigos, validação de IDs, precedência de fontes e numeração de temporadas/episódios. TypeScript aprovado. A conferência visual inclui Home, regras, guia e bloqueio do streaming em desktop e largura de celular. A reprodução de todos os players externos não foi certificada e depende das fontes cadastradas pelo proprietário.
