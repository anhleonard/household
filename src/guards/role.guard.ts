import { UserState } from '../types/user-state.interface';

export const roleGuard =
    (...roles: number[]) =>
    (user: UserState) => {
        return roles.includes(user?.role as number);
    };
