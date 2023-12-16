import React from 'react';
import { Accordion } from '@components/compound';
import { useInvoicesUserQuery } from '../../query/invoices/get-userInvoices';
import { useRouter } from 'next/router';
import { TypeInvoices } from '@/query/invoices/get-invoices';
import { cookieStorage } from '@utils/cookieStorage';
import { decodeToken } from '@utils/decode';
import { map, size, isEmpty } from 'lodash';
import { KaImage } from '@components/primitive';
import KsLayout from '@/layout';
import Skeleton from '@mui/material/Skeleton';
import { changeColor } from '@utils/changeColor';
import { format } from 'date-fns';

function Transaction() {
  const router = useRouter();
  const { query } = router;
  const token = cookieStorage?.getAccessTokenInfo();
  const decoded = decodeToken(token || '');
  // const type = (query?.type as TypeInvoices) || 'all';
  const id = decoded?.id;

  const { data: invoices, isFetching } = useInvoicesUserQuery({ id, type: 'inbound' });
  console.log('invoices', invoices);
  return (
    <KsLayout title="Transaction">
      <div className="kl-transaction">
        <h2 className="title">Transaction History</h2>

        <div className="container-list">
          {!isFetching ? (
            map(invoices?.order_lists, (item) => (
              <Accordion className="accordion" key={item.id} title={`Order ID: ${item.id}`}>
                <div className="wrap">
                  <ul className="products-temp">
                    <div className="user-info">
                      <div className="first">
                        <p className="name info">Name: {item?.name}</p>
                        <p className="email info">Email: {item?.email}</p>
                        <p className="phone info">Phone: {item?.phone}</p>
                      </div>

                      <div className="second">
                        <p className="address info">
                          Address:
                          {`${item?.address?.line1}, ${item?.address?.city}, ${item?.address?.country}`}
                        </p>
                        <p className="postal info">Postal Code: {item?.address?.postal_code}</p>
                        <p className="paid info">
                          Paid at: {format(new Date(Number(item?.paid_at) * 1000), 'dd/MM/yyyy')}
                        </p>
                      </div>

                      <div className="third">
                        <p className="sub info">
                          Sub Total:{' '}
                          {(item?.amount_subtotal / 100).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 2,
                          })}
                        </p>
                        <p className="shipping-cost info">
                          Shipping Cost:{' '}
                          {(item?.shipping_cost / 100).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 2,
                          })}
                        </p>
                        <p className="total info">
                          Total:{' '}
                          {(item?.amount_total / 100).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>

                    {item?.ordered_items &&
                      map(item?.ordered_items, (item, idx) => (
                        <li key={idx} className="item-temp">
                          <KaImage
                            src={item.image}
                            alt="cart"
                            objectFit="contain"
                            ratio="square"
                            className="image-temp"
                          />
                          <div className="info-temp">
                            <div className="name-temp">{item.product_name}</div>
                            <div className="group-temp">
                              <div className="right-empty">
                                <div> {`Qty: ${item.quantity}`}</div>

                                <div> {`Color: ${changeColor(item.color)}`}</div>
                              </div>
                              {/* <div className="price-temp">
                              {(item.price / 100).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 2,
                              })}
                            </div> */}
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </Accordion>
            ))
          ) : (
            <Skeleton />
          )}

          {isEmpty(invoices?.order_lists) && !isFetching && (
            <p className="empty-temp">No Transactions.</p>
          )}
        </div>
      </div>
    </KsLayout>
  );
}

export default Transaction;