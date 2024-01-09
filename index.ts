import { REST, Routes, ApplicationCommandOptionType, ActivityType, AttachmentBuilder} from 'discord.js';
import { Client, GatewayIntentBits } from 'discord.js';
import { config } from "./config"
import { fetchUTCMinus4Time } from './commands/time';

const canvacord = require('canvacord');
const mongoose = require('mongoose');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

async function main() {
  
  client.on('ready', () => {
      console.log(`✅Logged in as ${client.user.tag}!🤖`);


      client.user?.setActivity({
          name: 'Chad 3.0',
          type: ActivityType.Playing,

      });
    });
    
    client.on('interactionCreate', async interaction => {
      if (!interaction.isChatInputCommand()) return;
    
      if (interaction.commandName === 'bot') {
        await interaction.reply('Soy un bot creado por Pirson!');
      }
       if(interaction.commandName === 'tiempo') {
          await interaction.deferReply({ ephemeral: false }); // Defer the reply
    
          const utcMinus4Time = await fetchUTCMinus4Time();
          await interaction.editReply(`Tiempo Actual: ${utcMinus4Time}`);
        } 
         if (interaction.commandName === 'suma' ) {
            const num1: any = interaction.options.get('first-number')?.value;
            const num2: any = interaction.options.get('second-number')?.value;

            await interaction.reply(`La suma es igual a ${num1 + num2}`)
        }
        if (interaction.commandName === 'ping') {
          
            await interaction.deferReply();
    
            const reply = await interaction.fetchReply();
    
            const ping = reply.createdTimestamp - interaction.createdTimestamp;
    
            interaction.editReply(`Ping: ${ping}ms`)
        }
        if (interaction.commandName === 'version') {
          await interaction.reply(`Chad 3.0 esta en v0.0.1(desarollo)`)
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
    name: 'suma',
    description: 'suma dos numeros',
    options: [
      {
        name: 'first-number',
        description: 'primer numero',
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: 'second-number',
        description: 'segundo numero',
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ]
  },
  {
    name: 'ping',
    description: 'Responde con la latencia del bot',
  },
  {
    name: 'version',
    description: 'Version del Bot',
  }
];

const rest = new REST({ version: '10' }).setToken(config.TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(config.CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}

