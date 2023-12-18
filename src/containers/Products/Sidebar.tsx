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

  const minPrice = Number(query?.minPrice || 75000);
  const maxPrice = Number(query?.maxPrice || 900000);
  const brand = String(query?.brand || undefined);
  const rating = query?.rating || [];

  const [options, setOptions] = useState<string[]>([
    'categories',
    'price',
    'type',
    'ingredients',
    'rating',
  ]);
  const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice]);
  useEffect(() => {
    // Đảo ngược giá trị minPrice và maxPrice nếu minPrice lớn hơn maxPrice
    setPriceRange((prev) => {
      return minPrice > maxPrice ? [maxPrice, minPrice] : [minPrice, maxPrice];
    });
  }, [minPrice, maxPrice]);

  const handleChangePrice = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) return;

    activeThumb === 0
      ? setPriceRange([Math.min(newValue[0], priceRange[1] - MIN_PRICE_DISTANCE), priceRange[1]])
      : setPriceRange([priceRange[0], Math.max(newValue[1], priceRange[0] + MIN_PRICE_DISTANCE)]);
  };

  const handleToggleCollapse = (key: string) => {
    setOptions(
      !options.includes(key) ? [...options, key] : options.filter((option) => option !== key),
    );
  };

  //   checked,
  //   value,
  //   name,
  //   arr,
  // }: {
  //   checked: boolean;
  //   value: string;
  //   name: string;
  //   arr: string | string[];
  // }) => {
  //   if (name === 'price' && checked) {
  //     const [newMinPrice, newMaxPrice] = value.split(',');
  //     setPriceRange([Number(newMinPrice), Number(newMaxPrice)]);
  //   }
  //   if (!checked) {
  //     if (isArray(arr)) {
  //       const index = arr.indexOf(value);
  //       if (index !== -1) arr.splice(index, 1);
  //     }
  //     return router.push({
  //       query: {
  //         ...query,
  //         [name]: [...(isArray(arr) ? arr : [])],
  //         page: 1,
  //       },
  //     });
  //   } else {
  //     router.push({
  //       query: {
  //         ...query,
  //         page: 1,
  //         [name]: checked ? [value as string, ...(isArray(arr) ? arr : [arr])] : [],
  //         minPrice: name === 'price' ? priceRange[0] : minPrice,
  //         maxPrice: name === 'price' ? priceRange[1] : maxPrice,
  //       },
  //     });
  //   }
  // };

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
                    router.push({ query: { ...query, brand: value, page: 1 } });
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
              max={1000000}
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
                  router.push({
                    query: { ...query, minPrice: priceRange[0], maxPrice: priceRange[1], page: 1 },
                  });
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
