import { message, Switch, Table, Typography } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TableUtils } from '../../components/table-utils/TableUtils';
import { Key, useEffect, useMemo, useState } from 'react';
import { deleteUsers, getListUsers, updateUser } from '../../requests/user.request';
import { parse, stringify } from 'qs';
import { ColumnType } from 'antd/es/table';
import { useSelector } from 'react-redux';
import { State } from '../../types/state.interface';
import { mapEnumConstantByValue } from '../../utils/enum-constant.util';

const { Title } = Typography;

export const UsersList: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [currentQuery, setCurrentQuery] = useState<any>({});
    const [total, setTotal] = useState(0);
    const [users, setUsers] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

    const roles = useSelector((state: State) => state.config?.accountRoles);

    const rolesMap = useMemo(() => mapEnumConstantByValue(roles), [roles]);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, [location.search]);

    const getData = async () => {
        try {
            setLoading(true);

            const query: any = parse(location.search.slice(1));
            query.page = Number(query.page) || 1;
            query.pageSize = Number(query.pageSize) || 10;
            setCurrentQuery(query);

            const page = query.page;
            const take = query.pageSize;
            const skip = (page - 1) * take;
            const search = query.search;

            const data = await getListUsers({ skip, take, search });
            setTotal(data.total);
            setUsers(data.records);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (search: string) => {
        const query = {
            ...currentQuery,
            search,
        };
        const queryString = stringify(query);

        navigate({
            search: queryString,
        });
    };

    const handleDelete = async () => {
        try {
            if (!selectedRowKeys.length) return;

            setLoading(false);
            await deleteUsers(selectedRowKeys);
            message.success('Thành công');

            getData();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number, pageSize: number) => {
        const query = {
            ...currentQuery,
            page,
            pageSize,
        };
        const queryString = stringify(query);

        navigate({
            search: queryString,
        });
    };

    const handleStatusChange = async (id: number, status: number) => {
        try {
            await updateUser(id, { status });
        } catch (err) {
            console.log(err);
        }
    };

    const columns: ColumnType<any>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            render: (name, record) => <Link to={'/users/edit/' + record.id}>{name}</Link>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Điện thoại',
            dataIndex: 'mobile',
        },
        {
            title: 'Chức vụ',
            dataIndex: 'role',
            render: (role: number) => <>{rolesMap[role].label}</>,
        },
        {
            title: 'Ban',
            dataIndex: 'department',
            render: (department) => department && <>{department.name}</>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status, record) => (
                <Switch
                    defaultChecked={status}
                    onChange={(checked) => handleStatusChange(record.id, Number(checked))}
                />
            ),
        },
    ];

    return (
        <div className="list-page">
            <div className="page-header">
                <Title className="title" level={2}>
                    Danh sách tài khoản
                </Title>
                <TableUtils onSearch={handleSearch} onDelete={handleDelete} />
            </div>
            <Table
                className="mt-24"
                rowKey="id"
                rowSelection={{
                    selectedRowKeys,
                    onChange: (keys: Key[]) => setSelectedRowKeys(keys as number[]),
                }}
                loading={loading}
                columns={columns}
                dataSource={users}
                pagination={{
                    current: currentQuery.page,
                    pageSize: currentQuery.pageSize,
                    total: total,
                    showSizeChanger: true,
                    pageSizeOptions: [1, 2, 5],
                    onChange: handlePageChange,
                }}
            />
        </div>
    );
};
