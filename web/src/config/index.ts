const APP_URL = 'http://127.0.0.1:3000';
const API_BASE_URL = 'http://127.0.0.1:3001';
const CLIENT_ID = 'Iv1.9cbc404901bc225d';

export const ENDPOINTS = {
    USER_AUTHENICATE: `${API_BASE_URL}/users/authenticate`,
    USER_DETAILS: `${API_BASE_URL}/users/self`,
    USER_REPOS: (username: string) => `${API_BASE_URL}/repos/${username}`,
    GITHUB_REDIRECTION: `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${APP_URL}`,
};
