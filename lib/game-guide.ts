export type GameCommand = {
  command: string;
  title: string;
  description: string;
  category: 'Mira' | 'Vídeo e FPS' | 'Conexão' | 'Áudio' | 'Utilidade';
  note?: string;
};

export const gameCommands: GameCommand[] = [
  {
    command: 'sensitivity "2.0"',
    title: 'Encontre sua sensibilidade',
    description: 'Define a sensibilidade do mouse dentro do jogo. O valor 2.0 é um ponto de teste: ajuste em pequenos passos até conseguir acompanhar alvos sem perder o controle.',
    category: 'Mira',
    note: 'O resultado depende também do DPI do mouse. Não existe uma sensibilidade universal que melhore a precisão de todos os jogadores.',
  },
  {
    command: 'cl_crosshair_size "small"',
    title: 'Mira pequena',
    description: 'Escolhe o tamanho pequeno da mira clássica do CS 1.6. Compare a visibilidade em diferentes fundos antes de decidir.',
    category: 'Mira',
    note: 'O tamanho visual também varia com a resolução. Isso não altera a dispersão dos tiros.',
  },
  {
    command: 'cl_crosshair_size "medium"',
    title: 'Mira média',
    description: 'Usa o tamanho médio da mira. É uma alternativa quando a mira pequena fica difícil de enxergar.',
    category: 'Mira',
  },
  {
    command: 'cl_crosshair_size "large"',
    title: 'Mira grande',
    description: 'Aumenta a referência visual da mira. Escolha pelo conforto e contraste na sua tela, não por uma promessa de vantagem.',
    category: 'Mira',
  },
  {
    command: 'cl_dynamiccrosshair "0"',
    title: 'Reduza a variação visual da mira',
    description: 'Desliga a expansão dinâmica ligada ao movimento na mira clássica. Para reativar, use cl_dynamiccrosshair "1".',
    category: 'Mira',
    note: 'A mira ainda pode reagir aos disparos. Esse ajuste não remove recuo, não estabiliza a arma e não aumenta a precisão real.',
  },
  {
    command: 'cl_crosshair_color "50 250 50"',
    title: 'Escolha uma cor com contraste',
    description: 'Define a cor da mira por três valores RGB entre 0 e 255. Este exemplo usa verde; "255 255 255" usa branco.',
    category: 'Mira',
    note: 'Mantenha os três números entre aspas e teste o contraste nos mapas em que costuma jogar.',
  },
  {
    command: 'cl_crosshair_translucent "0"',
    title: 'Deixe a mira opaca',
    description: 'Desativa a transparência da mira para facilitar sua identificação no cenário. O valor "1" volta a habilitar a translucidez.',
    category: 'Mira',
  },
  {
    command: 'hud_fastswitch "1"',
    title: 'Troca rápida de armas',
    description: 'Habilita a seleção rápida de armas, reduzindo a necessidade de confirmar a escolha com um clique.',
    category: 'Utilidade',
    note: 'O comportamento de roda do mouse e slots pode variar entre builds do cliente. Teste em uma partida de treino.',
  },
  {
    command: 'fps_max "100"',
    title: 'Defina um limite de FPS',
    description: 'Estabelece 100 como limite solicitado de quadros por segundo, uma referência conservadora para o GoldSrc. O computador precisa conseguir sustentar esse ritmo.',
    category: 'Vídeo e FPS',
    note: 'O comando não cria desempenho extra. VSync, versão do cliente, renderizador e hardware podem influenciar o resultado.',
  },
  {
    command: 'cl_showfps "1"',
    title: 'Acompanhe os quadros por segundo',
    description: 'Exibe um contador de FPS para comparar ajustes de vídeo e perceber quedas durante a partida. Use cl_showfps "0" para esconder.',
    category: 'Vídeo e FPS',
  },
  {
    command: 'net_graph "3"',
    title: 'Veja informações da conexão',
    description: 'Mostra informações de desempenho e rede. Observe FPS, latência e indicadores como loss e choke para ajudar a identificar o problema.',
    category: 'Conexão',
    note: 'O painel é uma ferramenta de diagnóstico. Ativá-lo não reduz o ping nem corrige a conexão.',
  },
  {
    command: 'net_graph "0"',
    title: 'Oculte o painel de rede',
    description: 'Retira o net_graph da tela depois da conferência, deixando o campo de visão mais limpo.',
    category: 'Conexão',
  },
  {
    command: 'status',
    title: 'Encontre seu Steam ID ou Valve ID',
    description: 'Dentro do servidor, lista dados da sessão e dos jogadores. Localize seu nickname e copie o identificador da mesma linha para informar à administração.',
    category: 'Conexão',
    note: 'Envie o identificador correspondente ao seu próprio nick. O formato pode variar conforme o cliente e o servidor.',
  },
  {
    command: 'connect 131.196.198.52:27248',
    title: 'Entre no 4FUN da MythSkill',
    description: 'Solicita a conexão ao servidor 4FUN principal do clan pelo console. Para outro servidor, substitua o endereço pelo IP e a porta correspondentes.',
    category: 'Conexão',
  },
  {
    command: 'volume "0.5"',
    title: 'Ajuste o volume do jogo',
    description: 'Usa 0.5 como exemplo de volume para os efeitos do jogo. Comece com um nível confortável e ajuste junto ao volume do computador.',
    category: 'Áudio',
    note: 'Volume alto não é necessário para jogar bem. Evite compensar ruído do ambiente aumentando demais o fone.',
  },
  {
    command: 'voice_scale "0.7"',
    title: 'Equilibre as vozes do time',
    description: 'Ajusta o volume de recepção do chat de voz. O exemplo 0.7 ajuda a comparar as calls com os sons da partida.',
    category: 'Áudio',
    note: 'Não controla o ganho do seu microfone; serve para o áudio das vozes recebidas.',
  },
];

export const machineRequirements: {label: string; official: string; comfortable: string}[] = [
  {
    label: 'Processador',
    official: 'Mínimo histórico da página Windows: 500 MHz.',
    comfortable: 'Um processador de 2 núcleos, compatível com o sistema operacional atual, é uma referência prática para começar.',
  },
  {
    label: 'Memória RAM',
    official: 'Mínimo histórico: 96 MB de RAM.',
    comfortable: '4 GB ou mais para acomodar o Windows e o Steam. Feche aplicativos pesados enquanto joga.',
  },
  {
    label: 'Vídeo',
    official: 'Mínimo histórico: placa de vídeo com 16 MB.',
    comfortable: 'Vídeo integrado recente pode atender. Use drivers do fabricante e renderizador OpenGL funcional; reduza resolução e efeitos se houver quedas.',
  },
  {
    label: 'Sistema Windows',
    official: 'A ficha histórica cita Windows XP. Isso não representa o suporte atual do cliente Steam.',
    comfortable: 'Para o Steam atual, Windows 10 ou 11 de 64 bits. O suporte do Steam a Windows de 32 bits terminou em 1º de janeiro de 2026.',
  },
  {
    label: 'Armazenamento',
    official: 'A seção Windows da ficha consultada não especifica espaço livre em disco.',
    comfortable: 'Reserve ao menos 4 GB livres como margem para jogo e mapas adicionais. O sistema e o cliente Steam precisam de espaço próprio; SSD ajuda nos carregamentos.',
  },
  {
    label: 'Conexão e periféricos',
    official: 'Conexão à internet, mouse e teclado.',
    comfortable: 'Priorize internet estável, cabo de rede quando possível e mouse em boas condições. Ping depende também da rota até o servidor.',
  },
];

export const consoleSteps: string[] = [
  'Abra o Counter-Strike 1.6 e pressione a tecla do console, normalmente ~, perto do Esc. O layout do teclado pode mudar essa tecla.',
  'Se o console não estiver disponível na versão Steam, abra Propriedades do jogo → Geral → Opções de inicialização e adicione -console. Reinicie o jogo.',
  'Copie apenas o comando que deseja testar, cole no console e pressione Enter. Teste um ajuste por vez, de preferência em uma partida de treino.',
  'Antes de alterar uma variável, digite somente seu nome no console para consultar o valor atual e anote-o. Assim você consegue restaurar sua configuração.',
];

export const guideNote = 'Os comandos abaixo são ajustes de interface, conforto e diagnóstico para Counter-Strike 1.6. Eles não substituem treino, não eliminam recuo e não garantem mais FPS ou ping menor. A coluna “referência prática” dos requisitos é uma orientação editorial da MythSkill, não uma especificação oficial nem uma garantia de desempenho. Mapas, plugins, drivers e programas abertos mudam o resultado. Configurações e disponibilidade de comandos também podem variar entre builds do cliente.';

export const gameGuideSources: {label: string; url: string}[] = [
  {label: 'Counter-Strike na Steam — requisitos históricos e suporte do cliente', url: 'https://store.steampowered.com/app/10/CounterStrike/?l=brazilian'},
  {label: 'Suporte Steam — fim do suporte ao Windows de 32 bits', url: 'https://help.steampowered.com/pt-br/faqs/view/49A1-B944-48B8-FF00'},
  {label: 'Suporte Steam — opções de inicialização e -console', url: 'https://help.steampowered.com/en/faqs/view/7D01-D2DD-D75E-2955'},
  {label: 'Valve Developer Community — comandos e variáveis GoldSrc', url: 'https://developer.valvesoftware.com/wiki/List_of_Half-Life_console_commands_and_variables'},
  {label: 'Valve — discussão técnica sobre tamanhos da mira do CS 1.6', url: 'https://github.com/ValveSoftware/halflife/issues/3679'},
  {label: 'Valve — mira dinâmica no Counter-Strike', url: 'https://github.com/ValveSoftware/halflife/issues/2568'},
  {label: 'Valve — translucidez da mira do CS 1.6', url: 'https://github.com/ValveSoftware/halflife/issues/142'},
  {label: 'Valve — comportamento de troca rápida de armas', url: 'https://github.com/ValveSoftware/halflife/issues/200'},
];
