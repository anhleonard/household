import { AppHeader } from './AppHeader';
import { Sidebar } from './AppSidebar';

interface IAppLayout {
    children: any;
}
export const AppLayout: React.FC<IAppLayout> = ({ children }) => {
    return (
        <div className="dashboard">
            <section className="sidebar">
                <Sidebar />
            </section>
            <section className="main">
                <section className="header">
                    <AppHeader />
                </section>
                <section className="page">{children}</section>
            </section>
        </div>
    );
};
