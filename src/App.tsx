import './assets/styles/index.scss';
import './assets/styles/components.scss';
import './assets/styles/app-layout.scss';
import './assets/styles/auth-layout.scss';
import './assets/styles/page.scss';

import { ConfigProvider } from 'antd';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './pages';
import { store } from './redux/store';

export const App: React.FC<{}> = () => {
    return (
        <Provider store={store}>
            <ConfigProvider>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </ConfigProvider>
        </Provider>
    );
};
