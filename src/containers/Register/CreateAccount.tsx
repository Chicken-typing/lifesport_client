import { GroupInput } from '@components/compound';
import { Button, Label } from '@components/primitive';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { FC } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useCreateAccountMutation } from '../../query/register/registerMutation';
import { useRouter } from 'next/router';
import { isEqual } from 'lodash';
import useTranslation from 'next-translate/useTranslation';

interface ICreateAccount {
  className?: string;
  data: { email: string; key: string };
}

const CreateAccount: FC<ICreateAccount> = ({ className, data }) => {
  const { mutateAsync: createAccountMutation } = useCreateAccountMutation();
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
      name: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Please input your name!'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Please input yout password'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Confirmation password does not match')
        .required('Please confirm your password'),
    }),

    onSubmit: (v) => {
      createAccountMutation(v)
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

  const { t } = useTranslation('register');

  return (
    <form className={classNames('kl-register-form form -right', className)} onSubmit={handleSubmit}>
      <h3 className="header">{t('createAccount')}</h3>
      <div className="group">
        <Label isRequired className="label">
          {t('name')}
        </Label>
        <GroupInput
          className="container -mb-10"
          type="text"
          placeholder={t('holderAccount.name')}
          name="name"
          value={values.name}
          error={errors.name}
          touched={touched.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
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

export default CreateAccount;
