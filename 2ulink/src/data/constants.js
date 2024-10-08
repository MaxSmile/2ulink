
const BASE_URL = process.env.BASE_URL || 'https://2ul.top'
const API_BASE_URL = process.env.API_BASE_URL || 'https://api.2ul.top'
const CLIENT_URL = process.env.CLIENT_URL || 'https://client.2ul.top'
const API_WRITE_SHRTN_DATA =
  process.env.API_WRITE_SHRTN_DATA || '/urls';
const REDIRECT_DELAY_TIME = process.env.REDIRECT_DELAY_TIME || 15 * 1000;
const API_READ_SHRTN_DATA = process.env.API_READ_SHRTN_DATA || '/urls/';

export { BASE_URL, API_BASE_URL, CLIENT_URL, API_WRITE_SHRTN_DATA, REDIRECT_DELAY_TIME, API_READ_SHRTN_DATA }