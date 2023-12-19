import { GroupInput } from '@components/compound';
import { Button, Label } from '@components/primitive';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { FC } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useValidateOtpMutation } from '@/query/forgotPassword/forgotPasswordMutation';
import useTranslation from 'next-translate/useTranslation';

interface IRegisterForm {
  className?: string;
  onNext: () => void;
  currentEmail: string;
  onChangeKey: ({ email, key }: { email: string; key: string }) => void;
}

const ConfirmOTP: FC<IRegisterForm> = ({ className, onNext, currentEmail, onChangeKey }) => {
  const { mutateAsync: otpMutation } = useValidateOtpMutation();

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
      email: currentEmail,
      otp: '',
    },
    validationSchema: Yup.object().shape({
      otp: Yup.string().required('Please input OTP Code!'),
    }),
    onSubmit: (v) => {
      otpMutation(v)
        .then((response: any) => {
          if (response?.status === 'success') {
            onChangeKey({ email: values?.email, key: response?.key });
            toast.success('Submit OTP is Correct');
            onNext();
          }
          if (response?.status === 'error') {
            toast.error('OTP code is not correct');
          }
        })
        .catch(({ statusCode }) => {
          if (statusCode !== 200) {
            toast.error('Invalid OTP', { position: 'top-center' });
            resetForm();
          }
        });
    },
  });

  const handleChange = ({ name, value }: { name: string; value: string | number }) => {
    setFieldValue(name, value);
  };

  const handleBlur = ({ name }: { name: string }) => setFieldTouched(name);
  const { t } = useTranslation('forgot');

  return (
    <form className={classNames('kl-register-form form -right', className)} onSubmit={handleSubmit}>
      <h3 className="header">{t('validate')}</h3>
      <div className="group">
        <Label isRequired className="label">
          OTP
        </Label>
        <GroupInput
          className="container -mb-10"
          type="text"
          placeholder={t('placeholderOTP')}
          name="otp"
          value={values.otp}
          error={errors.otp}
          touched={touched.otp}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <p className="description">{t('description')}</p>

        <Button type="submit" fullWidth className="button">
          {t('button')}
        </Button>
      </div>
    </form>
  );
};

export default ConfirmOTP;
