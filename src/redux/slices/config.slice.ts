import { createSlice, CaseReducer } from '@reduxjs/toolkit';
import { ConfigAction, ConfigState } from '../../types/config-state.interface';

interface ConfigReducers {
    [K: string]: CaseReducer<ConfigState, ConfigAction>;
}

export const ConfigSlice = createSlice<ConfigState, ConfigReducers>({
    name: 'config',
    initialState: null,
    reducers: {
        updateConfig: (state: ConfigState, action: ConfigAction) => {
            return {
                ...(state || {}),
                ...action.payload,
            } as ConfigState;
        },
        removeConfig: () => {
            return null;
        },
    },
});

export const { updateConfig, removeConfig } = ConfigSlice.actions;

export const configReducer = ConfigSlice.reducer;
