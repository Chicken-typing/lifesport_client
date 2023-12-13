import KsLayout from '@/layout';
import ForgotForm from './ForgotForm';
import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
const ForgotPassword = () => {
  const [step, setStep] = useState<number>(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const { t } = useTranslation('forgot');

  return (
    <KsLayout title={t('page')}>
      <div className="kl-auth">
        <div className="kl-container content">
          <h1 className="title">{t('title')}</h1>
          <div className="wrapper row">
            <div className="column register  col-12">
              <ForgotForm className="form -right" onNext={handleNextStep} step={step} />
            </div>
          </div>
        </div>
      </div>
    </KsLayout>
  );
};

export default ForgotPassword;
