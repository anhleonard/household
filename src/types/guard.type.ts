import { UserState } from './user-state.interface';

export type Guard = (user: UserState) => boolean;

export type GuardType = Guard | null;
