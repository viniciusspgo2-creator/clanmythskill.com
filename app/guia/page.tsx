import {PlayerGuide} from '@/components/player-guide';
import {getContent} from '@/lib/cms';
export const metadata={title:'Guia do Player — requisitos e comandos do CS 1.6',description:'Requisitos históricos e orientações práticas de hardware, comandos de mira, FPS, conexão e áudio para jogar Counter-Strike 1.6 na MythSkill.'};
export default async function Page(){const {settings}=await getContent();return <PlayerGuide settings={settings}/>}
