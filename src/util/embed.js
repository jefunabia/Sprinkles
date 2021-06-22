import Discord from 'discord.js';
import {
  addNumberWithCommas,
  convertSecondsToHMS,
  convertUnixTimeToCalendarFormat,
  getCurrentTimeInHMAFormat,
} from './common';

export const createMvpReminderEmbed = (mvp) =>
  new Discord.MessageEmbed()
    .setColor('#0x43a047')
    .setTitle(`${mvp.bossName} respawn schedule is now **UP!** `)
    .setThumbnail(mvp.imageUrl)
    .addFields(
      {
        name: 'Min. Respawn',
        value: convertUnixTimeToCalendarFormat(mvp.minRespawnTime) || '--',
        inline: true,
      },
      {
        name: 'Max. Respawn',
        value: convertUnixTimeToCalendarFormat(mvp.maxRespawnTime) || '--',
        inline: true,
      },
    )
    .setFooter(
      `Current Time: ${getCurrentTimeInHMAFormat()}`,
      'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/alarm-clock_23f0.png',
    );

// * parameters = boss info
// * returns embed with boss info and its respawn times
export const createBossAddedEmbed = (
  { bossName, location, imageUrl },
  minRespawnTimeCalendarFormat,
  maxRespawnTimeCalendarFormat,
) =>
  new Discord.MessageEmbed()
    .setColor('#0xf44336')
    .setTitle(bossName)
    .setThumbnail(imageUrl)
    .addFields(
      { name: 'Location', value: location || '--' },
      { name: 'Min. Respawn', value: minRespawnTimeCalendarFormat || '--', inline: true },
      { name: '\u200B', value: '\u200B', inline: true },
      { name: 'Max. Respawn', value: maxRespawnTimeCalendarFormat || '--', inline: true },
    )
    .setFooter(
      `Time of Death: ${getCurrentTimeInHMAFormat()}`,
      'https://emoji.gg/assets/emoji/9468_ghostplus.gif',
    );

// * parameters = boss info
// * returns embed with boss info
export const createBossInfoEmbed = ({
  bossName,
  HP,
  race,
  property,
  location,
  minRespawnTimeScheduleInSeconds,
  maxRespawnTimeScheduleInSeconds,
  imageUrl,
  alias,
}) =>
  new Discord.MessageEmbed()
    .setColor('#0xD8BFDD')
    .setTitle(bossName)
    .setDescription(`**Alias:** ${alias.join(', ')}`)
    .setThumbnail(imageUrl)
    .addFields(
      { name: 'HP', value: addNumberWithCommas(HP) || '--' },
      { name: 'Location', value: location || '--' },
      { name: 'Race', value: race || '--', inline: true },
      { name: '\u200B', value: '\u200B', inline: true },
      { name: 'Property', value: property || '--', inline: true },
      {
        name: 'Min. Respawn',
        value: convertSecondsToHMS(minRespawnTimeScheduleInSeconds) || '--',
        inline: true,
      },
      { name: '\u200B', value: '\u200B', inline: true },
      {
        name: 'Max. Respawn',
        value: convertSecondsToHMS(maxRespawnTimeScheduleInSeconds) || '--',
        inline: true,
      },
    );
