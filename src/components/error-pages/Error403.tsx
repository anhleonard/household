import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export const Error403: React.FC = () => (
    <Result
        status="403"
        title="Permission denied"
        extra={
            <Link to="/">
                <Button type="primary">Back Home</Button>
            </Link>
        }
    />
);
