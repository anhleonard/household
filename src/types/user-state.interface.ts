export interface User {
    id: number;
    name: string;
    email: string;
    status: number;
    role: number;
    departmentId?: number;
}

export interface UserAction {
    type: string;
    payload: Partial<User>;
}

export type UserState = User | null | undefined;
