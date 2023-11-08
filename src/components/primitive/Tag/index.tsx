import classNames from 'classnames';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface ITagProps {
  className?: string;
  label: string;
  link?: string;
  onClick?: () => void;
  hasUnderline?: boolean;
}

export const Tag: FC<ITagProps> = ({ label, className, link, onClick, hasUnderline }) => {
  const router = useRouter();

  const handleClick = () => {
    if (!!onClick) onClick();
    if (!!link) router.push(link);
  };

  return (
    <span
      title={label}
      onClick={handleClick}
      className={classNames('kl-tag', { '-underline': hasUnderline }, className)}
    >
      {label}
    </span>
  );
};

Tag.defaultProps = {
  className: '',
  link: undefined,
  onClick: () => null,
};
