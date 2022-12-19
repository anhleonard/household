import { Spin } from 'antd';
import Title from 'antd/es/typography/Title';

export const Loading: React.FC = () => {
    return (
        <div className="loading">
            <Spin size="large" spinning />
            <Title level={4} className="mt-16">
                Đang tải...
            </Title>
        </div>
    );
};
