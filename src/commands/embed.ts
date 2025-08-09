import { ButtonBuilder, EmbedBuilder } from '@discordjs/builders';

import {
  ActionRowBuilder,
  ButtonStyle,
  CommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';

module.exports = {
  metadata: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Replies with an embedded message.'),

  execute: async (interaction: CommandInteraction) => {
    const exampleEmbed = new EmbedBuilder()
      .setTitle('Example Embed')
      .setDescription('This is an example embed with a button.')
      .setColor(0x0099ff); // Blue color

    // Create a button
    // If you want to handle the click you need to make a client.on handler for interactionCreate.
    const exampleButton = new ButtonBuilder()
      .setCustomId('my_button')
      .setLabel('Click Me!')
      .setStyle(ButtonStyle.Primary);

    // Create an action row and add the button
    const row = new ActionRowBuilder().addComponents(exampleButton);

    await interaction.reply({
      embeds: [exampleEmbed.toJSON()],
      components: [row.toJSON()],
    });
  },
};
