import {
  addTimeInSecondsToCalendarFormat,
  addTimeInSecondsToUnixFormat,
  convertSecondsToHMS,
  convertToTimestamp,
  convertUnixTimeToHMAFormat,
  getCurrentTime,
  retrieveMvpFromBossNameOrAlias,
  sortArray,
} from '../util/common';
import { messages } from '../globals/messages';
import { mvpSubCommands } from '../globals/constants';
import { createBossAddedEmbed } from '../util/embed';

export const name = 'mvp';
export const description = 'Ragnarok Online MVP helper';

export const execute = (message, args, bossList) => {
  switch (args[0]) {
    case mvpSubCommands.ADD: {
      executeSubCommandAdd(message, args, bossList);
      break;
    }
    case mvpSubCommands.LIST: {
      executeSubCommandList(message, args, bossList);
      break;
    }
    case mvpSubCommands.CLEAR: {
      executeSubCommandClear(message, args, bossList);
      break;
    }
    default: {
      message.channel.send(messages.COMMAND_DOES_NOT_EXIST);
    }
  }
};

const executeSubCommandAdd = (message, args, bossList) => {
  let roughInput = '';
  for (let i = 1; i < args.length; i++) {
    roughInput += `${args[i]} `;
  }

  const currentTimeInUnix = convertToTimestamp(getCurrentTime());
  const cleanInput = roughInput.toLowerCase().trim();
  const isValidInput = cleanInput.length >= 2;

  let retrievedMvp = null;
  if (isValidInput) {
    retrievedMvp = retrieveMvpFromBossNameOrAlias(bossList, cleanInput);

    //  Update deathTime, minRespawn and maxRespawn in bossList file
    retrievedMvp.deathTime = currentTimeInUnix;
    retrievedMvp.minRespawnTime = addTimeInSecondsToUnixFormat(
      retrievedMvp.minRespawnTimeScheduleInSeconds,
    );
    retrievedMvp.maxRespawnTime = addTimeInSecondsToUnixFormat(
      retrievedMvp.maxRespawnTimeScheduleInSeconds,
    );

    message.channel.send(
      createBossAddedEmbed(
        retrievedMvp,
        addTimeInSecondsToCalendarFormat(retrievedMvp.minRespawnTimeScheduleInSeconds),
        addTimeInSecondsToCalendarFormat(retrievedMvp.maxRespawnTimeScheduleInSeconds),
      ),
    );
    message.channel.send(
      `MVP added successfully!\nI will remind you in **${convertSecondsToHMS(
        retrievedMvp.minRespawnTimeScheduleInSeconds,
      )}**!`,
    );
  } else {
    message.channel.send(messages.INVALID_MVP_INPUT);
  }
  if (!retrievedMvp && isValidInput) {
    message.channel.send(messages.BOSS_NOT_FOUND);
  }
};

const executeSubCommandList = (message, args, bossList) => {
  let messageText = '';
  const currentMvps = sortArray(bossList.bosses.filter((mvp) => mvp.deathTime));

  if (currentMvps.length > 0) {
    currentMvps.forEach((mvp) => {
      const minTime = convertUnixTimeToHMAFormat(mvp.minRespawnTime);
      const maxTime = convertUnixTimeToHMAFormat(mvp.maxRespawnTime);
      messageText += `🔹 **${mvp.bossName}** | ${minTime} - ${maxTime}\n`;
    });
    message.channel.send(messageText);
  } else {
    message.channel.send(messages.EMPTY_MVP_LIST);
  }
};

const executeSubCommandClear = (message, args, bossList) => {
  bossList.bosses.forEach((mvp) => {
    if (mvp.deathTime) {
      mvp.minRespawnTime = null;
      mvp.maxRespawnTime = null;
      mvp.deathTime = null;
    }
  });

  message.channel.send(messages.MVP_LIST_CLEARED);
};
