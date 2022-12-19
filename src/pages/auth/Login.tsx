import { Button, Form, Input, message } from 'antd';
import Password from 'antd/es/input/Password';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { updateUser } from '../../redux/slices/user.slice';
// import { updateUserAction } from '../../redux_bak/actions/user.action';
import { login } from '../../requests/auth.request';
import { State } from '../../types/state.interface';

export const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const user = useSelector((state: State) => state.user);
    const dispatch = useDispatch();

    const handleFinish = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();

            const data = await login(values);
            dispatch(updateUser(data.user));

            message.success('Đăng nhập thành công');
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (user) return <Navigate to="/" />;

    return (
        <div className="login">
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item
                    name="email"
                    label="Email:"
                    rules={[
                        { required: true, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Email không hợp lệ' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Mật khẩu:"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                >
                    <Password />
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={loading}>
                    Đăng nhập
                </Button>
            </Form>
        </div>
    );
};
