interface IAuthLayout {
    children: any;
}
export const AuthLayout: React.FC<IAuthLayout> = ({ children }) => {
    return (
        <section className="auth">
            <div className="form-container p-24">{children}</div>
        </section>
    );
};
