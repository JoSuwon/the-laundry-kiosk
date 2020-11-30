import axios from 'axios';

const TIMEOUT_SEC = parseInt(process.env.VUE_APP_REQUEST_TIMEOUT, 10);

export const kioskAPI = axios.create({
  baseURL: process.env.VUE_APP_KIOSK_API_HOST,
  timeout: TIMEOUT_SEC,
});
