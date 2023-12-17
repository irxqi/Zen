module.exports = {
    data: {
        name: 'info',
        description: 'Get info from this uer',
        options: [
            {
                name: 'user',
                description: 'Mention a user',
                type: 6,
                required: true,
            },
        ],
    },
    async execute(interaction) {
        const user = interaction.options.getUser('user');

        // Calculate account age
        const accountAge = new Date() - user.createdAt;
        const daysSinceCreation = accountAge / (1000 * 60 * 60 * 24);
        const yearsSinceCreation = (daysSinceCreation / 365).toFixed(1);

        await interaction.reply(`Name: ${user.username}\nAccount Age: ${yearsSinceCreation} years`);
    },
};
