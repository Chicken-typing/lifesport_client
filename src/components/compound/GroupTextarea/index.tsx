import { Textarea } from '@components/primitive';
import classNames from 'classnames';
import { FormikErrors, FormikTouched } from 'formik';
import { FC } from 'react';

interface IGroupTextareaProps {
  className?: string;
  textareaClassName?: string;
  labelClassName?: string;
  label?: string;
  onChange?: ({ name, value }: { name: string; value: string | number }) => void;
  onBlur?: ({ name, value }: { name: string; value: string | number }) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[];
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  gutterBottom?: boolean;
  readOnly?: boolean;
  value?: string;
  fadePlaceholderShown?: boolean;
}

export const GroupTextarea: FC<IGroupTextareaProps> = ({
  className,
  textareaClassName,
  labelClassName,
  label,
  onChange,
  onBlur,
  placeholder,
  disabled,
  required,
  name,
  id,
  touched,
  error,
  gutterBottom,
  readOnly,
  value,
  fadePlaceholderShown,
}) => {
  const invalid = !!error && !!touched;

  return (
    <div
      className={classNames(
        'kl-textarea',
        { '-gutter-bottom': gutterBottom },
        { '-invalid': invalid },
        { '-disabled': disabled },
        { 'fade-placeholder': fadePlaceholderShown },
        className,
      )}
    >
      {label && (
        <label htmlFor={id} className={classNames('label', labelClassName)}>
          {label}
        </label>
      )}
      <Textarea
        id={id}
        name={name}
        className={textareaClassName}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        readOnly={readOnly}
      />
      {invalid && <span className="invalid">{error as string}</span>}
    </div>
  );
};

GroupTextarea.defaultProps = {};
