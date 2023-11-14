import { FC, useRef, useState } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Label, Link, Button } from '@components/primitive';
import { GroupInput } from '@components/compound';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useLoginMutation } from '@/query/login/loginMutation';
import { cookieStorage } from '../../utils/cookieStorage';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useRouter } from 'next/router';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { login } from '@/store/user/slice';
import { decodeToken } from '../../utils/decode';
import useTranslation from 'next-translate/useTranslation';

interface ILoginFormProps {
  className?: string;
}

const LoginForm: FC<ILoginFormProps> = ({ className }) => {
  const { mutateAsync: loginMutation } = useLoginMutation();
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleSubmitCaptcha = (event: any) => {
    event.preventDefault();
    // Execute the reCAPTCHA when the form is submitted
    recaptchaRef?.current?.execute();
  };
  const { setFieldValue, resetForm, setFieldTouched, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: Yup.object().shape({
        email: Yup.string().email('Email không chính xác!').required('Vui lòng nhập email!'),
        password: Yup.string().required('Vui lòng nhập mật khẩu!'),
      }),
      onSubmit: (v) => {
        handleSubmitCaptcha;
        loginMutation(v).then((response: any) => {
          if (response) {
            cookieStorage.setTokens({
              accessToken: response._token,
              refreshToken: response._token,
            });
            const token = response._token;
            if (token) {
              const decoded: any = decodeToken(token);
              if (decoded?.role === 'master_admin' || decoded?.role === 'admin') {
                router.push({
                  pathname: '/admin',
                });
              } else {
                dispatch(login(decoded));
                router.push({
                  pathname: '/',
                });
              }
            }
          }
        });

        resetForm();
      },
    });

  const handleChange = ({ name, value }: { name: string; value: string | number }) => {
    setFieldValue(name, value);
  };

  const handleBlur = ({ name }: { name: string }) => setFieldTouched(name);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const onReCAPTCHAChange = async (captchaCode: any) => {
    if (!captchaCode) {
      return;
    }
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          email: values.email,
          captcha: captchaCode,
          password: values.password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // If the response is ok than show the success alert

        setDisabled(false);
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error?.message || 'Something went wrong');
    } finally {
      recaptchaRef?.current?.reset();
    }
  };

  const { t } = useTranslation('login');

  return (
    <form className={classNames('kl-login-form', className)} onSubmit={handleSubmit}>
      <h3 className="header">{t('title')}</h3>
      <div className="group">
        <Label isRequired className="label">
          {t('email')}
        </Label>
        <GroupInput
          className="container -mb-10"
          type="email"
          placeholder={t('placeholder.email')}
          fadePlaceholderShown
          name="email"
          value={values.email}
          error={errors.email}
          touched={touched.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <Label isRequired className="label">
          {t('password')}
        </Label>
        <GroupInput
          className="container -mb-10"
          placeholder={t('placeholder.password')}
          type="password"
          name="password"
          value={values.password}
          error={errors.password}
          touched={touched.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className="actions">
          <FormControlLabel
            control={<Checkbox size="small" color="default" />}
            className="icon"
            label="Remember me"
          />
          <Link className="link" href="/" title="forgot-password">
            {t('forgot')}
          </Link>
        </div>

        <ReCAPTCHA
          style={{ display: disabled ? 'inline-block' : 'none', marginBottom: '30px' }}
          // style={{ display: 'inline-block', marginBottom: '30px' }}
          theme="light"
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
          onChange={onReCAPTCHAChange}
        />

        <Button disabled={disabled} type="submit" fullWidth className="button">
          {t('button')}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
