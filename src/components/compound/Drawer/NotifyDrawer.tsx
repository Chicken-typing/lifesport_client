import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCart } from '@/store/cart/selector';
import { closeDrawer } from '@/store/drawers/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button, KaImage } from '@components/primitive';
import { routes } from '@utils/routes';
import { map, size, isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import Alert from '@mui/material';
import { Accordion } from '../Accordion';
import { useOrderTempQuery } from '@/query/order/get-OrderTemp';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Drawer } from '@mui/material';

const NotifyDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { data: order } = useOrderTempQuery({});

  const [end, setEnd] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<string[]>([]);
  const [lastNotificationTime, setLastNotificationTime] = useState<number | null>(null);
  const [expiredItems, setExpiredItems] = useState<number[]>([]);

  const calculateTimeRemaining = (expires_at: string) => {
    const currentTime = moment();
    const expirationMoment = moment.unix(Number(expires_at));

    const duration = moment.duration(expirationMoment.diff(currentTime));
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    const remainingTime = `${minutes}m ${seconds}s`;

    return remainingTime;
  };

  useEffect(() => {
    const intervalIds: NodeJS.Timeout[] = [];

    const updateTimeRemaining = () => {
      const updatedTimeRemaining = map(order?.data, (item) =>
        calculateTimeRemaining(item?.expires_at),
      );
      setTimeRemaining(updatedTimeRemaining);
    };

    const handleNotification = (remainingTime: string, index: number) => {
      const [minutes, seconds] = remainingTime.split('m ');
      const remainingTimeInSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);

      if (
        remainingTime.endsWith('0s') &&
        remainingTimeInSeconds % 300 === 0 &&
        remainingTimeInSeconds !== lastNotificationTime
      ) {
        toast.info(`Order ${index + 1}: ${remainingTimeInSeconds / 60} minutes left!`, {
          position: 'top-center',
        });
        setLastNotificationTime(remainingTimeInSeconds);
      }

      if (remainingTime === '1m 0s') {
        toast.info(`Order ${index + 1}: has 1 minute left!`, { position: 'top-center' });
      }
      if (remainingTime === '0m 0s') {
        toast.info(`Order ${index + 1}: is expired!`, { position: 'top-center' });
        setLastNotificationTime(null);
        setEnd((prevExpiredItems) => [...prevExpiredItems, index]);

        setTimeout(() => {
          setExpiredItems((prevExpiredItems) => [...prevExpiredItems, index]);
        }, 15000);
      }
    };

    updateTimeRemaining();

    map(order?.data, (item, index) => {
      const intervalId = setInterval(() => {
        const remainingTime = calculateTimeRemaining(item?.expires_at);
        setTimeRemaining((prevTimeRemaining) => {
          const updatedTimeRemaining = [...prevTimeRemaining];
          updatedTimeRemaining[index] = remainingTime;
          return updatedTimeRemaining;
        });

        handleNotification(remainingTime, index);

        if (remainingTime === '0m 0s') {
          clearInterval(intervalId);
        }
      }, 1000);

      intervalIds.push(intervalId);
    });

    return () => {
      intervalIds.forEach((id) => clearInterval(id));
    };
  }, [order?.data, lastNotificationTime]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="kl-drawer-notify">
        <div className="kl-cart-drawer">
          <div className="header">
            <span className="title">Unpaid Order</span>
            <span className="close" onClick={onClose}>
              Close <i className="fa-light fa-xmark icon" />
            </span>
          </div>

          <div className="content">
            {size(order?.data) !== 0 ? (
              map(order?.data, (item, idx) => (
                <Accordion
                  disabled={expiredItems.includes(idx)}
                  key={item.id}
                  title={
                    end.includes(idx)
                      ? 'Your order is expired'
                      : `Order ${idx + 1} - Expires at: ${timeRemaining[idx]}`
                  }
                >
                  <div className="wrap">
                    <ul className="products-temp">
                      {item?.list_items &&
                        map(item?.list_items, (item, idx) => (
                          <li key={idx} className="item-temp">
                            <KaImage
                              src={item.thumbnail}
                              alt="cart"
                              objectFit="contain"
                              ratio="square"
                              className="image-temp"
                            />
                            <div className="info-temp">
                              <div className="name-temp">{item.name}</div>
                              <div className="group-temp">
                                <div className="right-empty">
                                  <div> {`Qty: ${item.quantity}`}</div>

                                  <div> {`Color: ${item.color}`}</div>
                                </div>
                                <div className="price-temp">
                                  {(item.price / 100).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 2,
                                  })}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                    <Button
                      disabled={end.includes(idx)}
                      onClick={() => window.open(item.checkout_link, '_blank')}
                    >
                      Pay Now
                    </Button>
                  </div>
                </Accordion>
              ))
            ) : (
              <p className="empty-temp">No unpaid products.</p>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default NotifyDrawer;
