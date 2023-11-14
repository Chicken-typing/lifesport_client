import { GroupInput } from '@components/compound';
import { Button, Label } from '@components/primitive';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';
import { useRegisterMutation } from '@/query/register/registerMutation';
import { toast } from 'react-toastify';
import { isEqual } from 'lodash';
import ConfirmOTP from './ConfirmOTP';
import { useState } from 'react';
import CreateAccount from './CreateAccount';
import useTranslation from 'next-translate/useTranslation';
interface IRegisterForm {
  className?: string;
  onNext: () => void;
  step: number;
}

const RegisterForm: FC<IRegisterForm> = ({ className, onNext, step }) => {
  const [data, setData] = useState<any>({ email: '', key: '' });
  const { mutateAsync: registerMutation } = useRegisterMutation();
  const {
    setFieldValue,
    resetForm,
    setFieldTouched,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldError,
  } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Email không chính xác!').required('Vui lòng nhập email!'),
    }),
    onSubmit: (v) => {
      registerMutation(v)
        .then((response: any) => {
          if (response?.status === 'success') {
            toast.success('test');
            onNext();
          }
        })
        .catch(({ statusCode }) => {
          if (statusCode !== 200) {
            toast.error('Your account is already exist', { position: 'top-center' });
          }
        });
    },
  });

  const handleChange = ({ name, value }: { name: string; value: string | number }) => {
    setFieldValue(name, value);
  };

  const handleBlur = ({ name }: { name: string }) => setFieldTouched(name);

  const handleSetKey = ({ email, key }: { email: string; key: string }) => {
    setData({ email: email, key: key });
  };

  const { t } = useTranslation('register');

  return (
    <>
      {isEqual(step, 1) && (
        <form className={classNames('kl-register-form', className)} onSubmit={handleSubmit}>
          <h3 className="header">{t('header')}</h3>
          <div className="group">
            <Label isRequired className="label">
              {t('email')}
            </Label>
            <GroupInput
              className="container -mb-10"
              type="text"
              placeholder={t('placeholder')}
              name="email"
              value={values.email}
              error={errors.email}
              touched={touched.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <p className="notice">{t('otp')}</p>
            <p className="description">{t('description')}</p>

            <Button type="submit" fullWidth className="button">
              {t('button')}
            </Button>
          </div>
        </form>
      )}

      {isEqual(step, 2) && (
        <ConfirmOTP onNext={onNext} currentEmail={values?.email} onChangeKey={handleSetKey} />
      )}

      {isEqual(step, 3) && <CreateAccount data={data} />}
    </>
  );
};

export default RegisterForm;
