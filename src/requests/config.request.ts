import { api } from '../utils/api.util';

export const getConstants = async () => {
    const response = await api.get('/config/constants');
    return response.data;
};

export const getLocals = async () => {
    const response = await api.get('/config/locals');
    return response.data;
};
