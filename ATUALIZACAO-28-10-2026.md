# Atualização visual e funcional — Clan Mythskill

Este pacote mantém o projeto Next.js existente, suas rotas, painel administrativo e integrações. Não foi reconstruído do zero.

## Alterações incluídas

1. Header fixo em toda a largura (sem flutuação), com botão VIP destacado e coroa amarela.
2. Substituição da contagem confusa de oito mapas por referência ao CS 1.6.
3. Botão explícito **Conectar Steam** na listagem de servidores.
4. Modal de regras com cartões numerados, ícones, avisos e diferenciação jogadores/administração.
5. Acabamento no painel e faixa do VIP, com transição menos abrupta entre as seções.
6. Tipografia do FAQ corrigida para maior legibilidade.
7. Atalho **Escolher meu servidor** com rolagem funcional para a seção de servidores, inclusive quando o usuário já está na home.
8. Alinhamento de insígnias e respectivas legendas no ranking.
9. Oito ilustrações novas de mapas, 1024 × 768 pixels, substituindo as miniaturas de 160 × 120 pixels. **São ilustrações inspiradas nos cenários, não screenshots fiéis da engine CS 1.6.**
10. Player de boas-vindas na home, com áudio de 18,9 segundos, uma reprodução automática *quando permitida* pelo navegador, controles para pausar, ouvir novamente e reproduzir manualmente.
11. Carrossel contínuo de artigos do blog, com pausa ao passar o mouse ou focar um cartão e respeito à preferência por movimento reduzido.
12. Fluxo de VIP mantém o comprovante privado no storage, registra nome, nick, Steam ID e período no painel e prepara WhatsApp com os dados e o protocolo. Dispositivos com Web Share API podem enviar o arquivo e texto usando o compartilhamento nativo; no desktop, abre o WhatsApp com a mensagem e o comprovante fica registrado no painel, com opção para compartilhá-lo manualmente.

## Importante: áudio e WhatsApp

**Áudio automático com som**: Chrome, Safari, Edge e Firefox podem bloquear o autoplay em sites sem interação prévia do visitante. O site tenta reproduzir automaticamente; caso seja bloqueado, o miniplayer oferece o botão **Ouvir**. Isso é uma limitação dos navegadores, não um bug no áudio.

**Comprovantes no WhatsApp**: o `wa.me` não permite anexar documentos automaticamente. Para entrega completamente automática do arquivo pelo número da empresa, é necessário integrar a **WhatsApp Business Platform/Cloud API** (com credenciais e infraestrutura adequadas). Esta atualização não finge enviar arquivos via `wa.me`: mantém o registro privado na área administrativa, compartilha o arquivo nativamente em dispositivos compatíveis e apresenta o canal de WhatsApp. No desktop pode ser necessário clicar em **Compartilhar comprovante** ou anexá-lo pelo WhatsApp. O painel administrativo deve estar conectado a DB e armazenamento de arquivos (BUCKET), conforme configuração original do sistema.

## Para publicar na Vercel

Substitua os arquivos correspondentes no repositório pelo conteúdo desta pasta, preservando suas configurações de produção e variáveis de ambiente. Execute `pnpm install --frozen-lockfile` e `pnpm run build:next` no ambiente de compilação antes de publicar. Não é necessário alterar banco de dados ou criar nova tabela para estes ajustes.

> Validação realizada aqui: análise de sintaxe TypeScript/TSX e de CSS. O build completo não pôde ser executado neste ambiente porque as dependências locais do projeto não estão instaladas. Confira o log de build no deploy Vercel.
