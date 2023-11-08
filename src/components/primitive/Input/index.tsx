import { default as classNames } from 'classnames';
import { FC } from 'react';

interface IInputProps {
  type?: 'text' | 'number' | 'password' | 'email';
  value?: string | number;
  onChange?: ({ name, value }: { name: string; value: number | string }) => void;
  onBlur?: ({ name, value }: { name: string; value: string | number }) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  name?: string;
  id?: string;
}

export const Input: FC<IInputProps> = ({
  type,
  value,
  onChange = () => null,
  onBlur = () => null,
  placeholder,
  className,
  disabled,
  required,
  readOnly,
  autoFocus,
  autoComplete,
  name,
  id,
}) => {
  return (
    <input
      type={type}
      id={id}
      className={classNames('input', className)}
      onChange={
        !disabled ? (e) => onChange({ name: e.target.name, value: e.target.value }) : () => null
      }
      onBlur={
        !disabled ? (e) => onBlur({ name: e.target.name, value: e.target.value }) : () => null
      }
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      readOnly={readOnly}
      autoComplete="off"
      autoFocus={autoFocus}
      name={name}
      value={value}
    />
  );
};

Input.defaultProps = {
  type: 'text',
  onChange: () => null,
  onBlur: () => null,
  autoComplete: '0',
  autoFocus: false,
  readOnly: false,
  required: false,
  disabled: false,
};
