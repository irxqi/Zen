const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: {
    name: 'wiki-random',
    description: 'Get a Random fact from the wiki',
  },
  async execute(interaction) {
    try {
      let imageUrl = null;
      let title, text;

      while (!imageUrl) {
        // Step 1: Fetch a random Wikipedia article title
        const randomTitleResponse = await axios.get('https://en.wikipedia.org/w/api.php', {
          params: {
            action: 'query',
            format: 'json',
            list: 'random',
            rnnamespace: 0, // 0 represents the main/regular namespace
            rnlimit: 1,
          },
        });

        const randomArticle = randomTitleResponse.data.query.random[0];
        title = randomArticle.title;

        // Step 2: Fetch the content of the random article
        const articleContentResponse = await axios.get('https://en.wikipedia.org/w/api.php', {
          params: {
            action: 'query',
            format: 'json',
            prop: 'extracts|pageimages',
            exintro: true, // Get only the introduction section
            explaintext: true, // Get plain text without HTML
            titles: title,
            pithumbsize: 300, // Set the thumbnail size for the image
          },
        });

        const page = Object.values(articleContentResponse.data.query.pages)[0];
        text = page.extract;
        imageUrl = page.thumbnail ? page.thumbnail.source : null;
      }

      // Create Discord embed
      const wikiEmbed = new EmbedBuilder()
        .setColor(0xb3baca)
        .setTitle(title)
        .setDescription(text)
        .setThumbnail(imageUrl);

      // Reply with the embed
      await interaction.reply({ embeds: [wikiEmbed] });

    } catch (error) {
      console.error('Error fetching random fact:', error.message);
      // Handle the error or reply with an error message to the Discord interaction
      await interaction.reply('Error fetching random fact. Please try again later.');
    }
  },
};
