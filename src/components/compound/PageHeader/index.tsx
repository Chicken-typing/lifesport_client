import { FC, ReactNode } from 'react';
import { Breadcrumbs } from '@mui/material';
import { map } from 'lodash';
import useCheckErrorImage from '@/hooks/useCheckErrorImage';
import classNames from 'classnames';
interface IPageHeaderProps {
  title?: string;
  breadcrumbs?: ReactNode[];
  background?: string;
  overlay?: boolean;
  color?: 'primary' | 'secondary' | 'black' | 'white' | string;
  colorTitle?: 'primary' | 'secondary' | 'black' | 'white' | string;
}

export const PageHeader: FC<IPageHeaderProps> = ({
  title,
  breadcrumbs,
  background,
  overlay = false,
  color,
  colorTitle,
}) => {
  const { isError, imageUrl } = useCheckErrorImage(background || '');

  return (
    <div
      className="kl-page-header"
      style={{
        backgroundImage: `url(${!isError ? imageUrl : 'none'})`,
      }}
    >
      {overlay && <div className="overlay"></div>}
      <div className="kl-container wrapper">
        {title && <h1 className={classNames('title', { [`-${color}`]: colorTitle })}>{title}</h1>}
        <Breadcrumbs className={classNames('breadcrumbs', { [`-${color}`]: color })}>
          {map(breadcrumbs, (component) => component)}
        </Breadcrumbs>
      </div>
    </div>
  );
};
