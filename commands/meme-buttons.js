const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'meme-buttons',
    description: 'Send a Meme!',
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
  async execute(interaction) {
    const username = process.env.imgname;
    const password = process.env.imgpswd;
    const apiUrl = 'https://api.imgflip.com/caption_image';
    const templateId = '87743020';

    const firstbutton = interaction.options.getString('first-button');
    const secondbutton = interaction.options.getString('second-button');
    const text0 = firstbutton.substring(0, 25);
    const text1 = secondbutton.substring(0, 25);

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
