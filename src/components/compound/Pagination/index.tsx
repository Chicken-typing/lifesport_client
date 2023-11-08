import classNames from 'classnames';
import { FC } from 'react';
import usePagination from '@mui/material/usePagination';
import { map } from 'lodash';

interface IPaginationProps {
  count?: number;
  page?: number;
  onChange?: (page: number) => void;
  className?: string;
}

export const Pagination: FC<IPaginationProps> = ({
  count,
  page,
  onChange = () => null,
  className,
}) => {
  const { items } = usePagination({
    count: count,
    page: page,
    onChange: (event: unknown, page) => onChange(page),
    hidePrevButton: page === 1,
    hideNextButton: page === count,
  });
  return (
    <nav className={classNames('kl-pagination', className)}>
      {count !== 0 ? (
        <ul className="list">
          {map(items, ({ page, type, selected, ...item }, index) => {
            let children = null;
            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              children = '…';
            } else if (type === 'page') {
              children = (
                <button
                  type="button"
                  className={classNames('page _text-font', {
                    '-selected': selected,
                  })}
                  {...item}
                >
                  {page}
                </button>
              );
            } else if (type === 'previous') {
              children = (
                <button className="action _text-font" type="button" {...item}>
                  PREV
                </button>
              );
            } else {
              children = (
                <button className="action _text-font" type="button" {...item}>
                  NEXT
                </button>
              );
            }
            return (
              <li className="item" key={index}>
                {children}
              </li>
            );
          })}
        </ul>
      ) : null}
    </nav>
  );
};
