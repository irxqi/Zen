const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: {
    name: 'wiki',
    description: 'Get information from Wikipedia',
    options: [
      {
        name: 'search',
        type: 3, // Use 3 for STRING type
        description: 'The search term to look up on Wikipedia',
        required: true,
      },
    ],
  },
  async execute(interaction) {
    try {
      const searchQuery = interaction.options.getString('search');

      // Fetch information based on the user-provided search term
      const searchResponse = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          format: 'json',
          prop: 'extracts|pageimages',
          exintro: true,
          explaintext: true,
          titles: searchQuery,
          pithumbsize: 400, // Adjust the thumbnail size as needed
        },
      });

      const page = Object.values(searchResponse.data.query.pages)[0];
      if (!page) {
        await interaction.reply(`No results found for "${searchQuery}" on Wikipedia.`);
        return;
      }

      const title = page.title;
      const text = page.extract;
      const imageUrl = page.thumbnail ? page.thumbnail.source : null;

      // Create Discord embed
      const wikiEmbed = new EmbedBuilder()
        .setColor(0xb3baca)
        .setTitle(title)
        .setDescription(text)
        .setThumbnail(imageUrl);

      // Reply with the embed
      await interaction.reply({ embeds: [wikiEmbed] });

    } catch (error) {
      console.error('Error fetching information from Wikipedia:', error.message);
      // Handle the error or reply with an error message to the Discord interaction
      await interaction.reply('Error fetching information from Wikipedia. Please try again later.');
    }
  },
};
