import fs from 'fs';
import moment from 'moment';

// * parameters = time
// * returns a number separated with commas
export const addNumberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// * parameters = time
// * returns the converted seconds into minutes or hours
export const convertSecondsToHMS = (time) => {
  time = Number(time);
  const h = Math.floor(time / 3600);
  const m = Math.floor((time % 3600) / 60);
  const s = Math.floor((time % 3600) % 60);

  const hDisplay = h > 0 ? h + (h === 1 ? ' hour ' : ' hours ') : '';
  const mDisplay = m > 0 ? m + (m === 1 ? ' minute ' : ' minutes ') : '';
  const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
  return hDisplay + mDisplay + sDisplay;
};

export const removePrefix = (input, prefix) => input.replace(prefix, '').trim();
export const tokenizeInput = (input, prefix) => removePrefix(input, prefix).split(' ');

// * parameter = file name
// * returns parsed data
export const readFile = (filename) => {
  const data = fs.readFileSync(filename);
  return JSON.parse(data);
};

export const retrieveMvpFromBossNameOrAlias = (bossList, input) => {
  const retrieveMvpFromName = (mvp) => (mvp.bossName.toLowerCase().includes(input) ? mvp : null);
  const retrieveMvpFromAlias = (mvp) =>
    mvp.alias.find((alias) => alias.toLowerCase() === input) ? mvp : null;

  return bossList.bosses.find((mvp) => retrieveMvpFromAlias(mvp) || retrieveMvpFromName(mvp));
};

// * returns current time in hh:mm A format
export const getCurrentTimeInHMAFormat = () => {
  let currentTime = moment();
  return moment(currentTime).format('hh:mm A');
};

// * returns current time in default format
export const getCurrentTime = () => {
  let currentTime = moment();
  return moment(currentTime);
};

// * returns time in unix format
export const convertToTimestamp = (time) => moment(time).unix();

// * parameters = time in unix
// * returns time in calendar format
export const convertUnixTimeToCalendarFormat = (time) => moment.unix(time).calendar();

// * parameters = time in unix
// * returns time in HMA format
export const convertUnixTimeToHMAFormat = (time) => moment.unix(time).format('hh:mm A');

// * parameters = time in seconds
// * returns = added time in calendar format
export const addTimeInSecondsToCalendarFormat = (time) => moment().add(time, 'seconds').calendar();

// * parameters = time in seconds
// * returns = added time in unix format
export const addTimeInSecondsToUnixFormat = (time) => moment().add(time, 'seconds').unix();

// * parameters = time in seconds
// * returns time in milliseconds
export const convertSecondsToMS = (seconds) => seconds * 1000;

// * parameters = file to be written, and data to be written
export const writeFile = (filename, data) => {
  let jsonString = JSON.stringify(data);
  fs.writeFile(filename, jsonString, (err) => {
    if (err) {
      console.log('Error in writing file!', err);
    } else {
      console.log(`Successfully wrote the file in ${filename}`);
    }
  });
};

// * parameter = array
// * sends a sorted array
export const sortArray = (arr) =>
  arr.sort((a, b) => (a.minRespawnTime > b.minRespawnTime ? 1 : -1));
