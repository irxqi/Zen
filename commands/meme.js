const axios = require('axios');
const Filter = require('bad-words');
const { EmbedBuilder } = require('discord.js'); // Changed from EmbedBuilder to MessageEmbed

const filter = new Filter();

async function getRandomMeme(apiUrl = 'https://www.reddit.com/r/meme.json') {
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'User-agent': 'Mozilla/5.0'
            }
        });

        const data = response.data;
        if (data && data.data && data.data.children && data.data.children.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.data.children.length);
            const randomMeme = data.data.children[randomIndex].data;

            const title = filter.clean(randomMeme.title); // Filter out bad words from the title
            const imageUrl = randomMeme.url;

            return { title, imageUrl };
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error fetching meme: ${error.message}`);
        return null;
    }
}

module.exports = {
    data: {
        name: 'meme',
        description: 'Get a random meme!',
    },
    async execute(interaction) {
        try {
            // Acknowledge the interaction to avoid "Unknown interaction" error
            await interaction.deferReply();

            // Call the getRandomMeme function to get a random meme
            const randomMeme = await getRandomMeme();

            if (randomMeme) {
                // If a random meme is fetched, create an embed and reply with it
                const memeEmbed = new EmbedBuilder()
                    .setColor(0xb3baca)
                    .setTitle(randomMeme.title)
                    .setImage(randomMeme.imageUrl);

                await interaction.editReply({ embeds: [memeEmbed] });
            } else {
                // If unable to fetch a random meme, reply with an error message
                await interaction.editReply('Unable to fetch a random meme.');
            }
        } catch (error) {
            console.error(`Error handling interaction: ${error.message}`);
        }
    },
};
