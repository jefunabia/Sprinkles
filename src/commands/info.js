import { retrieveMvpFromBossNameOrAlias } from '../util/common';
import { createBossInfoEmbed } from '../util/embed';

export const name = 'info';
export const description = 'To view the information of a specific boss';

export const execute = (message, args, bossList) => {
  const cleanInput = args.join(' ').toLowerCase().trim();
  const isValidInput = cleanInput.length >= 2;
  let retrievedMvp = null;

  if (isValidInput) {
    retrievedMvp = retrieveMvpFromBossNameOrAlias(bossList, cleanInput);
    message.channel.send(createBossInfoEmbed(retrievedMvp));
  } else {
    message.channel.send(messages.INVALID_MVP_INPUT);
  }

  if (!retrievedMvp && isValidInput) {
    message.channel.send(messages.BOSS_NOT_FOUND);
  }
};
