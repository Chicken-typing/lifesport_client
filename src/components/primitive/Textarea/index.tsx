import { FC } from 'react';
import classNames from 'classnames';

interface ITextareaProps {
  value?: string | number;
  onChange?: ({ name, value }: { name: string; value: number | string }) => void;
  onBlur?: ({ name, value }: { name: string; value: string | number }) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  name?: string;
  id?: string;
}

export const Textarea: FC<ITextareaProps> = ({
  value,
  onChange = () => null,
  onBlur = () => null,
  placeholder,
  className,
  disabled,
  required,
  readOnly,
  name,
  id,
}) => {
  return (
    <textarea
      id={id}
      className={classNames('textarea', className)}
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
      name={name}
      value={value}
    />
  );
};

Textarea.defaultProps = {
  onChange: () => null,
  onBlur: () => null,
  readOnly: false,
  required: false,
  disabled: false,
};
