import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Error403 } from '../components/error-pages/Error403';
import { Error404 } from '../components/error-pages/Error404';
import { Loading } from '../components/loading/Loading';
import { roleGuard } from '../guards/role.guard';
import { AppLayout } from '../layout/app';
import { AuthLayout } from '../layout/auth';
import { updateConfig } from '../redux/slices/config.slice';
import { updateUser } from '../redux/slices/user.slice';
import { refreshAccessToken } from '../requests/auth.request';
import { getConstants, getLocals } from '../requests/config.request';
import { Guard } from '../types/guard.type';
import { State } from '../types/state.interface';
import { Login } from './auth/Login';
import { Overview } from './overview/Overview';
import { CreateUser } from './users/CreateUser';
import { UpdateUser } from './users/UpdateUser';
import { UsersList } from './users/UsersList';

interface ProtectedRouteProps {
    children: any;
    guard?: Guard;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, guard }: ProtectedRouteProps) => {
    const user = useSelector((state: State) => state.user);

    if (user) {
        if (!user.status || (guard && !guard(user))) return <Navigate to="/401" replace />;
        return children;
    }

    return <Navigate to="/login" replace />;
};

export const AppRoutes: React.FC = () => {
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const constants = await getConstants();
            const locals = await getLocals();

            dispatch(
                updateConfig({
                    ...constants,
                    locals,
                }),
            );

            const data = await refreshAccessToken({ data: { silent: true } });
            dispatch(updateUser(data.user));
        } catch (err: any) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <Routes>
            {/* error pages */}
            <Route path="/*" element={<Error404 />} />
            <Route path="/403" element={<Error403 />} />

            {/* auth routes */}
            <Route
                element={
                    <AuthLayout>
                        <Outlet />
                    </AuthLayout>
                }
            >
                <Route path="/login" element={<Login />} />
            </Route>

            {/* authenticated routes */}
            <Route
                element={
                    <ProtectedRoute>
                        <AppLayout>
                            <Outlet />
                        </AppLayout>
                    </ProtectedRoute>
                }
            >
                <Route path="/" element={<Overview />} />
            </Route>

            <Route
                element={
                    <ProtectedRoute guard={roleGuard(1, 2)}>
                        <AppLayout>
                            <Outlet />
                        </AppLayout>
                    </ProtectedRoute>
                }
            >
                <Route path="/users/list" element={<UsersList />} />
                <Route path="/users/create" element={<CreateUser />} />
                <Route path="/users/edit/:id" element={<UpdateUser />} />
            </Route>
        </Routes>
    );
};
