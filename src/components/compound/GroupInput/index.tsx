import { Input, Label } from '@components/primitive';
import { default as classNames } from 'classnames';
import { FormikErrors, FormikTouched } from 'formik';
import { FC, ReactNode } from 'react';

interface IInputProps {
  type?: 'text' | 'number' | 'password' | 'email';
  value?: string | number;
  onChange?: ({ name, value }: { name: string; value: string | number }) => void;
  onBlur?: ({ name, value }: { name: string; value: string | number }) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  inputClassName?: string;
  fieldClassName?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  name?: string;
  id?: string;
  gutterBottom?: boolean;
  Icon?: boolean;
  typeIcon?: ReactNode;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[];
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[];
  fadePlaceholderShown?: boolean;
  dividerStart?: boolean;
  dividerEnd?: boolean;
  nameButton?: string;
}

export const GroupInput: FC<IInputProps> = ({
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  label,
  className,
  inputClassName,
  disabled,
  required,
  readOnly,
  autoFocus,
  autoComplete,
  name,
  id,
  gutterBottom,
  Icon,
  typeIcon,
  startAdornment,
  endAdornment,
  size,
  touched,
  error,
  fieldClassName,
  fadePlaceholderShown,
  dividerStart,
  dividerEnd,
  nameButton,
}) => {
  const invalid: Boolean = !!error && !!touched;

  return (
    <div
      className={classNames(
        'kl-input',
        { '-gutter-bottom': gutterBottom },
        { '-has-adornment': !!startAdornment || !!endAdornment },
        { '-invalid': invalid },
        { '-disabled': disabled },
        { '-has-icon': Icon },
        { 'fade-placeholder': fadePlaceholderShown },
        { '-divider': !!dividerStart || !!dividerEnd },
        `-${size}`,
        className,
      )}
    >
      {label && (
        <Label htmlFor={id} className="label" isRequired={required}>
          {label}
        </Label>
      )}

      <div className={classNames('field', fieldClassName)}>
        {startAdornment && <div className="adornment -start">{startAdornment}</div>}
        {dividerStart && <span className="divider" />}
        <Input
          type={type}
          className={inputClassName}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          name={name}
          value={value}
          id={id}
        />
        {Icon && <button className="search-icon">{typeIcon}</button>}
        {endAdornment && <div className="adornment -end">{endAdornment}</div>}
        {dividerEnd && (
          <div className="btn-group">
            <span className="divider" />
            <button className="btn-find">{nameButton}</button>
          </div>
        )}
      </div>
      {invalid && <span className="invalid">{error as string}</span>}
    </div>
  );
};

GroupInput.defaultProps = {
  type: 'text',
  onChange: () => null,
  onBlur: () => null,
  autoComplete: '0',
  autoFocus: false,
  readOnly: false,
  required: false,
  disabled: false,
  gutterBottom: false,
  Icon: false,
  typeIcon: undefined,
  endAdornment: undefined,
  startAdornment: undefined,
  size: 'md',
  fadePlaceholderShown: false,
  dividerStart: false,
  dividerEnd: false,
  nameButton: '',
};
