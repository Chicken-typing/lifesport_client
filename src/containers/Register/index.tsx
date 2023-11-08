import KsLayout from '@/layout';
import RegisterForm from './RegisterForm';
import { useState } from 'react';
import { isEqual } from 'lodash';
import ConfirmOTP from './ConfirmOTP';
const Register = () => {
  const [step, setStep] = useState<number>(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <KsLayout title="Tài khoản">
      <div className="kl-auth">
        <div className="kl-container content">
          <h1 className="title">Register</h1>
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
