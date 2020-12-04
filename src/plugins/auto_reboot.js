import { CronJob } from 'cron';
import { reboot } from 'electron-shutdown-command';

const time = [
  '0', 
  '0', 
  process.env.VUE_APP_REBOOT_TIME || '4', 
  '*', 
  '*', 
  '*'
].join(' ');

const cronJob = new CronJob(time, () => {
  reboot();
});

cronJob.start();