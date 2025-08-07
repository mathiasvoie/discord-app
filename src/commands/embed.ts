import { EmbedBuilder } from '@discordjs/builders';
import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
  metadata: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Replies with an embedded message.'),

  execute: async (interaction: CommandInteraction) => {
    const embed = new EmbedBuilder()
      .setTitle('Hello World')
      .setDescription('This is an embedded message.');

    await interaction.reply({ embeds: [embed] });
  },
};
