import KsLayout from '@/layout';
import { useContactMutation } from '@/query/contacts/contactMutation';
import { GroupInput, GroupTextarea, SweetModal } from '@components/compound';
import { Button, Link } from '@components/primitive';
import ClockIcon from '@svg/contact/hours.svg';
import LocationIcon from '@svg/contact/location.svg';
import MailIcon from '@svg/contact/mail.svg';
import { routes } from '@utils/routes';
import { NAME_SCHEMA, PHONE_SCHEMA } from '@utils/validations/common';
import { useFormik } from 'formik';
import { ReactNode, useState } from 'react';
import * as Yup from 'yup';
const Contact = () => {
  const { mutateAsync: contactMutation, isLoading } = useContactMutation();
  const [isOpenModal, setIsOpenModal] = useState<'error' | 'success' | false>(false);
  const { values, errors, touched, setFieldValue, resetForm, handleSubmit, setFieldTouched } =
    useFormik({
      initialValues: {
        name: '',
        phone: '',
        email: '',
        message: '',
      },
      validationSchema: Yup.object().shape({
        name: NAME_SCHEMA,
        phone: PHONE_SCHEMA,
        email: Yup.string()
          .email('Email không đúng định dạng')
          .required('Email không được để trống')
          .trim(),
        message: Yup.string().required('Tin nhắn không được để trống'),
      }),
      onSubmit: (e) => {
        contactMutation(e)
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

  const handleBlur = ({ name }: { name: string }) => {
    setFieldTouched(name);
  };

  const breadcrumbs: ReactNode[] = [
    <Link href={routes.HOME} title="homepage" key="homepage" className="kl-page-header-link">
      Home Page
    </Link>,
    <p className="kl-page-header-text" key="contact">
      Contact
    </p>,
  ];

  const buttons: ReactNode[] = [
    <Button
      key="ok"
      variant="contained"
      className="button"
      onClick={() => setIsOpenModal(false)}
      color={isOpenModal === 'success' ? 'success' : 'danger'}
    >
      OK
    </Button>,
  ];

  return (
    <KsLayout
      title="Liên hệ"
      hasPageHeader
      pageHeaderTitle="Contact"
      hasOverlay
      breadcrumbsColor="white"
      pageHeaderBackground="https://kickstart.bikeexif.com/wp-content/uploads/2023/07/bmw-ce-02-electric-bike-7.jpg"
      breadcrumbs={breadcrumbs}
      colorTitle="white"
    >
      <div className="kl-contact kl-container">
        <section className="kl-contact-info">
          <h2 className="heading">Get In Touch</h2>
          <div className="details">
            <div className="email item">
              <h5 className="title">Contact</h5>
              <div className="text">
                T: + (406) 555-0120
                <br />
                E: support@example.com
              </div>
              <MailIcon className="icon" />
            </div>
            <div className="hours item">
              <h5 className="title">Hours</h5>
              <div className="text">
                <span className="day">Mon-Sat:</span>
                7.00 am – 8.00 pm
                <br />
                <span className="day">Sunday:</span>
                8.00 am – 6.00 pm
              </div>
              <ClockIcon className="icon" />
            </div>
            <div className="location item">
              <h5 className="title">Location</h5>
              <div className="text">
                2972 Westheimer Rd. Santa Ana,
                <br />
                Illinois, USA
              </div>
              <LocationIcon className="icon" />
            </div>
          </div>

          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4854676752066!2d106.76933817488357!3d10.850632389302703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2sus!4v1698836129641!5m2!1svi!2sus"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="frame"
            />
          </div>

          <div className="message">
            <h2 className="heading">Leave Us a Message</h2>
            <p className="text">
              Fill all information details to consult with us to get sevices from us
            </p>

            <form className="form" onSubmit={handleSubmit}>
              <div className="container">
                <GroupInput
                  type="text"
                  placeholder="Name *"
                  className="group"
                  name="name"
                  onBlur={handleBlur}
                  fadePlaceholderShown
                  value={values.name}
                  error={errors.name}
                  touched={touched.name}
                  onChange={handleChange}
                />
                <GroupInput
                  type="text"
                  placeholder="Phone *"
                  className="group"
                  name="phone"
                  onBlur={handleBlur}
                  fadePlaceholderShown
                  value={values.phone}
                  error={errors.phone}
                  touched={touched.phone}
                  onChange={handleChange}
                />
                <GroupInput
                  type="text"
                  placeholder="Email *"
                  className="group"
                  name="email"
                  onBlur={handleBlur}
                  fadePlaceholderShown
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
                  onChange={handleChange}
                />
                <GroupTextarea
                  className="group"
                  placeholder="Enter your message...."
                  name="message"
                  onBlur={handleBlur}
                  fadePlaceholderShown
                  value={values.message}
                  error={errors.message}
                  touched={touched.message}
                  onChange={handleChange}
                />
              </div>
              <Button
                type="submit"
                endAdornment={<i className="fa-solid fa-chevron-right fa-xs" />}
                color="primary"
                className="button"
                backgroundHover="dark"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Send Your Message
              </Button>
            </form>
          </div>
        </section>

        <SweetModal
          description={
            isOpenModal === 'error'
              ? 'Gửi thông tin thất bại'
              : 'Cảm ơn đã đóng góp ý kiến về chúng tôi. Hãy kiểm tra Email của bạn để xem thông tin chi tiết'
          }
          type={isOpenModal === 'error' ? 'error' : 'success'}
          handleOpen={Boolean(isOpenModal)}
          handleClose={() => setIsOpenModal(false)}
          button={buttons}
        />
      </div>
    </KsLayout>
  );
};

export default Contact;
