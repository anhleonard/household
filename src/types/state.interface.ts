import { ConfigState } from './config-state.interface';
import { UserState } from './user-state.interface';

export interface State {
    user: UserState;
    config: ConfigState;
}
