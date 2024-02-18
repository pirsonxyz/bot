import { REST, Routes, ActivityType } from "discord.js";
import { Client, GatewayIntentBits } from "discord.js";
import { config } from "./config";
import { commands } from "./register-commands";
import { fetchUTCMinus4Time } from "./commands/time";
import { coinFlip } from "./commands/moneda";
import { getRandomSize } from "./commands/size";
import { logUserActivity } from "./utils/log_user";
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

async function main() {
  client.on("ready", () => {
    console.log(`✅Logged in as ${client.user.tag}!🤖`);
    console.log(`🛠️Currently in ${client.guilds.cache.size} servers!`)

    client.user?.setActivity({
      name: "/evangelio",
      type: ActivityType.Playing,
    });
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    const command_name = interaction.commandName;
    logUserActivity(command_name, interaction.user);

    if (!interaction.isChatInputCommand()) return;

    switch (interaction.commandName) {
      case "bot":
        await interaction.reply("Soy un bot creado por Pirson!");
        break;

      case "tiempo":
        await interaction.deferReply({ ephemeral: false });
        const utcMinus4Time = await fetchUTCMinus4Time();
        await interaction.editReply(`Tiempo Actual: ${utcMinus4Time}`);
        break;
      case "ping":
        await interaction.deferReply();
        const reply = await interaction.fetchReply();
        const ping = reply.createdTimestamp - interaction.createdTimestamp;
        interaction.editReply(`Ping: ${ping}ms`);
        break;

      case "version":
        await interaction.reply(`EL LIDER esta en version v0.0.1(desarollo)`);
        break;

      case "moneda":
        const flip = coinFlip();
        await interaction.reply(`🪙${flip}`);
        break;
      case "evangelio":
        interface Lectura {
          [fecha: string]: string; // La clave es la fecha, el valor es el texto
        }
        const lecturas: { lecturas: Lectura[] } = require("./lecturas.json");
        await interaction.reply(
          `**Evangelio del 12 de febrero**: ${lecturas.lecturas[0]["12_de_febrero"]}`
        );
        break;
      case "lider":
        await interaction.reply(
          `**VIDEOS MAS VACANOS DE EL LIDER**\n[LIDER EN CONTRA DE JONATHAN PINA](https://www.youtube.com/watch?v=TOnSJLAIu1A&t=1477s)\n[LIDER EN ALOFOKE](https://www.youtube.com/watch?v=VelUopf26Og&t=346s)\n[LAS FUNCIONES DE LOS DIACONOS](https://www.youtube.com/watch?v=Hl7Hczrvr9Y)\n[LA IGLESIA PERDIO](https://www.youtube.com/watch?v=mnb9e4n6O8o)\n[EL LIDER EN CONTRA DE WENDI Y ESTEFANIA](https://www.youtube.com/watch?v=W7v6zigzI8M)`
        );
        break;
      case "acortar":
        const url: any = interaction.options.getString("url");
        const apiUrl = `https://ulvis.net/api.php?url=${encodeURIComponent(
          url
        )}`;

        try {
          const response = await fetch(apiUrl);

          if (!response.ok) {
            throw new Error(`Failed to shorten URL: ${response.statusText}`);
          }

          const shortenedUrl = await response.text();

          await interaction.reply(`**URL acortada**: ${shortenedUrl}`);
        } catch (error) {
          console.error(error);
          await interaction.reply("There was an error shortening the URL.");
        }
        break;
      case "tamaño":
        const size = getRandomSize(30);
        await interaction.reply(`Te mide **${size}** centimetros!`);
        break;
      case "nba":
        // Define a TypeScript interface to represent the game data
        interface Game {
          away_team: string;
          away_score: number;
          home_team: string;
          home_score: number;
          game_time: string;
        }

        // Make a GET request to the Flask server
        fetch("http://127.0.0.1:6969/games")
          .then((response) => {
            // Check if the response is successful
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            // Parse JSON response
            return response.json();
          })
          .then((data: Game[]) => {
            // Process the data and concatenate replies into a single message
            let replyMessage = "**JUEGOS NBA**\n";
            data.forEach((game) => {
              replyMessage += `${game.away_team} **${game.away_score}** - ${game.home_team} **${game.home_score}** ***(${game.game_time})***\n`;
            });
            // Send the concatenated message as a single reply
            interaction.reply(replyMessage);
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
          });

      default:
        break;
    }
  });

  client.login(config.TOKEN);
}

main();

const rest = new REST({ version: "10" }).setToken(config.TOKEN);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands(config.CLIENT_ID), {
    body: commands,
  });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}
