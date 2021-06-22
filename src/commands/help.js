import { messages } from '../globals/messages';
import { BOT_IMAGE_URI, BOT_NAME, DEFAULT_COMMAND_PREFIX } from '../globals/constants';
import * as info from './info';
import * as mvp from './mvp';

export const name = 'help';
export const description = 'To check the available bot commands';

export const execute = (message, args) => {
  if (args.length === 0) {
    message.channel.send({ embed: helpEmbed });
  } else {
    message.channel.send(messages.COMMAND_DOES_NOT_EXIST);
  }
};

const helpEmbed = {
  color: 0xd8bfdd,
  title: `${BOT_NAME} Commands`,
  thumbnail: {
    url: BOT_IMAGE_URI,
  },
  fields: [
    {
      name: `${DEFAULT_COMMAND_PREFIX}${name}`,
      value: description,
    },
    {
      name: `${DEFAULT_COMMAND_PREFIX}${info.name}`,
      value: info.description,
    },
    {
      name: `${DEFAULT_COMMAND_PREFIX}${mvp.name} add <bossname>`,
      value:
        "To add a boss into the MVP list \nThis will also set a reminder on the boss' scheduled respawn time",
    },
    {
      name: `${DEFAULT_COMMAND_PREFIX}${mvp.name} list`,
      value: 'To view the list of the current MVPs with a respawn time schedule',
    },
    {
      name: `${DEFAULT_COMMAND_PREFIX}${mvp.name} clear`,
      value: 'To clear all contents in the MVP list.',
    },
  ],
  footer: {
    text: `${BOT_NAME} is developed by Jeee#0016 and 🌺 Xaikyu 🌺#3108`,
  },
};
