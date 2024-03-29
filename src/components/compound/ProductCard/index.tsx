import { Rating, Tooltip } from '@components/compound';
import { Badge, Button, KaImage, Link } from '@components/primitive';
import { IProduct } from '@interfaces/product';
import Skeleton from '@mui/material/Skeleton';
import { routes } from '@utils/routes';
import classNames from 'classnames';
import { get, trim } from 'lodash';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useAppDispatch } from '../../../store/hooks';
export interface IProductCardProps {
  data?: IProduct;
  isLoading?: boolean;
}

export const ProductCard: FC<IProductCardProps> = ({ data, isLoading = false }) => {
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
                  id: data?.id?.split('-')[2],
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

            {data?.percent_off && <Badge label={`${data?.percent_off}% OFF`} className="badge" />}
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
                    id: data?.id.split('-')[2],
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
                    {((data?.price && data?.price / 100) || 0).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 2,
                    })}
                  </span>
                )}
              </p>

              {/* <div className="buy">
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
              </div> */}
            </div>
            <div className="sold">{`Sold: ${data?.sold}`}</div>
          </>
        )}
      </div>
    </div>
  );
};
