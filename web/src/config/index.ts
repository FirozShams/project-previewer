const API_BASE_URL = process.env.API_BASE_URL;
const CLIENT_ID = process.env.CLIENT_ID;

export const ENDPOINTS = {
    USER_AUTHENICATE: `${API_BASE_URL}/users/authenticate`,
    USER_DETAILS: `${API_BASE_URL}/users/self`,
    USER_REPOS: (username: string) => `${API_BASE_URL}/repos/${username}`,
    GITHUB_REDIRECTION: `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`,
};