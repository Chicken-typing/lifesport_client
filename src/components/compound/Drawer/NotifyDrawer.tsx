import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCart } from '@/store/cart/selector';
import { closeDrawer } from '@/store/drawers/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button, KaImage } from '@components/primitive';
import { routes } from '@utils/routes';
import { map, size, isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { removeProduct } from '@/store/cart/slice';
import { selectTotal } from '../../../store/cart/selector';
import { Accordion } from '../Accordion';
import { useOrderTempQuery } from '@/query/order/get-OrderTemp';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Link } from '../../primitive/Link/index';

const NotifyDrawer = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data: order } = useOrderTempQuery({});
  console.log(order);

  const calculateTimeRemaining = (expires_at: string) => {
    const currentTime = moment();
    const expirationMoment = moment.unix(Number(expires_at));

    const duration = moment.duration(expirationMoment.diff(currentTime));
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    const remainingTime = `${minutes}m ${seconds}s`;

    return remainingTime;
  };

  const [timeRemaining, setTimeRemaining] = useState<string[]>([]);
  const [lastNotificationTime, setLastNotificationTime] = useState<number | null>(null);

  useEffect(() => {
    const intervalIds: NodeJS.Timeout[] = [];

    // Hàm để thêm hoặc cập nhật thời gian còn lại
    const updateTimeRemaining = () => {
      const updatedTimeRemaining = map(order?.data, (item) =>
        calculateTimeRemaining(item?.expires_at),
      );
      setTimeRemaining(updatedTimeRemaining);
    };

    // Hàm để xử lý thông báo
    const handleNotification = (remainingTime: string, index: number) => {
      if (
        remainingTime.endsWith('0s') &&
        parseInt(remainingTime, 10) % 300 === 0 &&
        parseInt(remainingTime, 10) !== lastNotificationTime
      ) {
        toast.info(`Order ${index + 1}: ${parseInt(remainingTime, 10) / 60} minutes left!`, {
          position: 'top-center',
        });
        setLastNotificationTime(parseInt(remainingTime, 10));
      }
      if (remainingTime === '1m 0s') {
        toast.info(`Order ${index + 1}: Almost time's up!`, { position: 'top-center' });
      }
      if (remainingTime === '0m 0s') {
        toast.info(`Order ${index + 1}: Time is up!`, { position: 'top-center' });
        setLastNotificationTime(null);
      }
    };

    // Cập nhật thời gian còn lại khi có sự thay đổi trong danh sách đơn hàng
    updateTimeRemaining();

    // Tạo interval cho mỗi đơn hàng
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

    // Hủy đăng ký tất cả các interval khi component bị hủy
    return () => {
      intervalIds.forEach((id) => clearInterval(id));
    };
  }, [order?.data, lastNotificationTime]);

  return (
    <div className="kl-cart-drawer">
      <div className="header">
        <span className="title">Notify</span>
        <span className="close" onClick={() => dispatch(closeDrawer())}>
          Close <i className="fa-light fa-xmark icon" />
        </span>
      </div>

      <div className="content">
        {!isEmpty(order?.data) &&
          map(order?.data, (item, idx) => (
            <Accordion key={item.id} title={`Order ${idx + 1} - Expires at: ${timeRemaining[idx]}`}>
              <div className="detail">
                <Button>
                  <Link title="Checkout Now" href={item?.checkout_link}>
                    Checkout Now
                  </Link>
                </Button>
              </div>
            </Accordion>
          ))}
      </div>
    </div>
  );
};

export default NotifyDrawer;
