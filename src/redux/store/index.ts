import { configureStore } from '@reduxjs/toolkit';
import { configReducer } from '../slices/config.slice';
import { userReducer } from '../slices/user.slice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        config: configReducer,
    },
});
