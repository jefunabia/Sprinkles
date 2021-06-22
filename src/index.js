import Discord from 'discord.js';
import {
  BOSS_DATA_DIRECTORY,
  BOT_NAME,
  commands,
  DEFAULT_COMMAND_PREFIX,
  events,
  timers,
} from './globals/constants';
import * as commandManager from './util/commandManager';
import { convertToTimestamp, getCurrentTime, readFile, writeFile } from './util/common';
import { createMvpReminderEmbed } from './util/embed';
import { messages } from './globals/messages';

// Instantiate Discord Client
const discordClient = new Discord.Client();

// Variables
const reminderChannels = [];
const bossList = readFile(BOSS_DATA_DIRECTORY);

// ON READY
const onReady = () => {
  commandManager.loadCommands(discordClient).then(onLoad);
};

// ON LOAD
const onLoad = () => {
  initiateTimerChecking();
  console.log(`${BOT_NAME} is online!`);
};

const initiateTimerChecking = () => {
  setInterval(checkMvpTimers, timers.MVP_CHECKING);
  setInterval(saveBossList, timers.BOSS_LIST_SAVING);
};

const saveBossList = () => {
  writeFile(BOSS_DATA_DIRECTORY, bossList);
};

const checkMvpTimers = () => {
  const checkIfMvpIsSpawning = (mvp) => {
    const currentTime = convertToTimestamp(getCurrentTime());
    if (mvp.deathTime && currentTime >= mvp.minRespawnTime) {
      remindSubscribingChannels(mvp);
      refreshMvpRespawnAndDeathTimers(mvp);
    }
  };

  const remindSubscribingChannels = (mvp) => {
    reminderChannels.forEach((channel) => {
      channel.send(createMvpReminderEmbed(mvp));
    });
  };

  const refreshMvpRespawnAndDeathTimers = (mvp) => {
    mvp.deathTime = null;
    mvp.minRespawnTime = null;
    mvp.maxRespawnTime = null;
  };

  bossList.bosses.forEach(checkIfMvpIsSpawning);
};

// ON MESSAGE RECEIVED
const onMessageReceived = (message) => {
  if (!message.content.startsWith(DEFAULT_COMMAND_PREFIX) || message.author.bot) return;

  const args = message.content.slice(DEFAULT_COMMAND_PREFIX.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === commands.MVP) {
    discordClient.commands.get(commands.MVP).execute(message, args, bossList);
  } else if (command === commands.HELP) {
    discordClient.commands.get(commands.HELP).execute(message, args);
  } else if (command === commands.INFO) {
    discordClient.commands.get(commands.INFO).execute(message, args, bossList);
  } else if (command === commands.SET_REMINDER_CHANNEL) {
    discordClient.commands
      .get(commands.SET_REMINDER_CHANNEL)
      .execute(message, args, reminderChannels);
  } else {
    message.channel.send(messages.COMMAND_DOES_NOT_EXIST);
  }
};

discordClient.once(events.READY, onReady);
discordClient.on(events.MESSAGE, onMessageReceived);
discordClient.login(`${process.env.TOKEN}`);
