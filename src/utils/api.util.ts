import { message } from 'antd';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken, removeAccessToken } from './storage.util';

export const api = axios.create({
    baseURL: process.env.API_ENDPOINT + '/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
    },
});

api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = getAccessToken();

        // add token to headers
        if (token && config?.headers) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error: AxiosError<any, any>) => {
        Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<any, any>) => {
        if (error.response?.status === 401) {
            removeAccessToken();
        }

        const configData = JSON.parse(error.config?.data);
        if (!configData.silent) {
            message.error(error.response?.data?.message);
        }
        return Promise.reject(error);
    },
);
