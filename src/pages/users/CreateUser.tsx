import { Button, Form, Input, message, Select, Typography } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../requests/user.request';
import { State } from '../../types/state.interface';
import { mapEnumConstantToArray } from '../../utils/enum-constant.util';

const { Title } = Typography;

export const CreateUser: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const roles = useSelector((state: State) => state.config?.accountRoles);
    const departments = useSelector((state: State) => state.config?.departments);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const values = await form.validateFields();
            await createUser(values);

            message.success('Thành công');
            navigate('/users/list');
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-page">
            <div className="page-header">
                <Title className="title" level={2}>
                    Thêm tài khoản
                </Title>
            </div>
            <Form
                form={form}
                className="mt-24"
                layout="horizontal"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                labelAlign="left"
                onFinish={handleSubmit}
            >
                <Form.Item name="name" label="Tên" rules={[{ required: true, message: 'Không được để trống' }]}>
                    <Input placeholder="Nhập tên" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Email không hợp lệ' },
                    ]}
                >
                    <Input placeholder="Nhập email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                >
                    <Input placeholder="Nhập mật khẩu" />
                </Form.Item>
                <Form.Item name="role" label="Chức vụ" rules={[{ required: true, message: 'Không được để trống' }]}>
                    <Select placeholder="Chọn chức vụ" options={mapEnumConstantToArray(roles)} />
                </Form.Item>
                <Form.Item name="departmentId" label="Ban">
                    <Select placeholder="Chọn ban" options={mapEnumConstantToArray(departments)} />
                </Form.Item>

                <div className="form-actions">
                    <Button htmlType="submit" type="primary" loading={loading}>
                        Lưu
                    </Button>
                </div>
            </Form>
        </div>
    );
};
