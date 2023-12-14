module.exports = {
	data: {
		name: 'ping',
		description: 'Ping!',
	},
	async execute(interaction) {
		const start = Date.now();
		await interaction.reply('Pong!');
		const end = Date.now();
		const latency = end - start;
		await interaction.followUp(`Latency: ${latency}ms`);
	},
};