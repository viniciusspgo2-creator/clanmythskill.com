export type Server = {name:string; label:string; ip:string; description:string; image:string};
export type Settings = {
 heroLine1:string; heroLine2:string; heroLine3:string; heroDescription:string; aboutTitle:string; aboutStory:string; vipPrice:number; vipDays:number; pixKey:string; pixImage:string; whatsapp:string; instagram:string; drive:string; videoId:string; videoStart:number; heroImage:string; squadImage:string; arsenalImage:string; socialImage:string; seoTitle:string; seoDescription:string; servers:Server[];
};
export const defaults:Settings = {
 heroLine1:'A LENDA',heroLine2:'NUNCA',heroLine3:'DESCONECTA.',heroDescription:'O som do round começando. A call no momento certo. A resenha que vai além do placar. Seu próximo GG tem endereço: MythSkill.',
 aboutTitle:'O jogo é clássico. A conexão é de verdade.',aboutStory:'A MythSkill nasceu do tipo de encontro que só o Counter-Strike proporciona: jogadores que entram por uma partida e acabam voltando pela companhia. Entre uma troca de mapa e outra, a resenha virou amizade — e a amizade virou clan.\n\nNossa ideia sempre foi simples: ter um lugar para abrir o 1.6, encontrar a galera e jogar do nosso jeito. O 4FUN recebe quem quer curtir cada round; o MIX reúne quem prefere alinhar a estratégia e buscar a vitória em equipe.\n\nNão precisamos de uma história impossível para explicar o que nos move. Basta aquela vontade de dizer “só mais uma” quando a partida termina. É esse espírito que queremos manter vivo, com respeito entre os players e espaço para novas amizades.',
 vipPrice:5,vipDays:30,pixImage:'/images/pix-original.png',pixKey:'vip.mythskill@gmail.com',whatsapp:'5512996706509',instagram:'https://www.instagram.com/clanmythskill/',drive:'https://drive.google.com/drive/folders/1saQW9XWZlVyHeXpjer7jL2dakmZD2ENz?usp=drive_link',videoId:'8XxzRvILdOc',videoStart:93,heroImage:'/images/hero.webp',squadImage:'/images/squad.webp',arsenalImage:'/images/arsenal.webp',socialImage:'/images/mythskill-social-v2.jpg',seoTitle:'Clan MythSkill | Counter-Strike 1.6, 4FUN, MIX e VIP',seoDescription:'O clássico continua na MythSkill. Conecte aos nossos servidores de Counter-Strike 1.6, conheça o clan e solicite seu VIP por R$ 5,00.',
 servers:[
 {name:'4FUN',label:'O PONTO DE ENCONTRO',ip:'131.196.198.52:27248',description:'Entre para jogar, fique pela resenha. O clássico que faz qualquer dia terminar em mais um round.',image:'/images/4fun-operator.webp'},
 {name:'4FUN RESERVA',label:'MAIS UM CAMINHO PRO JOGO',ip:'177.54.152.30:27035',description:'Seu endereço alternativo para continuar no 1.6. Adicione aos favoritos e tenha sempre à mão.',image:'/images/classic.webp'},
 {name:'MIX',label:'A CALL É JOGAR JUNTO',ip:'131.196.198.33:27019',description:'Mira preparada, comunicação na medida e objetivo em equipe. Reúna o time e entre no ritmo do MIX.',image:'/images/fire.webp'},
 ]
};
export function money(value:number){return value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});}
export function waLink(phone:string,text='Fala, MythSkill! Vim pelo site e queria conversar com o clan.'){return `https://wa.me/${phone.replace(/\D/g,'')}?text=${encodeURIComponent(text)}`;}

export function mergeSiteSettings(saved:Partial<Settings>={}):Settings{
 const settings={...defaults,...saved,servers:(saved.servers||defaults.servers).map(server=>({...server}))};
 if(settings.servers[0]?.image==='/images/dust.webp')settings.servers[0].image='/images/4fun-operator.webp';
 return settings;
}
