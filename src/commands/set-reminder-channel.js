export const name = 'set-reminder-channel';
export const description = 'To set channel to receive mvp notifications';

export const execute = (message, args, reminderChannels) => {
  if (reminderChannels.filter((channel) => channel.id === message.channel.id).length > 0) {
    message.channel.send('[FAILED] MVP reminders are already being sent in this channel');
  } else {
    reminderChannels.push(message.channel);
    message.channel.send('[SUCCESS] MVP reminders are now sent in this channel');
  }
};
