import { Label } from '@components/primitive';
import { max, min, clamp } from 'lodash';
import { ChangeEvent, Dispatch, FC, FocusEvent, SetStateAction } from 'react';

interface IQuantityProps {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  productQuantity?: number;
}

const Quantity: FC<IQuantityProps> = ({ quantity, setQuantity, productQuantity }) => {
  const handleMinus = () => setQuantity(max([0, quantity - 1]) || 1);
  const handlePlus = () => setQuantity(min([quantity + 1, productQuantity || 1]) || 1);

  const handleBlurQuantity = (e: FocusEvent<HTMLInputElement>) => {
    const value = Number(e.target.value || 0);

    if (!value) return setQuantity(1);

    setQuantity(clamp(value, 1, productQuantity || 1));
  };

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) =>
    setQuantity(Number(e.target.value));

  return (
    <div className="quantity kl-product-quantity">
      <Label className="label">Số lượng</Label>

      <div className="action">
        <button onClick={handleMinus} className="button">
          -
        </button>
        <input
          value={quantity}
          onBlur={handleBlurQuantity}
          onChange={handleChangeQuantity}
          type="number"
          className="input"
        />
        <button onClick={handlePlus} className="button">
          +
        </button>
      </div>
    </div>
  );
};

export default Quantity;
