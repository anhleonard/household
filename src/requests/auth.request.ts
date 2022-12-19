import { AxiosRequestConfig } from 'axios';
import { api } from '../utils/api.util';
import { setAccessToken } from '../utils/storage.util';
import { LoginBody } from './types/auth.interface';

export const login = async (body: LoginBody) => {
    const response = await api.post('/auth/login', body);
    setAccessToken(response.data?.accessToken);
    return response.data;
};

export const refreshAccessToken = async (config?: AxiosRequestConfig) => {
    const response = await api.get('/auth/refresh-token', config);
    setAccessToken(response.data?.accessToken);
    return response.data;
};
