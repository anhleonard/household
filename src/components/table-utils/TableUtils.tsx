import { Button } from 'antd';
import Search from 'antd/es/input/Search';

interface TableUtilsProps {
    searching?: boolean;
    onSearch: (search: string) => Promise<void>;
    onDelete: () => Promise<void>;
}
export const TableUtils: React.FC<TableUtilsProps> = ({ searching, onSearch, onDelete }) => {
    return (
        <div className="table-utils">
            <Search allowClear loading={searching} onSearch={onSearch} placeholder="Tìm kiếm" />
            <Button className="ml-8" type="primary" onClick={onDelete}>
                Xóa
            </Button>
        </div>
    );
};
