export interface UpdateUserDto {
    name?: string;
    password?: string;
    mobile?: string;
    role?: number;
    departmentId?: number;
    status?: number;
}

export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    mobile: string;
    role: number;
    departmentId?: number;
}
