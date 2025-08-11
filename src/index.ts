import { client } from './client';

(async () => {
  await client.authenticate().then(async () => {
    client.registerCommands().then(() => {
      console.log('[✅] Commands registered successfully.');
    });
    client.registerEvents().then(() => {
      console.log('[✅] Events registered successfully.');
    });
  });
})();
