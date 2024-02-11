import { REST, Routes, ApplicationCommandOptionType, ActivityType, AttachmentBuilder, EmbedBuilder} from 'discord.js';
import { Client, GatewayIntentBits } from 'discord.js';
import { config } from "./config"
import { fetchUTCMinus4Time } from './commands/time';
import { coinFlip } from './commands/moneda'

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

async function main() {
  client.on('ready', () => {
      console.log(`✅Logged in as ${client.user.tag}!🤖`);


      client.user?.setActivity({
          name: '/evangelio',
          type: ActivityType.Playing,

      });
    });
    
    client.on('interactionCreate', async interaction => {
      if (!interaction.isChatInputCommand()) return;
    
      switch (interaction.commandName) {
        case 'bot':
          await interaction.reply('Soy un bot creado por Pirson!');
          break;
      
        case 'tiempo':
          await interaction.deferReply({ ephemeral: false });
          const utcMinus4Time = await fetchUTCMinus4Time();
          await interaction.editReply(`Tiempo Actual: ${utcMinus4Time}`);
          break;
        case 'ping':
          await interaction.deferReply();
          const reply = await interaction.fetchReply();
          const ping = reply.createdTimestamp - interaction.createdTimestamp;
          interaction.editReply(`Ping: ${ping}ms`);
          break;
      
        case 'version':
          await interaction.reply(`Evangelio en v0.0.1(desarollo)`);
          break;
      
        case 'moneda':
          const flip = coinFlip();
          await interaction.reply(`🪙${flip}`);
          break;
        case 'evangelio':
          interface Lectura {
            [fecha: string]: string; // La clave es la fecha, el valor es el texto
        }
        const lecturas: { lecturas: Lectura[] } = require('./lecturas.json');
          await interaction.reply(`Evangelio del 10 de febrero: ${lecturas.lecturas[0]["10_de_febrero"]}`);
          break;
        case 'lider':
          await interaction.reply(`**VIDEOS MAS VACANOS DE EL LIDER**\n[LIDER EN CONTRA DE JONATHAN PINA](https://www.youtube.com/watch?v=TOnSJLAIu1A&t=1477s)\n[LIDER EN ALOFOKE](https://www.youtube.com/watch?v=VelUopf26Og&t=346s)\n[LAS FUNCIONES DE LOS DIACONOS](https://www.youtube.com/watch?v=Hl7Hczrvr9Y)\n[LA IGLESIA PERDIO](https://www.youtube.com/watch?v=mnb9e4n6O8o)\n[EL LIDER EN CONTRA DE WENDI Y ESTEFANIA](https://www.youtube.com/watch?v=W7v6zigzI8M)`)
          break;
        default:
          break;
      }
        
    });
    
    client.login(config.TOKEN);
    
}


main();


const commands = [
  {
    name: 'bot',
    description: 'Responde con informacion sobre el bot',
  },
  {
    name: 'tiempo',
    description: 'Te dice el tiempo',
  },
  {
    name: 'evangelio',
    description: 'evangelio del dia!'
  },
  {
    name: 'ping',
    description: 'Responde con la latencia del bot',
  },
  {
    name: 'version',
    description: 'Version del Bot',
  },
  {
    name:'moneda',
    description: 'Tira una moneda',
  },
  {
    name:'lider',
    description:'videos mas vacanos del lider'
  },
];

const rest = new REST({ version: '10' }).setToken(config.TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(config.CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}