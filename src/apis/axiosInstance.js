import axios from 'axios';
import { ENV } from './env';

const createApiClient = (baseURL) =>
  axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 5000,
  });

export const apiClient = createApiClient(ENV.API_BASE_URL);
export const teamClient = createApiClient(ENV.API_TEAM_BASE_URL);

export default apiClient;
