import fs from 'fs';
import {
  ApplicationCommandDataResolvable,
  Collection,
  CommandInteraction,
  Client as DiscordClient,
  REST,
  Routes,
} from 'discord.js';
import { Config } from '../Config';

interface CommandType {
  metadata: ApplicationCommandDataResolvable;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

export class Client extends DiscordClient {
  public commands: Collection<string, CommandType> = new Collection();
  public rest: REST;

  constructor(...args: ConstructorParameters<typeof DiscordClient>) {
    super(...args);

    if (!Config.applicationToken) {
      throw new Error('[❌] Application token is not provided in the config.');
    }

    this.rest = new REST().setToken(Config.applicationToken);
  }

  public async authenticate() {
    if (!Config?.applicationToken) {
      throw new Error('[❌] Application token is not provided in the config.');
    }

    try {
      await this.login(Config?.applicationToken).then(() => {
        const id = this.user?.id ?? 'Unknown ID';
        const name = this.user?.displayName ?? 'Unknown User';

        console.log(`\n[✅] Successfully signed into ${name} (${id})!\n`);
      });
    } catch (error) {
      throw new Error(`[❌] Failed to sign into application: ${error.message}`);
    }
  }

  public async registerEvents() {
    const files = fs.readdirSync('src/events');

    files.map(async (file) => {
      await import(`../events/${file}`);
    });
  }

  public async registerCommands() {
    if (!this?.application?.id) {
      throw new Error(
        '[❌] Application ID is not available. Ensure the client is authenticated before registering commands.',
      );
    }

    const files = fs.readdirSync('src/commands');

    const commands: ApplicationCommandDataResolvable[] = await Promise.all(
      files.map(async (file) => {
        const command = await import(`../commands/${file}`);

        this.commands.set(command.default.metadata.name, command.default);

        return command?.default?.metadata;
      }),
    );

    try {
      await this.rest.put(Routes.applicationCommands(this.application.id), {
        body: commands,
      });
    } catch (error) {
      console.error(`[❌] Failed to register commands: ${error.message}`);
    }
  }
}
