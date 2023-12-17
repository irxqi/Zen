const { REST, Routes, Client, GatewayIntentBits, ButtonBuilder, ActionRowBuilder, EmbedBuilder, SlashCommandBuilder, ButtonStyle, Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActivityType, Collection} = require('discord.js');
const fs = require('fs');


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});


require('dotenv').config();


const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command.data && command.data.name) {
    commands.push(command.data);
  } else {
    console.warn(`Skipping invalid command file: ${file}`);
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('====Started refreshing application (/) commands====');

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log('====Successfully reloaded application (/) commands=');
  } catch (error) {
    console.error(error);
  }
})();
const asciname = `
_  _  _  _  _  _  _  _  _  _  _  _  _  _  _  _ 
|_||_||_||_||_||_||_||_||_||_||_||_||_||_||_||_|
|_|                                          |_|
|_|███████╗███████╗███╗   ██╗    ██╗ ██████╗ |_|
|_|╚══███╔╝██╔════╝████╗  ██║    ██║██╔═══██╗|_|
|_|  ███╔╝ █████╗  ██╔██╗ ██║    ██║██║   ██║|_|
|_| ███╔╝  ██╔══╝  ██║╚██╗██║    ██║██║▄▄ ██║|_|
|_|███████╗███████╗██║ ╚████║    ██║╚██████╔╝|_|
|_|╚══════╝╚══════╝╚═╝  ╚═══╝    ╚═╝ ╚══▀▀═╝ |_|
|_| _  _  _  _  _  _  _  _  _  _  _  _  _  _ |_|
|_||_||_||_||_||_||_||_||_||_||_||_||_||_||_||_|
`
client.once('ready', () => {
  console.log(asciname);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
  
    const { commandName } = interaction;
  
    try {
      const command = require(`./commands/${commandName}.js`);
      if (command && command.execute) {
        await command.execute(interaction);
      }
    } catch (error) {
      console.error(error);
      await interaction.reply('An error occurred while executing the command.');
    }
});

const prefix = '-'

client.on('messageCreate', (message) => {
    if ( message.content == `${prefix}ping` ) {
        const Latency = Date.now() - message.createdTimestamp;
        message.reply(`PONG! The latency is ${Latency}ms`)
    }

});




client.login(process.env.token);