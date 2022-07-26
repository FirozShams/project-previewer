const API_BASE_URL = 'https://git-preview-api.herokuapp.com';
const CLIENT_ID = 'Iv1.9cbc404901bc225d';

export const ENDPOINTS = {
    USER_AUTHENICATE: `${API_BASE_URL}/users/authenticate`,
    USER_DETAILS: `${API_BASE_URL}/users/self`,
    USER_REPOS: (username: string) => `${API_BASE_URL}/repos/${username}`,
    GITHUB_REDIRECTION: `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`,
};
