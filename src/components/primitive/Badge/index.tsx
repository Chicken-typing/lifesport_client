import classNames from 'classnames';
import { FC } from 'react';

interface IBadgeProps {
  color?: 'primary' | 'danger' | 'warning' | 'soft-primary' | 'soft-danger' | 'soft-warning';
  className?: string;
  circle?: boolean;
  label: string;
}

export const Badge: FC<IBadgeProps> = ({ color, circle, className, label }) => {
  return (
    <span className={classNames('kl-badge', `-${color}`, { '-circle': circle }, className)}>
      {label}
    </span>
  );
};

Badge.defaultProps = {
  label: 'badge',
  color: 'primary',
  className: '',
  circle: false,
};
