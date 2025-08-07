import { GatewayIntentBits } from 'discord.js';
import { Client } from './classes/client';

export const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  presence: {
    activities: [{ name: 'This is the activity of the application' }],
    status: 'online',
  },
});
