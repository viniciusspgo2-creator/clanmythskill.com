export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  sections: { heading: string; paragraphs: string[] }[];
  sources?: { label: string; url: string }[];
  published: boolean;
  archived?: boolean;
  bodyMarkdown?: string;
  scheduledAt?: string;
  imageAlt?: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
};

export const articles: Article[] = [
  {
    id: 'historia-cs16', slug: 'counter-strike-16-de-mod-a-legado',
    title: 'De mod a legado: por que o Counter-Strike 1.6 continua vivo',
    excerpt: '1999 foi o começo. O que veio depois transformou partidas entre amigos em uma cultura que atravessa gerações.',
    category: 'Cultura CS', readTime: '4 min', date: '2026-10-23', image: '/images/hero.webp', published: true,
    sections: [
      { heading: 'Uma ideia que colocou o time no centro', paragraphs: [
        'Counter-Strike nasceu em 1999 como uma modificação de Half-Life. A informação aparece na própria história oficial publicada pela Valve. Seu ponto de partida era direto: dois lados, objetivos definidos e decisões que faziam cada jogador depender do restante da equipe. O impacto de uma partida não precisava de um mundo gigantesco. Um corredor, uma informação passada na hora certa e um duelo bem resolvido já bastavam.',
        'O jogo comercial aparece na Steam com lançamento em 2000. A versão 1.6 faz parte de outro momento dessa trajetória: em setembro de 2003, a Valve anunciou seu instalador para Steam. Separar essas datas evita uma confusão comum. Counter-Strike não começou em 2003; foi nesse período que a edição associada ao nome 1.6 consolidou sua relação com a distribuição pela plataforma.'
      ] },
      { heading: 'O que fica quando o visual envelhece', paragraphs: [
        'Existe uma razão para alguém reconhecer uma partida de CS sem olhar o placar: o ritmo. O silêncio antes de uma entrada, o barulho de uma rotação e a tensão de um jogador sozinho contra o relógio criam uma linguagem própria. A aparência pode marcar uma época, mas a leitura desses momentos continua exigindo atenção e experiência.',
        'É também um jogo fácil de explicar e difícil de dominar. Entender o objetivo demora pouco. Aprender quando avançar, quando recuar e como transformar informação em vantagem leva muito mais tempo. Essa distância entre conhecer os controles e jogar bem dá espaço para evolução sem exigir que a essência mude a cada temporada.'
      ] },
      { heading: 'Comunidade é a parte que não vem no instalador', paragraphs: [
        'Um servidor recorrente transforma desconhecidos em nomes familiares. O nickname que aparece novamente, a rivalidade saudável e o convite para mais um mapa dão personalidade à experiência. Para quem retorna depois de anos, reencontrar esse ambiente pode importar tanto quanto acertar o primeiro headshot.',
        'O MythSkill existe nesse território: preservar a vontade de jogar junto. Há endereços para 4FUN, uma opção de reserva e um servidor MIX, apresentados na página inicial. Cada proposta pede uma atitude diferente, mas todas começam pelo mesmo gesto: conectar, respeitar quem está no outro lado e participar da partida. O legado do 1.6 continua sendo construído nesse encontro, round após round. Cada nova conexão dá continuidade a uma história que nenhum placar consegue contar sozinho.'
      ] }
    ],
    sources: [
      { label: 'Valve — História de Counter-Strike', url: 'https://blog.counter-strike.net/history/' },
      { label: 'Valve — Instalador Steam do Counter-Strike 1.6, 15/09/2003', url: 'https://store.steampowered.com/oldnews/184?l=english' },
      { label: 'Steam — Counter-Strike', url: 'https://store.steampowered.com/app/10/CounterStrike/' }
    ]
  },
  {
    id: 'primeira-conexao', slug: 'como-entrar-servidor-mythskill-steam-id',
    title: 'Seu primeiro connect no MythSkill: IP, console e Steam ID',
    excerpt: 'Um caminho direto da página do servidor para o jogo, com alternativa manual e ajuda para identificar sua conta.',
    category: 'Primeiros passos', readTime: '4 min', date: '2026-10-23', image: '/images/squad.webp', published: true,
    sections: [
      { heading: 'Escolha onde quer jogar', paragraphs: [
        'Antes de abrir o jogo, escolha a proposta da partida. O endereço principal do 4FUN é 131.196.198.52:27248. A alternativa de reserva é 177.54.152.30:27035. Para o MIX, o endereço é 131.196.198.33:27019. Copie o IP completo, incluindo os dois-pontos e a porta: essa segunda parte também faz parte do destino.',
        'Os botões de conexão pela Steam usam um link que solicita ao computador abrir o cliente instalado. O navegador pode pedir confirmação. Se nada acontecer, confira se a Steam e o Counter-Strike estão instalados e use a alternativa pelo console. O site consegue encaminhar a solicitação de abertura; ele não instala o jogo nem garante que o servidor tenha vagas naquele momento.'
      ] },
      { heading: 'Entre manualmente pelo console', paragraphs: [
        'Abra o Counter-Strike 1.6 e acesse o console. A tecla depende do teclado e da configuração; em muitas instalações fica próxima de Esc e é identificada como acento grave ou til. Se ela não funcionar, confira as configurações do jogo e a documentação de sua instalação. Não é necessário baixar um arquivo executável para habilitar uma conexão comum.',
        'No console, digite connect 131.196.198.52:27248 e pressione Enter para tentar o 4FUN principal. Troque o endereço para acessar o reserva ou o MIX. Evite colar comandos extras recebidos de desconhecidos. Se houver erro, copie a mensagem exibida: ela ajuda a distinguir endereço incorreto, falha de conexão e uma condição específica do servidor.'
      ] },
      { heading: 'Identifique o jogador certo', paragraphs: [
        'Nickname e identificador de conta são coisas diferentes. O nick pode mudar; o identificador é usado pela administração para localizar o jogador. Em uma partida conectada, o comando status permite consultar informações da sessão. Localize a linha do seu nickname e copie exatamente o identificador exibido. Não copie o de outro jogador e não substitua números por um exemplo encontrado na internet.',
        'A Steam também oferece orientação oficial para encontrar o SteamID no perfil. Existem formatos diferentes de identificação; ao pedir ativação do VIP, informe o valor solicitado no formulário e fale com a equipe se tiver dúvida. Nunca envie senha, código de autenticação ou acesso à conta. Para suporte, o WhatsApp do clan é +55 12 99670-6509. Descreva o problema, diga em qual IP tentou entrar e envie a mensagem de erro para que a conversa comece com contexto.'
      ] }
    ],
    sources: [
      { label: 'Valve Developer Community — Console e comando connect', url: 'https://developer.valvesoftware.com/wiki/Developer_console' },
      { label: 'Valve Developer Community — Comandos de console', url: 'https://developer.valvesoftware.com/wiki/Console_Command_List' },
      { label: 'Suporte Steam — Identificadores Steam', url: 'https://help.steampowered.com/pt-br/faqs/view/2816-BE67-5B69-0FEC' }
    ]
  },
  {
    id: 'mira-recoil', slug: 'mira-recoil-consistencia-cs16',
    title: 'Mira consistente vale mais que um flick bonito',
    excerpt: 'Posicionamento, movimento e controle de disparo: três hábitos para transformar treino em decisões melhores no round.',
    category: 'Evolução', readTime: '4 min', date: '2026-10-23', image: '/images/arsenal.webp', published: true,
    sections: [
      { heading: 'Ganhe tempo antes de ver o adversário', paragraphs: [
        'O melhor ajuste de mira muitas vezes acontece antes do duelo. Ao atravessar um corredor, observe onde um adversário provavelmente surgiria e mantenha a mira próxima dessa região. Olhar para o chão cria um movimento adicional quando alguém aparece. Antecipar a altura e a posição reduz o trabalho necessário para responder.',
        'Isso não significa mirar no mesmo ponto em todos os mapas. Rampas, caixas, escadas e diferenças de altura mudam a referência. Escolha um trajeto conhecido e percorra lentamente, verificando cada encontro provável. O objetivo do exercício é tornar consciente aquilo que, durante a partida, precisa acontecer sem interromper sua leitura do mapa.'
      ] },
      { heading: 'Entenda o disparo que está escolhendo', paragraphs: [
        'No 1.6, movimento e sequência de disparos interferem no resultado dos tiros. Como orientação de treino, comece parado, observe impactos em uma parede e compare disparos isolados, rajadas curtas e sequências longas. Use a mesma arma, distância e posição a cada repetição. Mudar várias condições ao mesmo tempo torna difícil perceber o que realmente melhorou.',
        'Não trate toda situação como uma oportunidade de segurar o botão até acabar o carregador. Distância, cobertura e tempo disponível devem orientar a escolha. Em um duelo mais distante, controlar o ritmo pode fazer mais sentido; perto de um adversário, o contexto pode pedir uma resposta diferente. O treino serve para ampliar opções, não para produzir uma receita que ignore o round.'
      ] },
      { heading: 'Treine uma mudança por vez', paragraphs: [
        'Reserve uma sessão curta para uma habilidade específica: manter a mira preparada, parar antes de disparar ou controlar uma arma que você usa com frequência. A recomendação editorial é registrar o foco antes de começar e avaliar depois se conseguiu executá-lo. Contar apenas eliminações mistura acertos de decisão com oportunidades fáceis e não explica a causa dos erros.',
        'Evite trocar sensibilidade, resolução e equipamento depois de cada derrota. Uma configuração confortável precisa de repetição para virar referência. Faça ajustes quando conseguir descrever o problema: falta espaço no mousepad, movimentos pequenos estão difíceis ou a imagem atrapalha a leitura. Ao voltar ao servidor, mantenha o foco escolhido mesmo depois de perder dois duelos. Consistência nasce de repetir uma boa preparação sob pressão, e não de copiar uma configuração de alguém que joga de outro jeito.'
      ] }
    ],
    sources: [{ label: 'Steam — Counter-Strike, jogo tático em equipe', url: 'https://store.steampowered.com/app/10/CounterStrike/' }]
  },
  {
    id: 'dust2-posicionamento', slug: 'dust2-posicionamento-controle-mapa',
    title: 'Dust2 além da memória: jogue o espaço, não só o duelo',
    excerpt: 'Conhecer o caminho é o começo. Entender cobertura, informação e rotação muda o jeito de atravessar o mapa.',
    category: 'Mapas & tática', readTime: '4 min', date: '2026-10-23', image: '/images/dust.webp', published: true,
    sections: [
      { heading: 'Conheça as rotas pelo que elas permitem', paragraphs: [
        'Dust2 parece familiar até o momento em que você precisa explicar por que estava em determinado lugar. Long, meio, varanda e túneis não são apenas nomes para passar informação: são rotas que conectam possibilidades de avanço, defesa e rotação. Use uma partida de treino para percorrê-las observando as linhas de visão e os locais onde você fica exposto.',
        'Uma boa pergunta é: se houver alguém aqui, de onde mais posso receber um tiro? Entrar em uma posição enxergando vários ângulos ao mesmo tempo dificulta qualquer resposta. Como orientação tática, procure dividir a exposição, usando cobertura para reduzir as possibilidades enquanto verifica cada espaço. Não transforme uma abertura em uma corrida automática só porque conhece o trajeto.'
      ] },
      { heading: 'Informação não é confirmação de todo o mapa', paragraphs: [
        'Ver um adversário em um setor informa a presença daquele jogador naquele instante. Isso não revela a localização de todos os demais. Rotacionar sem considerar essa diferença pode liberar uma passagem importante. Ao receber uma chamada, avalie quantidade vista, direção, presença da C4 e tempo do round antes de abandonar sua função.',
        'Também comunique o que você deixou de controlar. Dizer que saiu de um ponto ajuda o restante do time a compreender a nova distribuição. Se estiver sozinho, sobreviver por alguns segundos e manter uma linha de informação pode contribuir mais do que buscar um duelo sem possibilidade de troca. Sua posição vale pelo que ela permite ao conjunto, não apenas pelo número de eliminações que produz.'
      ] },
      { heading: 'Faça cada avanço ter apoio', paragraphs: [
        'Quando dois jogadores entram com grande distância entre si, o segundo pode chegar tarde para responder ao duelo do primeiro. A ideia de troca é avançar com espaçamento que permita reagir sem bloquear o companheiro. Não existe uma distância universal: cobertura, velocidade da entrada e risco de granada influenciam essa decisão.',
        'Para evoluir em Dust2, escolha uma rota por sessão e revise três pontos: onde você se expôs demais, qual informação faltou e se havia um companheiro em condição de ajudar. Converse depois do round, sem transformar a revisão em acusação. Os nomes de posições podem variar entre grupos; combine as chamadas antes de uma partida organizada. Conhecer o mapa de verdade é conseguir transformar essa linguagem comum em escolhas mais claras quando o relógio aperta.'
      ] }
    ],
    sources: [{ label: 'Steam — Objetivos e jogo em equipe em Counter-Strike', url: 'https://store.steampowered.com/app/10/CounterStrike/' }]
  },
  {
    id: 'economia', slug: 'economia-cs16-comprar-guardar-time',
    title: 'O round começa na compra: economia para jogar em equipe',
    excerpt: 'Uma arma forte não resolve uma compra desorganizada. Aprenda a pensar no equipamento como decisão coletiva.',
    category: 'Mapas & tática', readTime: '4 min', date: '2026-10-23', image: '/images/hero.webp', published: true,
    sections: [
      { heading: 'Dinheiro individual, plano coletivo', paragraphs: [
        'Abrir o menu de compra sem conversar pode criar cinco planos diferentes dentro do mesmo time. Um jogador guarda, outro investe tudo em uma arma e os demais ficam entre os dois. Em uma partida organizada, vale confirmar a intenção do grupo antes de gastar. O que importa é a condição com que vocês pretendem disputar o round e o que estará disponível no seguinte.',
        'Esta é uma orientação tática, não uma regra universal do MythSkill. Servidores podem adotar configurações, modos e condições econômicas diferentes. Observe o ambiente em que está jogando e combine expectativas com os demais. No 4FUN, há mais espaço para escolhas individuais; no MIX, sincronizar equipamento e estratégia costuma ter peso maior na experiência da equipe.'
      ] },
      { heading: 'O equipamento precisa servir à função', paragraphs: [
        'Antes de priorizar a arma mais cara, pense no que será necessário fazer. Abrir um espaço, apoiar uma entrada e proteger uma posição são funções diferentes. Equipamento de proteção e granadas também competem pelo orçamento. Uma compra útil é aquela que permite executar sua parte do plano, em vez de simplesmente preencher o inventário com o maior número possível de itens.',
        'Pedir ou oferecer uma arma exige clareza. Informe o que consegue comprar e espere a combinação para evitar desperdício. Quando alguém entrega equipamento, o restante do time precisa saber quem ficou responsável por utilitários e proteção. A distribuição faz mais sentido quando considera o conjunto, especialmente se os recursos disponíveis não permitem equipar todos da mesma forma.'
      ] },
      { heading: 'Pense no que sua morte entrega', paragraphs: [
        'Perder equipamento em um duelo desnecessário muda o próximo round e pode fortalecer o adversário. Quando a situação fica difícil, considere objetivo, relógio, posições conhecidas e chance real de recuperação. Guardar uma arma pode ser uma decisão racional; insistir também pode ser necessário. O erro está em decidir por impulso sem avaliar o que você está tentando alcançar.',
        'Depois da partida, reveja compras que deixaram você sem condições de executar sua função. Você gastou antes de ouvir o time? Entrou sozinho carregando o melhor equipamento? Faltou recurso para a etapa seguinte? Não é preciso decorar uma tabela inteira para começar a melhorar. Desenvolva o hábito de observar o dinheiro, ouvir a chamada e relacionar cada gasto a uma finalidade. A economia fica mais compreensível quando deixa de ser uma sequência de cliques e passa a fazer parte do round.'
      ] }
    ],
    sources: [{ label: 'Steam — Counter-Strike e suas missões em equipe', url: 'https://store.steampowered.com/app/10/CounterStrike/' }]
  },
  {
    id: 'comunicacao', slug: '4fun-mix-comunicacao-que-ajuda',
    title: '4FUN ou MIX: a comunicação que faz o time jogar melhor',
    excerpt: 'Passe o que muda a decisão do companheiro. Menos ruído, mais contexto e espaço para ouvir o round.',
    category: 'Comunidade', readTime: '4 min', date: '2026-10-23', image: '/images/squad.webp', published: true,
    sections: [
      { heading: 'Leia o ambiente antes de abrir o microfone', paragraphs: [
        '4FUN e MIX descrevem propostas de jogo que costumam criar expectativas distintas. Um encontro casual pode comportar mais conversa e experimentação. Uma partida organizada tende a exigir maior coordenação. A melhor maneira de se adaptar é observar o momento e combinar com o grupo o que é necessário. Não presuma que todos usam os mesmos nomes de posição ou conhecem sua maneira de jogar.',
        'No MythSkill, os endereços de cada modalidade estão disponíveis na seção de servidores. Essa separação ajuda a escolher a experiência que você procura. As orientações deste artigo são sugestões de convivência e comunicação; condições específicas de cada partida e regras operacionais devem ser confirmadas com a administração quando houver dúvida.'
      ] },
      { heading: 'Passe informação que alguém possa usar', paragraphs: [
        'Uma chamada útil descreve lugar, quantidade observada e ação relevante. Por exemplo: dois vistos no corredor, avançando. Se não confirmou a C4, não diga que ela está ali. Se ouviu passos, descreva como som, não como posição garantida. Essa diferença mantém o time informado sem converter uma hipótese em certeza.',
        'Depois de morrer, informe rapidamente o que viu e permita que os jogadores vivos ouçam. Repetir uma ordem em voz alta pode encobrir um passo decisivo. Evite narrar cada movimento do companheiro ou exigir que ele responda durante um duelo. Quando uma informação mudar, atualize de forma curta: o jogador recuou, você perdeu a visão ou aquele setor deixou de ser controlado.'
      ] },
      { heading: 'Discordar também faz parte do jogo', paragraphs: [
        'Nem toda decisão tem uma resposta evidente. Um jogador pode tentar recuperar uma posição enquanto outro prefere guardar equipamento. Discutir a escolha é mais útil depois do round, com contexto. Falar sobre o que aconteceu e o que poderia ser combinado no próximo evita transformar um erro pontual em um conflito pessoal.',
        'Cheque o volume do microfone, evite áudio estourado e mantenha espaço para os demais. Se a comunicação não estiver funcionando, simplifique: combine uma chamada inicial, confirme quem cobre cada rota e só acrescente informação que mude uma decisão. Isso não exige jogar como profissional. Exige respeito pelo tempo de quem está ao seu lado. Uma comunidade fica mais convidativa quando um jogador novo consegue perguntar sem ser ridicularizado e um veterano consegue orientar sem transformar a partida em uma cobrança constante.'
      ] }
    ],
    sources: [{ label: 'Steam — A proposta de equipe de Counter-Strike', url: 'https://store.steampowered.com/app/10/CounterStrike/' }]
  },
  {
    id: 'configuracao', slug: 'cs16-configuracao-fps-sem-comandos-magicos',
    title: 'Configuração sem mito: encontre o problema antes de mudar tudo',
    excerpt: 'FPS, rede e sensibilidade são assuntos diferentes. Um diagnóstico simples vale mais que uma lista de comandos milagrosos.',
    category: 'Configuração', readTime: '4 min', date: '2026-10-23', image: '/images/arsenal.webp', published: true,
    sections: [
      { heading: 'Dê nome ao sintoma', paragraphs: [
        'Imagem travando, atraso de conexão e dificuldade para controlar a mira podem parecer o mesmo problema durante um duelo, mas pedem investigações distintas. Antes de alterar uma configuração, descreva o que acontece e quando começa. O jogo apresenta o mesmo comportamento em uma partida local? Só ocorre em um servidor? Aparece depois de abrir outro programa?',
        'Essa comparação não fornece um diagnóstico definitivo, mas reduz tentativas aleatórias. Faça um teste por vez e anote o resultado. Se mudar resolução, sensibilidade, limite de quadros e parâmetros de rede juntos, você perde a referência do que causou melhora ou piora. A configuração mais útil é a que você entende e consegue reproduzir.'
      ] },
      { heading: 'Comece pelo que você consegue verificar', paragraphs: [
        'Feche tarefas pesadas que não precisa usar durante a sessão e confira se o computador está executando o jogo na configuração esperada. Teste uma resolução confortável e observe a estabilidade, não apenas um número isolado. Em problemas de rede, compare uma conexão cabeada quando possível e veja se há transferências concorrentes. São verificações práticas, não promessas de ganho.',
        'Se a instalação Steam apresentar arquivos ausentes ou falhas, a plataforma oferece a verificação de integridade nas propriedades do jogo, em Arquivos instalados. Faça cópia das configurações pessoais que queira preservar antes de qualquer intervenção maior. O procedimento verifica os arquivos instalados; ele não resolve automaticamente todos os problemas de hardware, internet ou configuração.'
      ] },
      { heading: 'Desconfie de receitas universais', paragraphs: [
        'Listas antigas podem misturar comandos de GoldSrc, Source e jogos mais recentes. Um parâmetro copiado de CS2 não deve ser tratado como instrução para CS 1.6. Mesmo dentro do mesmo jogo, versões e limites definidos pelo servidor influenciam o que se aplica. Evite executáveis de otimização, arquivos desconhecidos e scripts que você não consegue explicar.',
        'Para pedir ajuda, envie uma descrição curta do sintoma, a configuração básica do computador, a forma de conexão e os testes já realizados. Uma captura da mensagem de erro costuma valer mais do que dizer apenas que está lagado. Consulte a documentação da instalação e a equipe do servidor quando houver condição específica. Ajustar com método também protege sua experiência: menos tempo desfazendo mudanças aleatórias e mais tempo entendendo o que realmente faz diferença no seu ambiente.'
      ] }
    ],
    sources: [
      { label: 'Suporte Steam — Verificar integridade dos arquivos', url: 'https://help.steampowered.com/en/faqs/view/0C48-FCBD-DA71-93EB' },
      { label: 'Valve Developer Community — Opções de inicialização GoldSrc', url: 'https://developer.valvesoftware.com/wiki/Command_line_options_(GoldSrc)' }
    ]
  },
  {
    id: 'fair-play', slug: 'fair-play-servidor-comunidade-respeito',
    title: 'Respeito também entra no placar: o básico do fair play',
    excerpt: 'Uma partida boa precisa de disputa e confiança. Veja como contribuir sem confundir suspeita, provocação e denúncia.',
    category: 'Comunidade', readTime: '4 min', date: '2026-10-23', image: '/images/dust.webp', published: true,
    sections: [
      { heading: 'O adversário faz parte da experiência', paragraphs: [
        'O prazer de vencer depende de enfrentar alguém que também teve uma chance justa de jogar. Por isso, fair play vai além de evitar ferramentas proibidas: envolve respeitar o espaço do outro, participar do objetivo e não usar a partida para perseguir pessoas. Rivalidade e brincadeira podem existir sem transformar alguém em alvo permanente.',
        'As recomendações deste artigo expressam boas práticas de comunidade. Elas não substituem o regulamento do servidor, não estabelecem penalidades e não descrevem uma política oficial de moderação do MythSkill. Quando precisar entender uma decisão administrativa ou uma condição de uso, procure a equipe pelo contato indicado no site.'
      ] },
      { heading: 'Suspeita exige contexto, não tribunal no chat', paragraphs: [
        'Um disparo impressionante não explica sozinho o que aconteceu antes. Informação de um companheiro, som e conhecimento de posição podem mudar a leitura de uma jogada. Se algo parecer irregular, preserve o contexto disponível e fale com a administração de forma objetiva. Evite espalhar acusações como se uma impressão fosse uma conclusão.',
        'Uma conversa útil inclui nickname, servidor, horário aproximado e uma descrição do comportamento observado. Caso tenha uma gravação, envie o trecho que permita entender a situação e informe o que acredita precisar de análise. Não peça a outros jogadores que persigam o suspeito e não tente obter acesso à conta de ninguém. A responsabilidade pela avaliação cabe a quem administra o ambiente.'
      ] },
      { heading: 'Ajude a partida a continuar', paragraphs: [
        'Quem está começando pode não conhecer uma chamada, uma rota ou o funcionamento da compra. Uma orientação curta resolve mais do que uma sequência de insultos. O mesmo vale para quem voltou depois de anos: experiência anterior não elimina a necessidade de se adaptar a outro grupo e a uma instalação atual.',
        'Se um conflito crescer, faça uma pausa na conversa e recupere o foco no jogo. Diferencie criticar uma decisão de atacar a pessoa que a tomou. Em problemas persistentes, busque o canal de suporte em vez de prolongar a discussão durante vários rounds. Comunidade não surge apenas de compartilhar um IP. Ela se fortalece quando as pessoas sabem que podem competir, errar e aprender sem abrir mão do respeito. Esse ambiente depende de pequenas escolhas repetidas por todos que entram no servidor.'
      ] }
    ],
    sources: [{ label: 'Steam — Counter-Strike, experiência multiplayer em equipe', url: 'https://store.steampowered.com/app/10/CounterStrike/' }]
  },
  {
    id: 'granadas', slug: 'granadas-cs16-utilidade-tempo-entrada',
    title: 'Granada com propósito: crie uma oportunidade antes de entrar',
    excerpt: 'Utilitários valem pelo que permitem ao time fazer. Coordene lançamento, avanço e informação para não desperdiçar a compra.',
    category: 'Mapas & tática', readTime: '4 min', date: '2026-10-23', image: '/images/hero.webp', published: true,
    sections: [
      { heading: 'Escolha o efeito que você precisa', paragraphs: [
        'Comprar granadas é a primeira decisão; usá-las no momento certo é outra. Antes de lançar, defina a oportunidade que deseja criar: apoiar uma entrada, pressionar uma posição ou dificultar a visão de uma passagem. Essa intenção ajuda a escolher o momento e evita jogar utilitário apenas porque o item está disponível.',
        'Este guia oferece princípios de treino e coordenação, sem prometer trajetórias universais. Versão do mapa, posição do jogador e execução alteram o resultado. Uma referência vista em vídeo precisa ser testada na instalação e no mapa em que você joga. Treinar fora de uma disputa permite observar o efeito com calma e repetir sem comprometer o round de outras pessoas.'
      ] },
      { heading: 'O lançamento precisa conversar com o avanço', paragraphs: [
        'Uma flash pode atrapalhar o próprio companheiro se ele não souber que ela vem. Avise antes, combine quem entra e espere a posição necessária. O valor do lançamento depende também de alguém estar pronto para aproveitar a janela criada. Se o time ainda está longe, gastar utilitário cedo pode deixar a execução sem apoio quando chegar a hora.',
        'A smoke também exige leitura de rota. Bloquear uma linha de visão pode facilitar um deslocamento, mas atravessar sua área sem informação continua tendo risco. Pergunte qual ameaça você pretende reduzir e qual ângulo permanece aberto. Nenhum utilitário substitui a necessidade de verificar posições ou ouvir informações do restante do time.'
      ] },
      { heading: 'Revise o resultado, não apenas a intenção', paragraphs: [
        'Depois do round, tente responder: a granada chegou ao local esperado? O companheiro estava preparado? A equipe conseguiu atravessar ou recuperar o espaço? Se o objetivo não foi alcançado, identifique onde a sequência falhou. Um lançamento tecnicamente correto pode ter pouco efeito se veio tarde, se ninguém avançou ou se a informação que motivou a ação já estava desatualizada.',
        'Para começar, escolha um uso simples em uma rota que conhece e pratique com um amigo. Alternem quem lança e quem recebe o apoio. Essa troca mostra problemas difíceis de perceber do outro lado, como visão bloqueada, aviso tardio e tempo insuficiente. Leve para a partida uma combinação que vocês conseguem repetir, em vez de uma coleção de referências que ninguém treinou. O utilitário mais valioso é o que resolve uma necessidade concreta no momento em que a equipe consegue agir.'
      ] }
    ],
    sources: [{ label: 'Steam — Counter-Strike e objetivos estratégicos', url: 'https://store.steampowered.com/app/10/CounterStrike/' }]
  },
  {
    id: 'volta-cs16', slug: 'voltar-cs16-guia-para-veteranos',
    title: 'Voltando ao 1.6? A memória fica. O ritmo a gente recupera.',
    excerpt: 'Retome os controles, encontre sua sensibilidade e volte a curtir a partida sem cobrar do primeiro round o desempenho de anos atrás.',
    category: 'Primeiros passos', readTime: '4 min', date: '2026-10-23', image: '/images/squad.webp', published: true,
    sections: [
      { heading: 'Prepare uma volta simples', paragraphs: [
        'Você lembra do som, dos mapas e daquele nickname que parecia perfeito. A mão, porém, pode demorar um pouco mais para acompanhar. Voltar ao Counter-Strike 1.6 depois de um intervalo funciona melhor quando o primeiro objetivo é recuperar familiaridade. Antes de entrar em uma partida organizada, abra o jogo e confira movimento, compra, áudio e teclas essenciais.',
        'Use uma instalação de procedência confiável e mantenha o cliente atualizado. Se encontrar arquivos ausentes ou falhas na versão Steam, a verificação de integridade é uma opção oferecida pela própria plataforma. Guarde uma cópia das configurações pessoais antes de mudanças maiores e evite começar a volta instalando uma coleção de arquivos que você não sabe o que alteram.'
      ] },
      { heading: 'Reaprenda com uma referência estável', paragraphs: [
        'Escolha uma sensibilidade confortável, ajuste o áudio e jogue algumas sessões com essas condições. Comparar cada movimento com a lembrança do passado pode levar a mudanças demais. O equipamento, o espaço disponível e até sua postura podem ser outros. A referência mais útil é a que permite jogar com controle hoje.',
        'Durante o aquecimento, observe se mantém a mira preparada e se está entrando em posições sem verificar os ângulos. São hábitos que ajudam a reorganizar a atenção. Em vez de julgar a sessão apenas pelo placar, escolha uma melhoria concreta: ouvir melhor as chamadas, reduzir avanços solitários ou lembrar uma rota que fazia parte do seu repertório.'
      ] },
      { heading: 'Encontre seu lugar no servidor', paragraphs: [
        'O 4FUN principal do MythSkill está em 131.196.198.52:27248, com opção de reserva em 177.54.152.30:27035. O MIX está em 131.196.198.33:27019. Escolha o ambiente de acordo com sua vontade de jogar naquele momento e confirme com o grupo as expectativas da partida. Você não precisa estrear sua volta carregando a responsabilidade de provar alguma coisa.',
        'Pergunte quando não conhecer uma chamada, avise que está retomando e dê espaço para aprender com outros jogadores. O clan também disponibiliza um Drive com vídeos explicativos, acessível pelo site. Para orientações sobre conexão ou solicitações de VIP, use o WhatsApp oficial informado na página. A melhor parte de voltar não precisa ser repetir exatamente o que você fazia anos atrás: pode ser encontrar novos parceiros, recuperar o prazer da disputa e perceber que ainda existe um bom motivo para dizer só mais um mapa.'
      ] }
    ],
    sources: [
      { label: 'Steam — Counter-Strike', url: 'https://store.steampowered.com/app/10/CounterStrike/' },
      { label: 'Suporte Steam — Integridade dos arquivos de jogo', url: 'https://help.steampowered.com/en/faqs/view/0C48-FCBD-DA71-93EB' }
    ]
  }
];

export function isArticlePublic(a:Article){return a.published&&!a.archived&&(!a.scheduledAt||Date.parse(a.scheduledAt)<=Date.now());}
