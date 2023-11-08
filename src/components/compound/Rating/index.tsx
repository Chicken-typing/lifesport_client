import MuiRating from '@mui/material/Rating';
import { FC } from 'react';
import classNames from 'classnames';

interface IRatingProps {
  className?: string;
  value: number;
  readOnly?: boolean;
  color?: 'primary' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
}

export const Rating: FC<IRatingProps> = ({ color, size, value, readOnly }) => {
  return (
    <MuiRating
      value={value}
      readOnly={readOnly}
      className={classNames('kl-rating', `-${size}`, `-${color}`)}
    />
  );
};

Rating.defaultProps = {
  color: 'primary',
  size: 'sm',
  readOnly: false,
};
