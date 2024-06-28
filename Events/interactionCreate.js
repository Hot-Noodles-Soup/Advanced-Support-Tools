const client = require('../index')


client.on('interactionCreate', async (interaction) => {
  // Slash Command Handling

  console.log("Interaction detected");

  /* Modal Handling */
  if (interaction.isModalSubmit()) {
  
  }
  /* Button Handling */
  if (interaction.isButton()) {
    //await interaction.deferReply({ ephemeral: false }).catch(() => { });
    
  }

  /* Command Handling */
  if (interaction.isCommand()) {
  
  }
});
