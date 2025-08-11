import { client } from './client';

(() => {
  client.signIn().then(() => {
    client.on('ready', () => {
      console.log(
        `[ ✅ ] Signed in as ${client?.user?.tag || 'Unknown User'}!`,
      );
    });
  });
})();
