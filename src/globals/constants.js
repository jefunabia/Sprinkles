export const events = {
  READY: 'ready',
  MESSAGE: 'message',
};

export const BOT_NAME = `${process.env.BOTTNAME || 'Sprinkles'}`;
export const BOT_IMAGE_URI =
  'https://cdn.discordapp.com/icons/855446733744111656/16728c721344b43130319feafed2e1bd.webp?size=128';
export const DEFAULT_COMMAND_PREFIX = '$';

export const COMMANDS_DIRECTORY = './src/commands';
export const BOSS_DATA_DIRECTORY = './data/bossList.json';

export const commands = {
  MVP: 'mvp',
  HELP: 'help',
  INFO: 'info',
  SET_REMINDER_CHANNEL: 'set-reminder-channel',
};

export const mvpSubCommands = {
  ADD: 'add',
  LIST: 'list',
  CLEAR: 'clear',
};

export const timers = {
  MVP_CHECKING: 1000, //ms
  BOSS_LIST_SAVING: 30000, //ms
};
