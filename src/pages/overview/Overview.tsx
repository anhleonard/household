import { Button, Form } from 'antd';
import { AddressInput } from '../../components/inputs/AddressInput';

export const Overview: React.FC = () => {
    const [form] = Form.useForm();

    const testAddressChange = () => {
        form.setFieldValue('address', {
            communeId: 4015,
            street: 'Changed',
        });
    };

    const handleSubmit = async () => {
        const values = await form.validateFields();
        console.log(values);
        return;
    };

    return (
        <>
            <Form
                style={{ width: 720 }}
                form={form}
                layout="horizontal"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                labelAlign="left"
                onFinish={handleSubmit}
                initialValues={{
                    address: {
                        communeId: 1,
                        street: 'Test',
                    },
                }}
            >
                <Form.Item name="address" label="Địa chỉ">
                    <AddressInput />
                </Form.Item>

                <Button onClick={testAddressChange}>Đổi</Button>
                <Button onClick={handleSubmit} type="primary">
                    Gửi
                </Button>
            </Form>
        </>
    );
};
