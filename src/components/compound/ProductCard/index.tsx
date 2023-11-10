import { Rating, Tooltip } from '@components/compound';
import { Badge, Button, KaImage, Link } from '@components/primitive';
import { IProduct } from '@interfaces/product';
import Skeleton from '@mui/material/Skeleton';
import { routes } from '@utils/routes';
import classNames from 'classnames';
import { get, trim, isEmpty } from 'lodash';
import { FC, useEffect } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { addProduct } from '@/store/cart/slice';
import { useRouter } from 'next/router';
export interface IProductCardProps {
  data?: IProduct;
  isLoading?: boolean;
}

export const ProductCard: FC<IProductCardProps> = ({ data, isLoading = false }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  if (!data) {
    return null;
  }

  return (
    <div className={classNames('ks-product-card', { '-loading': isLoading })}>
      <div className="thumbnail">
        {!isLoading ? (
          <>
            <Link
              title={data?.name || 'product'}
              href={{
                pathname: routes.PRODUCT,
                query: {
                  id: data?.id,
                },
              }}
              className="images"
            >
              <KaImage
                src={trim(get(data, 'thumbnail[0]', get(data, 'thumbnail[1]', '')))}
                alt={trim(get(data, 'thumbnail[0]', get(data, 'thumbnail[1]', '')))}
                objectFit="cover"
                className="image -main"
                ratio="square"
              />
              <KaImage
                src={trim(get(data, 'thumbnail[1]', get(data, 'thumbnail[0]', '')))}
                alt={trim(get(data, 'thumbnail[1]', get(data, 'thumbnail[0]', '')))}
                objectFit="cover"
                className="image -secondary"
              />
            </Link>

            {data?.amount_off && (
              <Badge label={`Sale ${data?.amount_off / 10}$ `} className="badge" />
            )}

            {data?.percent_off && (
              <Badge label={`${data?.percent_off * 100}% OFF`} className="badge" />
            )}

            <div className="actions">
              <Button className="button" iconOnly variant="contained" color="light">
                <Tooltip title="Yêu thích" placement="left" arrow>
                  <span className="icon">
                    <i className="fa-light fa-heart icon" />
                  </span>
                </Tooltip>
              </Button>

              <Button className="button" iconOnly variant="contained" color="light">
                <Tooltip title="Xem ngay" placement="left" arrow>
                  <span className="icon">
                    <i className="fa-light fa-magnifying-glass-plus" />
                  </span>
                </Tooltip>
              </Button>
            </div>
          </>
        ) : (
          <Skeleton width="100%" height="100%" variant="rectangular" animation="wave" />
        )}
      </div>

      <div className="content">
        {!isLoading && (
          <>
            <div className="rating">
              <Rating value={Number(data?.rating) || 5} readOnly />
            </div>

            <div className="name">
              <Link
                title={data?.name || 'product'}
                className="link"
                href={{
                  pathname: routes.PRODUCT,
                  query: {
                    id: data?.id,
                  },
                }}
              >
                {data?.name}
              </Link>
            </div>

            <div className="footer">
              <p className="price">
                {data?.amount_off || data?.percent_off ? (
                  <>
                    <span className="after-sale">
                      {(data?.sale_off / 100).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                      })}
                    </span>

                    <span className="sale">
                      {(data?.price / 100).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </>
                ) : (
                  <span className="primitive">
                    {(data?.price / 100).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 2,
                    })}
                  </span>
                )}
              </p>

              <div className="buy">
                <Button
                  className="button"
                  iconOnly
                  variant="outlined"
                  noBorder
                  // onClick={() => dispatch(addProduct({ product: data, quantity: 1 }))}
                  onClick={() =>
                    router.push({
                      pathname: routes.PRODUCT,
                      query: {
                        id: data?.id,
                      },
                    })
                  }
                >
                  <Tooltip title="View Detail" placement="top" arrow>
                    <i className="fa-light fa-bag-shopping icon" />
                  </Tooltip>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
