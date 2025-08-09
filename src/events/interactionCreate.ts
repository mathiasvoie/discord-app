import { client } from '../client';

client.on('interactionCreate', async (interaction) => {
  // THIS IS JUST AN EXAMPLE OF HOW TO HANDLE INTERACTIONS
  if (interaction.isButton()) {
    const buttonId = interaction.customId;

    if (buttonId === 'my_button') {
      await interaction.reply({
        content: 'You clicked the example button!',
        flags: 64,
      });
    }
  }

  // THIS IS AN AUTOMATIC COMMAND HANDLER - DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING
  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);

    if (!command) {
      await interaction.reply({
        content: 'This command does not exist.',
        flags: 64,
      });
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error('Error executing command:', error);
      await interaction.reply({
        content: 'There was an error while executing this command.',
        flags: 64,
      });
    }
  }
});
