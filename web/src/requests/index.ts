import axios from 'axios';

import { ENDPOINTS } from '../config';

export const authenticateUser = async (code: string): Promise<string> => {
    const apiUrl = ENDPOINTS.USER_AUTHENICATE;
    const res = await axios({
        method: 'post',
        url: apiUrl,
        data: { code },
        headers: { 'Accept': 'application/json' }
    });
    return res.data.data.token;
};

export const getUserDetails = async (token: string): Promise<any> => {
    const apiUrl = ENDPOINTS.USER_DETAILS;
    const res = await axios({
        method: 'get',
        url: apiUrl,
        headers: { 'authorization': `${token}` }
    });
    return res.data.data;
};

export const getRepoListByUsername = async (token: string, username: string, page: number, size: number): Promise<any[]> => {
    const apiUrl = `${ENDPOINTS.USER_REPOS(username)}?page=${page}&size=${size}`;
    const res = await axios({
        method: 'get',
        url: apiUrl,
        headers: { 'authorization': `${token}` }
    });
    return res.data.data;
};