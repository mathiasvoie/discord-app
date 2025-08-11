import { Config } from '../config';

import { Client as DiscordClient } from 'discord.js';
export class Client extends DiscordClient {
  async signIn() {
    return await this.login(Config.applicationToken);
  }
}
