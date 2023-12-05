import KsLayout from '@/layout';
import RegisterForm from './RegisterForm';
import { useState } from 'react';
import { isEqual } from 'lodash';
import ConfirmOTP from './ConfirmOTP';
import useTranslation from 'next-translate/useTranslation';
const Register = () => {
  const [step, setStep] = useState<number>(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const { t } = useTranslation('register');

  return (
    <KsLayout title={t('page')}>
      <div className="kl-auth">
        <div className="kl-container content">
          <h1 className="title">{t('title')}</h1>
          <div className="wrapper row">
            <div className="column register  col-12">
              <RegisterForm className="form -right" onNext={handleNextStep} step={step} />
            </div>
          </div>
        </div>
      </div>
    </KsLayout>
  );
};

export default Register;
