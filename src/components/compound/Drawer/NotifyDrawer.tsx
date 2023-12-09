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

const NotifyDrawer = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const carts = useAppSelector(selectCart);

  const total = useAppSelector(selectTotal);

  const { data: order } = useOrderTempQuery({});
  console.log(order);

  const handleViewCart = () => {
    dispatch(closeDrawer());
    router.push({ pathname: routes.CART });
  };

  return (
    <div className="kl-cart-drawer">
      <div className="header">
        <span className="title">Notify</span>
        <span className="close" onClick={() => dispatch(closeDrawer())}>
          Close <i className="fa-light fa-xmark icon" />
        </span>
      </div>

      <div className="content">
        <Accordion hasIcon iconPosition="start" title="1">
          <div>safsadfsadfsa</div>
        </Accordion>
        <Accordion hasIcon iconPosition="start" title="2">
          <div>asdfsadfsadf</div>
        </Accordion>
        <Accordion hasIcon iconPosition="start" title="3">
          <div>dsfasdfsadf</div>
        </Accordion>
      </div>
    </div>
  );
};

export default NotifyDrawer;
