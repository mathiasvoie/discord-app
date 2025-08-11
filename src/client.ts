import { GatewayIntentBits } from 'discord.js';
import { Client } from './classes/client';

export const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  presence: {
    activities: [{ name: '🌱 Powered by Seedle' }],
    status: 'online',
  },
});
