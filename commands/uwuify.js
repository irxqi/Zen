module.exports = {
	data: {
	  name: 'uwuify',
	  description: 'Converts certain patterns to "uwu".',
	  options: [
		{
		  name: 'text',
		  description: 'The text',
		  type: 3,
		  required: true,
		},
	  ],
	},
	async execute(interaction) {
	  // Get the user's message
	  const userMessage = interaction.options.getString('text');
  
	  // Define the patterns to replace with "uwu"
	  const patternsToReplace = ['ou', 'oo', 'll', 'pp', 'ea'];
  
	  // Replace specified patterns with "uwu"
	  let uwuifiedMessage = userMessage;
	  patternsToReplace.forEach((pattern) => {
		const regex = new RegExp(pattern, 'gi');
		uwuifiedMessage = uwuifiedMessage.replace(regex, 'uwu');
	  });
  
	  // Reply with the uwuified message
	  await interaction.reply(`UwUified Message: \`${uwuifiedMessage}\``);
	},
  };
  