import { createContactThunk } from '@/kytesoft-client/store/app/thunks';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const contactSchema = Yup.object().shape({
  name: Yup.string().required(),
  phone: Yup.string().required(),
  email: Yup.string().email().required(),
  message: Yup.string().required(),
});

export const useContacts = ({ onSuccess = () => null, onError = () => null } = {}) => {
  const dispatch = useDispatch();

  const contactForm = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
    validationSchema: contactSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(createContactThunk(values));
        onSuccess();
      } catch (error) {
        onError(error);
      }

      setSubmitting(false);
    },
  });

  return { contactForm };
};
