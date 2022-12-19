import { Button, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { ItemType, SubMenuType } from 'antd/es/menu/hooks/useItems';
import { FaChartBar, FaChevronLeft, FaChevronRight, FaHouseUser, FaKey, FaUserFriends } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { SelectInfo } from 'rc-menu/lib/interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../../types/state.interface';
import { GuardType } from '../../types/guard.type';
import { roleGuard } from '../../guards/role.guard';

export const menuItems: ItemType[] = [
    {
        key: '/users',
        label: 'Quản lý tài khoản',
        children: [
            {
                key: '/users/list',
                label: 'Danh sách tài khoản',
            },
            {
                key: '/users/create',
                label: 'Thêm tài khoản',
            },
        ],
        icon: <FaKey />,
    },
    {
        key: '/people',
        label: 'Quản lý nhân khẩu',
        children: [
            {
                key: '/people/list',
                label: 'Danh sách nhân khẩu',
            },
            {
                key: '/people/create',
                label: 'Thêm nhân khẩu mới',
            },
        ],
        icon: <FaUserFriends />,
    },
    {
        key: '/households',
        label: 'Quản lý hộ khẩu',
        children: [
            {
                key: '/households/list',
                label: 'Danh sách hộ khẩu',
            },
            {
                key: '/households/create',
                label: 'Thêm hộ khẩu mới',
            },
        ],
        icon: <FaHouseUser />,
    },
    {
        key: '/statistics',
        label: 'Thống kê',
        icon: <FaChartBar />,
    },
];

const menuItemGuards: GuardType[] = [roleGuard(1, 2), null, null];

export const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('');
    const [openKey, setOpenKey] = useState(['']);

    const user = useSelector((state: State) => state.user);

    const location = useLocation();
    const navigate = useNavigate();

    const items = menuItems.filter((each, index) => {
        const guard = menuItemGuards[index];
        if (guard) {
            return guard(user);
        }
        return true;
    });

    useEffect(() => {
        for (const item of menuItems) {
            if (location.pathname.includes(item?.key as string)) {
                setSelectedMenu(item?.key as string);
                setOpenKey([item?.key] as string[]);
            }

            const children = (item as SubMenuType)?.children;
            if (children) {
                for (const child of children) {
                    if (location.pathname.includes(child?.key as string)) {
                        setSelectedMenu(child?.key as string);
                    }
                }
            }
        }
    }, [location.pathname]);

    const handleMenuSelect = ({ key }: SelectInfo) => {
        navigate(key);
    };

    return (
        <Sider collapsible collapsed={collapsed} collapsedWidth={60} width={240} trigger={<></>}>
            <Menu
                items={items}
                mode="inline"
                onSelect={handleMenuSelect}
                selectedKeys={[selectedMenu]}
                openKeys={openKey}
                onOpenChange={setOpenKey}
            />
            <Button onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? (
                    <FaChevronRight />
                ) : (
                    <>
                        <FaChevronLeft />
                        <span> Thu gọn</span>
                    </>
                )}
            </Button>
        </Sider>
    );
};
