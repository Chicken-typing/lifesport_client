import { GroupInput } from '@components/compound';
import { Button, Label } from '@components/primitive';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { FC } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useValidateOtpMutation } from '../../query/register/registerMutation';

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

    onSubmit: (v) => {
      otpMutation(v)
        .then((response: any) => {
          if (response?.status === 'success') {
            onChangeKey({ email: values?.email, key: response?.key });
            toast.success('test1');
            onNext();
          }
          if (response?.status === 'error') {
            toast.error('test1');
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

  return (
    <form className={classNames('kl-register-form form -right', className)} onSubmit={handleSubmit}>
      <h3 className="header">VALIDATE OTP</h3>
      <div className="group">
        <Label isRequired className="label">
          OTP
        </Label>
        <GroupInput
          className="container -mb-10"
          type="text"
          placeholder="Nhập email của bạn..."
          name="otp"
          value={values.otp}
          error={errors.otp}
          touched={touched.otp}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <p className="notice">A password will be sent to your email address.</p>
        <p className="description">
          Your personal data will be used to support your experience throughout this website, to
          manage access to your account, and for other purposes described in our privacy policy.
        </p>

        <Button type="submit" fullWidth className="button">
          ĐĂNG KÝ
        </Button>
      </div>
    </form>
  );
};

export default ConfirmOTP;
