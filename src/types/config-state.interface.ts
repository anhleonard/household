import { EnumConstant } from './enum-constant.interface';
import { Locals } from './local.interface';

export interface Province {}

export interface Config {
    accountRoles: EnumConstant;
    accountStatus: EnumConstant;
    departments?: EnumConstant;
    locals?: Locals;
}

export interface ConfigAction {
    type: string;
    payload: Partial<Config>;
}

export type ConfigState = Config | null | undefined;
