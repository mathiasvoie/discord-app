import { client } from '../client';

client.on('interactionCreate', async (interaction) => {
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
