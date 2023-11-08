import { FC } from 'react';
import classNames from 'classnames';

interface ILabel {
  htmlFor?: string;
  children: string;
  isRequired?: boolean;
  className?: string;
  textTransform?: 'unset' | 'uppercase' | 'lowercase' | 'capitalize';
}

export const Label: FC<ILabel> = ({ htmlFor, isRequired, children, className, textTransform }) => {
  return (
    <label htmlFor={htmlFor} className={classNames('kl-label', `-${textTransform}`, className)}>
      {children}
      {isRequired && <span className={classNames('kl-label-required', className)}>*</span>}
    </label>
  );
};

Label.defaultProps = {
  textTransform: 'unset',
  isRequired: false,
};
