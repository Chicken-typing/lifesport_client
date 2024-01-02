import { ISidebarProps } from '@interfaces/sidebar';
import { Collapse, Slider } from '@mui/material';
import classNames from 'classnames';
import { map } from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { CATEGORIES } from './constants';

const Sidebar: FC<ISidebarProps> = ({ variant }) => {
  const router = useRouter();
  const { query } = router;

  const MIN_PRICE_DISTANCE = 5;

  const min = Number(query?.min || 75000);
  const max = Number(query?.max || 900000);

  const [options, setOptions] = useState<string[]>([
    'categories',
    'price',
    'type',
    'ingredients',
    'rating',
  ]);
  const [priceRange, setPriceRange] = useState<number[]>([min, max]);
  useEffect(() => {
    setPriceRange((prev) => {
      return min > max ? [max, min] : [min, max];
    });
  }, [min, max]);

  const handleChangePrice = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) return;

    activeThumb === 0
      ? setPriceRange([Math.min(newValue[0], priceRange[1] - MIN_PRICE_DISTANCE), priceRange[1]])
      : setPriceRange([priceRange[0], Math.max(newValue[1], priceRange[0] + MIN_PRICE_DISTANCE)]);
  };

  const handleToggleCollapse = (key: string) => {
    setOptions(
      !options.includes(key) ? [...options, key] : options?.filter((option) => option !== key),
    );
  };

  const { t } = useTranslation('products');

  return (
    <aside className={classNames('kl-products-sidebar', variant)}>
      <div className="categories option">
        <div className="header">
          <span className="overlay" onClick={() => handleToggleCollapse('categories')} />
          <h3 className="title">{t('category')}</h3>
          <i
            className={classNames(`fa-regular fa-chevron-up icon`, {
              '-down': !options.includes('categories'),
            })}
          />
        </div>

        <Collapse in={options.includes('categories')}>
          <ul className="kl-products-sidebar-categories">
            {map(CATEGORIES, ({ label, value }, idx) => (
              <li className="category" key={idx}>
                <div
                  className="item"
                  onClick={() => {
                    router.push({ query: { brand: value, page: 1 } }, undefined, {
                      shallow: true,
                    });
                  }}
                >
                  {label}
                </div>
              </li>
            ))}
          </ul>
        </Collapse>
      </div>

      <div className="price option">
        <div className="header">
          <span className="overlay" onClick={() => handleToggleCollapse('price')} />
          <h3 className="title">{t('price')}</h3>
          <i
            className={classNames(`fa-regular fa-chevron-up icon`, {
              '-down': !options.includes('price'),
            })}
          />
        </div>

        <Collapse in={options.includes('price')}>
          <div className="kl-products-sidebar-price">
            <Slider
              min={75000}
              max={900000}
              className="slider"
              getAriaLabel={() => 'Minimum distance'}
              value={priceRange}
              onChange={handleChangePrice}
              valueLabelDisplay="auto"
              disableSwap
              classes={{
                root: 'price-slider',
                rail: 'price-slider-rail',
                track: 'price-slider-track',
                thumb: 'price-slider-thumb',
              }}
            />

            <div className="wrapper">
              <span className="price">
                Price:
                <span className="range">
                  {(priceRange[0] / 100).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2,
                  })}
                  -
                  {(priceRange[1] / 100).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2,
                  })}
                </span>
              </span>
              <span
                className="action"
                onClick={() => {
                  router.push(
                    {
                      query: { ...query, min: priceRange[0], max: priceRange[1], page: 1 },
                    },
                    undefined,
                    { shallow: true },
                  );
                }}
              >
                FILTER
              </span>
            </div>
          </div>
        </Collapse>
      </div>
    </aside>
  );
};

export default Sidebar;
