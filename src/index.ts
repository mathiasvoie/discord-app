import { client } from './client';

await client.authenticate().then(async () => {
  client.registerCommands().then(() => {
    console.log('[✅] Commands registered successfully.');
  });
  client.registerEvents().then(() => {
    console.log('[✅] Events registered successfully.');
  });
});
