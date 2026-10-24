# MythSkill v1.3 — correção dos estilos da Home e Streaming Mithys

## O que foi alterado

- Os estilos adicionados à Home, modal de código de acesso, streaming, seletor de episódios e administração agora ficam em `app/styles/community-streaming.css`, **importado diretamente por `app/layout.tsx`** após o CSS principal. A ordem visual das regras originais foi mantida.
- O build da Vercel agora executa `scripts/verify-styles.mjs` duas vezes: antes da compilação, para checar a presença dos estilos no código, e depois da compilação, para checar se o Next.js realmente colocou esses seletores nos CSS publicados em `.next/static`.
- Se algum estilo essencial estiver ausente, **o build falha** em vez de publicar silenciosamente a página sem layout.
- O script opcional `scripts/verify-live-styles.mjs` permite conferir o CSS que o domínio realmente entrega aos visitantes.
- Integração StreamBetter, painel, códigos de acesso, banco de dados, conteúdos e APIs não foram alterados.

## Como atualizar na Vercel, passo a passo

1. **Salve um backup da versão atual do projeto** antes de trocar arquivos. Na Vercel, os deployments antigos permanecem no histórico e podem ser promovidos novamente.
2. Descompacte o ZIP entregue. Entre na pasta **`Clan-MythSkill`**, que contém o arquivo `package.json`.
3. No **mesmo repositório GitHub usado pela Vercel**, substitua os arquivos do projeto pelos da nova pasta, preservando o histórico de Git. Não envie apenas o ZIP fechado para o GitHub esperando que a Vercel o extraia.
4. Confirme especialmente a presença destes arquivos:
   - `app/layout.tsx`
   - `app/globals.css`
   - `app/styles/community-streaming.css` (NOVO)
   - `scripts/verify-styles.mjs` (NOVO)
   - `scripts/verify-live-styles.mjs` (NOVO)
   - `package.json`
5. Faça o commit no GitHub. A Vercel, se estiver conectada ao repositório, iniciará uma nova implantação.
6. Em **Vercel → Projeto → Deployments**, abra a implantação mais recente. Confirme a execução dos comandos indicados abaixo.
7. Verifique em **Settings → Build and Deployment** que o Framework é `Next.js` e o Build Command é `pnpm build:next` (como definido em `vercel.json`). Deixe Output Directory sem customização.
8. **Mantenha as variáveis de ambiente existentes**; principalmente `DATABASE_URL` (Neon), `ADMIN_PASSWORD` e `NEXT_PUBLIC_SITE_URL`, se já estiverem configuradas. Não compartilhe senhas nem chaves em capturas ou mensagens.
9. Abra a nova versão pelo link de Preview da Vercel. Confira a **Home** e **`/streaming`** em desktop e celular. O formulário de código deve surgir **dentro de um popup centralizado**, sobre uma camada escurecida. Confira também o painel Admin.
10. Se a prévia estiver correta, publique/promova a implantação para produção. Se o navegador mostrar layout antigo, atualize com **Ctrl + Shift + R** ou teste em aba anônima.

## O que esperar do log de build

Você verá mensagens como:

    OK: CSS fonte contém todos os 11 seletores essenciais da Home, Streaming e Admin.
    ... Next.js build ...
    OK: CSS de produção (...) contém todos os 11 seletores essenciais da Home, Streaming e Admin.

Se algum dos avisos acusar erro, **não publique esse deployment**; o log identificará o seletor CSS ausente.

## Verificação extra do site ao vivo (para quem usa terminal)

```bash
node scripts/verify-live-styles.mjs https://clanmythskill.com
```

O teste baixa as duas páginas e os CSS referenciados por elas. Deve mostrar `OK` para `/` e `/streaming`. Se o código compilado estiver correto, mas a versão ao vivo falhar, o problema estará na publicação/propagação dos arquivos — por exemplo, apontamento do domínio para outra implantação, ou arquivos antigos servidos pelo cache/CDN.

## Observação importante

Não foi possível concluir um `next build` real neste ambiente, porque não há dependências `node_modules` no ZIP e o acesso ao registro NPM está indisponível. A verificação estrutural e a leitura do CSS passaram; **a confirmação final do bundle de produção deve vir do log da Vercel e do teste no domínio**. A correção organiza a entrega do CSS e bloqueia builds incompletos, mas não garante que o domínio receba a implantação correta.
