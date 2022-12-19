import { Header } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { Button, Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../types/state.interface';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { removeUser } from '../../redux/slices/user.slice';
import { removeAccessToken } from '../../utils/storage.util';

export const AppHeader: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: State) => state.user);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const handleLogout = () => {
        removeAccessToken();
        dispatch(removeUser({}));
    };

    const items: ItemType[] = [
        {
            key: 'logout',
            label: <a onClick={handleLogout}>Đăng xuất</a>,
            icon: <FaSignOutAlt />,
        },
    ];

    return (
        <Header className="app-header p-12">
            <Button className="btn-back" onClick={handleBack}>
                <FaArrowLeft />
            </Button>
            <div className="header-menu">
                <Dropdown menu={{ items }} className="header-profile-menu">
                    <Button className="profile">
                        <FaUserCircle size={24} />
                        <span className="name">{user?.name}</span>
                    </Button>
                </Dropdown>
            </div>
        </Header>
    );
};
