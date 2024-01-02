import { useAppDispatch } from '@/store/hooks';
import { ChangeEvent, FC, FocusEvent } from 'react';
import classNames from 'classnames';
import { Label } from '@components/primitive';
import { incrementCart, decrementCart, removeCart } from '@/store/cartUser/slice';

interface IQuantityProps {
  quantity: number;
  id: string;
  color: string;
  disabled?: boolean;
  hasLabel?: boolean;
}

const Quantity: FC<IQuantityProps> = ({
  quantity,
  id,
  color,
  disabled = false,
  hasLabel = false,
}) => {
  const dispatch = useAppDispatch();

  // const handleBlurQuantity = (id: number, color: string) => (e: FocusEvent<HTMLInputElement>) => {
  //   dispatch(blurQuantity({ quantity: Number(e.target.value), id: id, color: color }));
  // };

  // const handleChangeQuantity =
  //   (id: number, color: string) => (e: ChangeEvent<HTMLInputElement>) => {
  //     dispatch(changeQuantity({ quantity: Number(e.target.value), id: id, color: color }));
  //   };

  return (
    <div className="quantity kl-quantity">
      {hasLabel && <Label className="label">Số lượng</Label>}
      <div className="action">
        <button
          className="button"
          onClick={() =>
            dispatch(quantity > 1 ? decrementCart({ id, color }) : removeCart({ id, color }))
          }
        >
          -
        </button>
        <input value={quantity} readOnly type="number" className="input" />
        <button
          disabled={disabled}
          className={classNames('button', { '-disabled': disabled })}
          onClick={() => (quantity > 0 ? dispatch(incrementCart({ id, color })) : (quantity = 1))}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Quantity;
