import { subscribeThunk } from '@/kytesoft-client/store/app/thunks';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const subscribeSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});

export const useSubscribe = ({ onSuccess = () => null, onError = () => null } = {}) => {
  const dispatch = useDispatch();

  const subscribeForm = useFormik({
    initialValues: { email: '' },
    validationSchema: subscribeSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(subscribeThunk(values));
        onSuccess();
      } catch (error) {
        onError(error);
      }

      setSubmitting(false);
    },
  });

  return { subscribeForm };
};
