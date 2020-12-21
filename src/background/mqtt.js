import { ipcMain } from 'electron';
import mqtt from 'mqtt';

const URL = 'mqtt://13.209.63.212:1883';
export const client = mqtt.connect(URL);
let eventer;

ipcMain.handle('login', (event, id) => {
  eventer = event;
  const topic = `kiosk/${id}/control/+`;
  // console.log(topic);
  client.subscribe(topic);
});

client.on('message', (topic, message) => {
  console.log(topic, message.toString());
  eventer.sender.send('hook', { topic });
});