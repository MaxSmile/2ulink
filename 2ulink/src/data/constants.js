
const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://2ul.top';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.2ul.top';
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL || 'https://client.2ul.top';
const API_WRITE_SHRTN_DATA =
  import.meta.env.VITE_API_WRITE_SHRTN_DATA || '/urls';
const REDIRECT_DELAY_TIME =
  Number(import.meta.env.VITE_REDIRECT_DELAY_TIME) || 15 * 1000;
const API_READ_SHRTN_DATA =
  import.meta.env.VITE_API_READ_SHRTN_DATA || '/urls/';

export {
  BASE_URL,
  API_BASE_URL,
  CLIENT_URL,
  API_WRITE_SHRTN_DATA,
  REDIRECT_DELAY_TIME,
  API_READ_SHRTN_DATA,
};
