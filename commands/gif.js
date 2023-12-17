const axios = require('axios');

module.exports = {
  data: {
    name: 'gif',
    description: 'Find a GIF!',
    options: [
      {
        name: 'text',
        description: 'Text parameter for the GIF search',
        type: 3, // STRING type
        required: true,
      },
    ],
  },
  async execute(interaction) {
    // Replace 'YOUR_API_KEY' with your actual Tenor API key
    const API_KEY = 'LIVDSRZULELA';
    const API_URL = 'https://api.tenor.com/v1/search';

    // Access the value of the 'text' parameter
    const searchText = interaction.options.getString('text');

    // Now you can use the 'searchText' variable in your command logic
    await interaction.reply(`Searching for a GIF with prompt: ${searchText}`);

    async function getMeme(memename, limit = 30) {
      try {
        const response = await axios.get(API_URL, {
          params: {
            key: API_KEY,
            q: memename, // You can customize the search query
            limit: limit,   // Limit the result to 30 images
          },
        });

        const results = response.data.results;
        if (results.length === 0) {
          throw new Error('No results found.');
        }

        const randomIndex = Math.floor(Math.random() * results.length);
        const memeUrl = results[randomIndex].media[0].gif.url;
        return memeUrl; // Return the URL to be used later
      } catch (error) {
        console.error('Error fetching meme:', error.message);
        throw error; // Re-throw the error to handle it outside
      }
    }

    try {
      const tenormeme = await getMeme(searchText, 30);
      await interaction.followUp(tenormeme);
    } catch (error) {
      // Handle the error, e.g., send an error message
      console.error('Error in execute:', error.message);
      await interaction.followUp('Error fetching meme. Please try again later.');
    }
  },
};
