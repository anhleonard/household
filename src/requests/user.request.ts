import { api } from '../utils/api.util';
import { GetListQuery } from './types/get-list.interface';
import { CreateUserDto, UpdateUserDto } from './types/user.interface';

export const getListUsers = async (params: GetListQuery = {}) => {
    const response = await api.get('/users', { params });
    return response.data;
};

export const getUserById = async (id: number) => {
    const response = await api.get('/users/' + id);
    return response.data;
};

export const createUser = async (body: CreateUserDto) => {
    const response = await api.post('/users', body);
    return response.data;
};

export const updateUser = async (id: number, body: UpdateUserDto) => {
    const response = await api.put('/users/' + id, body);
    return response.data;
};

export const deleteUsers = async (ids: number[]) => {
    const response = await api.delete('/users', { data: { ids } });
    return response.data;
};
