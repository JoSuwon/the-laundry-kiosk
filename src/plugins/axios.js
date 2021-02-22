import axios from 'axios';

const TIMEOUT_SEC = parseInt(process.env.VUE_APP_REQUEST_TIMEOUT, 10);

export const kioskAPI = axios.create({
  baseURL: process.env.VUE_APP_KIOSK_API_HOST,
  // baseURL: 'http://13.209.63.212:3000/kiosk',
  timeout: TIMEOUT_SEC,
});