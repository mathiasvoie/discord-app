import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
  metadata: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

  execute: async (interaction: CommandInteraction) => {
    await interaction.reply('Pong!');
  },
};
