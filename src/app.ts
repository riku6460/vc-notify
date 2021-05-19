import {readFileSync} from 'fs';
import {Client, TextChannel} from 'discord.js';

const config = JSON.parse(readFileSync('config.json', 'utf-8'));
const client = new Client();

client.on('voiceStateUpdate', async (oldState, newState) => {
  if (newState.channelID !== null && config.mappings[newState.channelID]) {
    const channel = <TextChannel>await client.channels.fetch(config.mappings[newState.channelID], true, false);
    await channel.send(`${newState.member?.displayName} さんが入室しました。`);
  }
  if (oldState.channelID !== null && config.mappings[oldState.channelID]) {
    const channel = <TextChannel>await client.channels.fetch(config.mappings[oldState.channelID], true, false);
    await channel.send(`${newState.member?.displayName} さんが退出しました。`);
  }
});

client.login(config.token);
