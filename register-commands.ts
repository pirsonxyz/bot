import { ApplicationCommandOptionType } from "discord.js";

export const commands = [
    {
    name: 'nba',
    description: 'responde con los juegos vivos de la nba',
    },
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
    {
      name:'acortar',
      description:'acorta una url',
      options: [
        {
          name: 'url',
          description: 'url a acortar',
          type: ApplicationCommandOptionType.String,
          required: true,
        }
      ]
    },
    {
      name:'tamaño',
      description:'te dice el tamaño de tu miembro!'
    },
  ];