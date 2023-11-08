import {
  increment,
  decrement,
  removeProduct,
  changeQuantity,
  blurQuantity,
} from '@/store/cart/slice';
import { useAppDispatch } from '@/store/hooks';
import { ChangeEvent, FC, FocusEvent } from 'react';
import classNames from 'classnames';
import { Label } from '@components/primitive';

interface IQuantityProps {
  quantity: number;
  id: string;
  disabled?: boolean;
  hasLabel?: boolean;
}

const Quantity: FC<IQuantityProps> = ({ quantity, id, disabled = false, hasLabel = false }) => {
  const dispatch = useAppDispatch();

  const handleBlurQuantity = (id: string) => (e: FocusEvent<HTMLInputElement>) => {
    dispatch(blurQuantity({ quantity: Number(e.target.value), id: id }));
  };

  const handleChangeQuantity = (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeQuantity({ quantity: Number(e.target.value), id: id }));
  };

  return (
    <div className="quantity kl-product-quantity">
      {hasLabel && <Label className="label">Số lượng</Label>}
      <div className="action">
        <button
          className="button"
          onClick={() => dispatch(quantity > 1 ? decrement(id) : removeProduct(id))}
        >
          -
        </button>
        <input
          value={quantity}
          type="number"
          className="input"
          onChange={handleChangeQuantity(id)}
          onBlur={handleBlurQuantity(id)}
        />
        <button
          disabled={disabled}
          className={classNames('button', { '-disabled': disabled })}
          onClick={() => (quantity > 0 ? dispatch(increment(id)) : (quantity = 1))}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Quantity;
