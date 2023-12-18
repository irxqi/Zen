const axios = require('axios');
module.exports = {
	data: {
		name: 'dad-joke',
		description: 'Gives You a random Dad Joke!',
	},
	async execute(interaction) {
        
        const url = 'https://icanhazdadjoke.com/';
        const headers = {
        'Accept': 'text/plain',
        };

        axios.get(url, { headers })
        .then(response => {
            interaction.reply(response.data);
        })
        .catch(error => {
            interaction.reply('Error:', error.message);
        });


	},
};