import { Button, Link, KaImage } from '@components/primitive';
import { GroupInput, SweetModal } from '@components/compound';
import { BRAND } from './constant';
import { map } from 'lodash';
import { useSubscribeMutation } from '@/query/subscribers/subscribeMutation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, ReactNode } from 'react';
import useTranslation from 'next-translate/useTranslation';

interface IService {
  classname: string;
  title: string;
  description: string;
}

interface IAbout {
  label: string;
  route: string;
}

interface IContact {
  address: string;
  phone1: string;
  phone2: string;
  web: string;
}

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const { mutateAsync: subscribeMutation, isLoading } = useSubscribeMutation();
  const [isOpenModal, setIsOpenModal] = useState<'error' | 'success' | false>(false);

  const { values, errors, touched, setFieldValue, resetForm, handleSubmit } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('').required('').trim(),
    }),

    onSubmit: ({ email }) => {
      subscribeMutation(email)
        .then(() => {
          setIsOpenModal('success');
          resetForm();
        })
        .catch(({ statusCode }) => {
          statusCode !== 200 && setIsOpenModal('error');
        });
    },
  });

  const handleChange = ({ name, value }: { name: string; value: string | number }) => {
    setFieldValue(name, value);
  };

  const { t } = useTranslation('common');
  const service = t('footer.services', {}, { returnObjects: true });
  const about = t('footer.about_us.content', {}, { returnObjects: true });
  const shop = t('footer.shop.content', {}, { returnObjects: true });
  const help_center = t('footer.help_center.content', {}, { returnObjects: true });
  const contact_link = t('footer.contact_link.content', {}, { returnObjects: true });
  const buttons: ReactNode[] = [
    <Button
      key="ok"
      variant="contained"
      className="button"
      onClick={() => setIsOpenModal(false)}
      color={isOpenModal === 'success' ? 'success' : 'danger'}
      backgroundHover={isOpenModal === 'success' ? 'success' : 'danger'}
    >
      OK
    </Button>,
  ];

  return (
    <footer className="kl-footer">
      <section className="kl-footer-contact">
        <div className="kl-container wrapper">
          {/* <div className="images">
            <KaImage src="/images/ft1_decor1.png" alt="" objectFit="cover" className="image" />
          </div> */}
          <div className="title">
            <div className="heading">{t('footer.get_info.title')}</div>
            <div className="description">{t('footer.get_info.description')}</div>
          </div>
          <div className="search">
            <GroupInput
              type="text"
              placeholder={t('footer.get_info.placeholder')}
              className="container"
              name="email"
              value={values.email}
              touched={touched.email}
              onChange={handleChange}
              fadePlaceholderShown
              endAdornment={
                <Button
                  className="btn"
                  onClick={() => {
                    errors.email ? setIsOpenModal('error') : handleSubmit();
                  }}
                  isLoading={isLoading}
                >
                  {t('footer.get_info.button')}
                </Button>
              }
            />
          </div>
        </div>
      </section>

      <section className="kl-footer-services">
        <div className="kl-container wrapper">
          <div className="row">
            {map(service, ({ classname, description, title }: IService, idx) => (
              <div className="col-12 col-sm-6 col-md-3 col-lg info" key={`service-item-${idx}`}>
                <div className="kl-footer-service">
                  <span className="icon">
                    <i className={classname}></i>
                  </span>
                  <p className="heading">{title}</p>
                  <p className="description">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="images">
          <KaImage src="/images/ft1_decor2.png" className="image" objectFit="cover" alt="image" />
        </div> */}
      </section>

      <div className="top">
        <div className="kl-container">
          <div className="row">
            <div className="col-12 col-md-3 col-lg-3">
              <div className="footer-widget">
                <KaImage src="/images/logo.png" className="logo" objectFit="contain" alt="image" />
              </div>
            </div>
            <div className="col-12 order-md-12 col-md-3 col-lg-2">
              <div className="footer-widget">
                <h3 className="heading">{t('footer.about_us.title')}</h3>
                <ul className="menu">
                  {map(about, ({ label, route }: IAbout) => (
                    <li className="item" key={`footer-menu-item-${label}`}>
                      <Link
                        href={route}
                        textTransform="capitalize"
                        color="primary"
                        className="link"
                        title={label}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-12 order-md-12 col-md-3 col-lg-2">
              <div className="footer-widget">
                <h3 className="heading">Store</h3>
                <ul className="menu">
                  {map(shop, ({ label, route }: IAbout) => (
                    <li className="item" key={`footer-menu-item-${label}`}>
                      <Link
                        href={route}
                        textTransform="capitalize"
                        color="primary"
                        className="link"
                        title={label}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-12 order-md-12 col-md-3 col-lg-2">
              <div className="footer-widget">
                <h3 className="heading">Help Center</h3>
                <ul className="menu">
                  {map(help_center, ({ label, route }: IAbout) => (
                    <li className="item" key={`footer-menu-item-${label}`}>
                      <Link
                        href={route}
                        textTransform="capitalize"
                        color="primary"
                        className="link"
                        title={label}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-12 col-md-8 col-lg-3 order-lg-12">
              <div className="footer-widget">
                <h3 className="heading">Get in touch</h3>
                {map(contact_link, ({ address, phone1, phone2, web }: IContact) => (
                  <div className="address" key={`footer-contact-item-${address}`}>
                    Address: {address}
                    <br />
                    Hotline: {phone1}- {phone2}
                    <br />
                    Web: {web}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="middle">
        <span className="title">PAYMENTS WE ACCEPT</span>
        <KaImage src="/images/payment.png" className="image" objectFit="cover" alt="image" />
      </div>

      <div className="kl-container wrapper">
        <div className="bottom">
          <div className="title">
            <p>Copyright © 2023 Life Travel. All rights reserved</p>
          </div>
          <div className="item">
            <div className="brand">
              {map(BRAND, ({ className }) => (
                <Button
                  key={`footer-menu-item-${className}`}
                  className="button"
                  iconOnly
                  variant="outlined"
                  noBorder
                >
                  <span className="icon">
                    <i className={className} />
                  </span>
                </Button>
              ))}
            </div>

            <div className="scroll" onClick={scrollToTop}>
              <span className="title">Back to top</span>
              <Button iconOnly variant="outlined" className="icon" noBorder>
                <i className="fa-sharp fa-light fa-arrow-up" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <SweetModal
        type={isOpenModal === 'error' ? 'error' : 'success'}
        description={
          isOpenModal === 'error' ? 'Định dạng email không đúng' : 'Email của bạn đã được gửi đi'
        }
        handleOpen={Boolean(isOpenModal)}
        handleClose={() => setIsOpenModal(false)}
        button={buttons}
      />
    </footer>
  );
};

export default Footer;
