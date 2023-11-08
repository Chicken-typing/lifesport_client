import KsLayout from '@/layout';
import LoginForm from './LoginForm';

const Auth = () => {
  return (
    <KsLayout title="Tài khoản">
      <div className="kl-auth">
        <div className="kl-container content">
          <h1 className="title">My account</h1>
          <div className="wrapper row">
            <div className="column login  col-12">
              <LoginForm className="form -left" />
            </div>
            {/* <div className="column register col-md-6 col-12">
              <RegisterForm className="form -right" />
            </div> */}
          </div>
        </div>
      </div>
    </KsLayout>
  );
};

export default Auth;
