import * as Yup from 'yup';

export const NAME_SCHEMA = Yup.string()
  .required('Name is required')
  .matches(/^[\p{L}\p{M}\s.'-]+$/u, 'Invalid Name');

export const USERNAME_SCHEMA = Yup.string()
  .required()
  .test(
    'Kiểm tra dấu chấm',
    'Tên đăng nhập không được có dấu chấm liên tiếp hoặc dấu chấm ở cuối',
    (value) => !value.includes('..') && !value.endsWith('.'),
  )
  .matches(/^[a-z0-9.]+$/, 'Tên người dùng chỉ được chứa chữ cái, số hoặc dấu chấm');

export const PHONE_SCHEMA = Yup.string()
  .required('Số điện thoại không được để trống')
  .matches(
    /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    'Số điện thoại phải có định dạng số điện thoại Việt Nam',
  );
