const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'meme-create',
    description: 'Generate a Meme!',
    options: [
      {
        name: 'type',
        description: 'Choose the type of meme',
        type: 3, // STRING type
        required: true,
        choices: [
          {
            name: 'buttons',
            value: 'buttons',
          },
          {
            name: 'cat',
            value: 'cat',
          },
          {
            name: 'Uno Draw 25',
            value: 'uno-draw',
          },
          {
            name: 'Buff Dog',
            value: 'buff-dog',
          },
          {
            name: 'This is Better',
            value: 'drake',
          },
        ],
      },
      {
        name: 'first-text',
        description: 'The first text',
        type: 3, // STRING type
        required: true,
      },
      {
        name: 'second-text',
        description: 'The second text',
        type: 3, // STRING type
        required: true,
      },
    ],
  },
  async execute(interaction) {
    const memeType = interaction.options.getString('type');
    const username = process.env.imgname;
    const password = process.env.imgpswd;
    const apiUrl = 'https://api.imgflip.com/caption_image';
    let templateId, text0, text1;

    if (memeType === 'buttons') {
      templateId = '87743020';
      text0 = interaction.options.getString('first-text').substring(0, 35);
      text1 = interaction.options.getString('second-text').substring(0, 35);
    } else if (memeType === 'cat') {
      templateId = '188390779';
      text0 = interaction.options.getString('first-text').substring(0, 35);
      text1 = interaction.options.getString('second-text').substring(0, 35);
    } else if (memeType === 'uno-draw') {
      templateId = '217743513';
      text0 = interaction.options.getString('first-text').substring(0, 35);
      text1 = interaction.options.getString('second-text').substring(0, 35);
    } else if (memeType === 'buff-dog') {
      templateId = '247375501';
      text0 = interaction.options.getString('first-text').substring(0, 35);
      text1 = interaction.options.getString('second-text').substring(0, 35);
    } else if (memeType === 'drake') {
      templateId = '181913649';
      text0 = interaction.options.getString('first-text').substring(0, 35);
      text1 = interaction.options.getString('second-text').substring(0, 35);
    } else {
      interaction.reply('Invalid meme type.');
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
          .setColor(0xb3baca)
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
