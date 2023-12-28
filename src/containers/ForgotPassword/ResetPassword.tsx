import { GroupInput } from '@components/compound';
import { Button, Label } from '@components/primitive';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { FC } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { isEqual } from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import { useResetPasswordMutation } from '@/query/forgotPassword/forgotPasswordMutation';

interface ICreateAccount {
  className?: string;
  data: { email: string; key: string };
}

const ResetPassword: FC<ICreateAccount> = ({ className, data }) => {
  const { mutateAsync: resetPasswordMutation } = useResetPasswordMutation();
  const router = useRouter();
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
      email: data?.email,
      key: data?.key,
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Please input yout password'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Confirmation password does not match')
        .required('Please confirm your password'),
    }),

    onSubmit: (v) => {
      resetPasswordMutation({ email: v.email, password: v.password, key: v.key })
        .then((response: any) => {
          if (response?.status === 'success') {
            toast.success('Create Account Successfully');
            router.push({
              pathname: '/login',
            });
          }
        })
        .catch((error) => console.log(error));

      resetForm();
    },
  });

  const handleChange = ({ name, value }: { name: string; value: string | number }) => {
    setFieldValue(name, value);
  };

  const handleBlur = ({ name }: { name: string }) => setFieldTouched(name);

  const { t } = useTranslation('forgot');

  return (
    <form className={classNames('kl-register-form form -right', className)} onSubmit={handleSubmit}>
      <h3 className="header">{t('createAccount')}</h3>
      <div className="group">
        <Label isRequired className="label">
          {t('password')}
        </Label>
        <GroupInput
          className="container -mb-10"
          type="password"
          placeholder={t('holderAccount.password')}
          name="password"
          value={values.password}
          error={errors.password}
          touched={touched.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <Label isRequired className="label">
          {t('confirm')}
        </Label>
        <GroupInput
          className="container -mb-10"
          type="password"
          placeholder={t('holderAccount.confirm')}
          name="confirmPassword"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          touched={touched.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <Button type="submit" fullWidth className="button">
          {t('send')}
        </Button>
      </div>
    </form>
  );
};

export default ResetPassword;
