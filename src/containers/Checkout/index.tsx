import KsLayout from '@/layout';
import { Accordion, GroupInput, GroupTextarea } from '@components/compound';
import { Button, Label, Link } from '@components/primitive';
import { Autocomplete, createFilterOptions, FormControl, Radio, TextField } from '@mui/material';
import { map } from 'lodash';
import { useState } from 'react';
import { COUNTRIES, PAYMENT_METHOD } from './constants';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option: any) => option.country || option.state,
});

const Checkout = () => {
  const [expanded, setExpanded] = useState<string>(PAYMENT_METHOD[0].name);

  const { values, errors, touched, setFieldValue, resetForm, handleSubmit, setFieldTouched } =
    useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        companyName: '',
        country: '',
        streetName: '',
        address: '',
        city: '',
        state: '',
        postCode: '',
        phone: '',
        email: '',
        notes: '',
      },
      validationSchema: Yup.object().shape({
        firstName: Yup.string()
          .required('Họ không được để trống')
          .matches(
            /^(?=[a-zA-Z._]{2,6}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
            'Họ chỉ được sử dụng chữ cái, số, từ 2 đến 6  ký tự.',
          ),
        lastName: Yup.string()
          .required('Tên không được để trống')
          .matches(
            /^(?=[a-zA-Z._]{2,6}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
            'Tên chỉ được sử dụng chữ cái, số, từ 2 đến 6  ký tự.',
          ),
        companyName: Yup.string(),
        streetName: Yup.string().required('Tên đường không được để trống'),
        address: Yup.string().required('Địa chỉ không được để trống'),
        city: Yup.string().required('Thành phố không được để trống'),
        postCode: Yup.string().required('PostCode không được để trống'),
        phone: Yup.string()
          .required('Số điện thoại không được để trống')
          .matches(/(84|0[2|3|4|5|6|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không đúng định dạng.'),
        email: Yup.string()
          .email('Email không đúng định dạng')
          .required('Email không được để trống'),
        notes: Yup.string(),
      }),
      onSubmit: (v) => {
        resetForm();
      },
    });

  const handleChange = ({ name, value }: { name: string; value: string | number }) => {
    setFieldValue(name, value);
  };

  const handleBlur = ({ name }: { name: string }) => {
    setFieldTouched(name);
  };

  return (
    <KsLayout title="Thanh toán">
      <div className="kl-checkout">
        <div className="kl-container content">
          <div className="heading">
            <h3 className="title">Checkout</h3>
            <div className="description">
              Have a coupon?
              <Link href="/" className="link" title="">
                Click here to enter your code
              </Link>
            </div>
          </div>
          <div className="row wrapper">
            <div className="col-12 col-lg-7 kl-checkout-billing-details">
              <h3 className="title">Billing details</h3>
              <form className="kl-checkout-form">
                <div className="name">
                  <div className="group col-md-6 col-lg col-sm-12">
                    <Label isRequired className="label">
                      First name
                    </Label>
                    <GroupInput
                      type="text"
                      className="author"
                      name="firstName"
                      fadePlaceholderShown
                      value={values.firstName}
                      error={errors.firstName}
                      touched={touched.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="group col-md-6 col-lg col-sm-12">
                    <Label isRequired className="label">
                      Last name
                    </Label>
                    <GroupInput
                      type="text"
                      name="lastName"
                      className="author"
                      fadePlaceholderShown
                      value={values.lastName}
                      error={errors.lastName}
                      touched={touched.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                <div className="group col-md-4 col-lg col-sm-12">
                  <Label className="label">Company name (optional)</Label>
                  <GroupInput
                    type="text"
                    className="author"
                    name="companyName"
                    fadePlaceholderShown
                    value={values.companyName}
                    error={errors.companyName}
                    touched={touched.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <FormControl className="group col-md-4 col-lg col-sm-12">
                  <Label isRequired className="label">
                    Country / Region
                  </Label>

                  <Autocomplete
                    className="autocomplete"
                    id="countries"
                    options={COUNTRIES}
                    getOptionLabel={(option) => option.country}
                    filterOptions={filterOptions}
                    onChange={(_, { country }) => {
                      setFieldValue('country', country);
                    }}
                    renderInput={(params) => <TextField {...params} label="Select your country" />}
                  />
                </FormControl>

                <div className="group col-md-4 col-lg col-sm-12">
                  <Label isRequired className="label">
                    Street address
                  </Label>
                  <div className="address">
                    <GroupInput
                      type="text"
                      className="author"
                      placeholder="House number and street name"
                      fadePlaceholderShown
                      name="streetName"
                      value={values.streetName}
                      error={errors.streetName}
                      touched={touched.streetName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <GroupInput
                      type="text"
                      className="author"
                      placeholder="Apartment, suit, unit, etc. (optional)"
                      fadePlaceholderShown
                      name="address"
                      value={values.address}
                      error={errors.address}
                      touched={touched.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                <div className="group col-md-4 col-lg col-sm-12">
                  <Label isRequired className="label">
                    Town/City
                  </Label>
                  <GroupInput
                    type="text"
                    className="author"
                    fadePlaceholderShown
                    name="city"
                    value={values.city}
                    error={errors.city}
                    touched={touched.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <FormControl className="group col-md-4 col-lg col-sm-12">
                  <Label isRequired className="label">
                    State
                  </Label>
                  <Autocomplete
                    className="autocomplete"
                    id="state"
                    options={COUNTRIES}
                    getOptionLabel={(option) => option.state}
                    filterOptions={filterOptions}
                    onChange={(_, { state }) => {
                      setFieldValue('state', state);
                    }}
                    renderInput={(params) => <TextField {...params} label="Select your city" />}
                  />
                </FormControl>

                <div className="group col-md-4 col-lg col-sm-12">
                  <Label isRequired className="label">
                    Postcode
                  </Label>
                  <GroupInput
                    type="text"
                    className="author"
                    fadePlaceholderShown
                    name="postCode"
                    value={values.postCode}
                    error={errors.postCode}
                    touched={touched.postCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="group col-md-4 col-lg col-sm-12">
                  <Label isRequired className="label">
                    Phone
                  </Label>
                  <GroupInput
                    type="text"
                    className="author"
                    fadePlaceholderShown
                    name="phone"
                    value={values.phone}
                    error={errors.phone}
                    touched={touched.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="group col-md-4 col-lg col-sm-12">
                  <Label isRequired className="label">
                    Email address
                  </Label>
                  <GroupInput
                    type="text"
                    className="author"
                    fadePlaceholderShown
                    name="email"
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </form>

              <div className="additional">
                <h3 className="title">Additional Information</h3>
                <Label isRequired className="label">
                  Order notes (optional)
                </Label>
                <GroupTextarea
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  textareaClassName="kl-checkout-field"
                  className="kl-checkout-notes"
                  fadePlaceholderShown
                  name="notes"
                  value={values.notes}
                  error={errors.notes}
                  touched={touched.notes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-12 col-lg-5 kl-checkout-summary">
              <div className="content">
                <h3 className="title">Your order</h3>
                <div className="header group">
                  <span className="label">Product</span>
                  <span>Subtotal</span>
                </div>
                <div className="product group">
                  <span className="label">Orange & Cinnamon Spice × 1 </span>
                  <span>$617.31</span>
                </div>
                <div className="subtotal group">
                  <span className="label">Subtotal</span>
                  <span className="price">$617.31</span>
                </div>
                <div className="total group">
                  <span className="label">Total</span>
                  <span className="price">$617.31</span>
                </div>

                {map(PAYMENT_METHOD, ({ name, description }, idx) => (
                  <Accordion
                    key={`payment-method-${idx}`}
                    prefix={<Radio checked={expanded === name} color="success" />}
                    title={name}
                    isActive={expanded === name}
                    onChange={() => setExpanded(name)}
                    classes={{
                      root: 'accordion-root',
                      summaryRoot: 'accordion-summary-root',
                      summaryContent: 'accordion-summary-content',
                      detailRoot: 'accordion-detail-root',
                    }}
                  >
                    {description}
                  </Accordion>
                ))}

                <p className="note">
                  Your personal data will be used to process your order, support your experience
                  throughout this website, and for other purposes described in our privacy policy.
                </p>

                <Button className="button" fullWidth onClick={() => handleSubmit()}>
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </KsLayout>
  );
};

export default Checkout;
