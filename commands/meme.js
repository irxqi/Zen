const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'meme',
    description: 'Generate a Meme!',
    options: [
      {
        name: 'buttons',
        description: 'Generate a meme with buttons',
        type: 1,
        options: [
          {
            name: 'first-button',
            description: 'Give something to put',
            type: 3, // STRING type
            required: true,
          },
          {
            name: 'second-button',
            description: 'Give something to put',
            type: 3, // STRING type
            required: true,
          },
        ],
      },
      {
        name: 'cat',
        description: 'Generate a meme with a cat',
        type: 1,
        options: [
          {
            name: 'first-text',
            description: 'What the woman says',
            type: 3, // STRING type
            required: true,
          },
          {
            name: 'second-text',
            description: 'what the cat says',
            type: 3, // STRING type
            required: true,
          },
        ],
      },
    ],
  },
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    const username = process.env.imgname;
    const password = process.env.imgpswd;
    const apiUrl = 'https://api.imgflip.com/caption_image';
    let templateId, text0, text1;

    if (subcommand === 'buttons') {
      templateId = '87743020';
      text0 = interaction.options.getString('first-button').substring(0, 35);
      text1 = interaction.options.getString('second-button').substring(0, 35);
    } else if (subcommand === 'cat') {
      templateId = '188390779';
      text0 = interaction.options.getString('first-text').substring(0, 35);
      text1 = interaction.options.getString('second-text').substring(0, 35);
    } else {
      interaction.reply('Invalid subcommand.');
      return;
    }

    const params = {
      template_id: templateId,
      username: username,
      password: password,
      text0: text0,
      text1: text1,
    };

    try {
      const response = await axios.post(apiUrl, null, { params });
      const data = response.data;

      if (data.success) {
        const memeUrl = data.data.url;

        const exampleEmbed = new EmbedBuilder()
          .setColor(0xcc2458)
          .setImage(memeUrl);

        interaction.reply({ embeds: [exampleEmbed] });
      } else {
        interaction.reply(`Error: ${data.error_message}`);
      }
    } catch (error) {
      interaction.reply('Error making API request: ' + error.message);
    }
  },
};
