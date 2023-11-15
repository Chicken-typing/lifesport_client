import KsLayout from '@/layout';
import LoginForm from './LoginForm';
import useTranslation from 'next-translate/useTranslation';
import LoadingScreen from '@components/compound/LoadingScreen';

const Auth = () => {
  const { t } = useTranslation('login');
  return (
    <KsLayout title={t('page')}>
      <div className="kl-auth">
        <div className="kl-container content">
          <h1 className="title">{t('header')}</h1>
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
