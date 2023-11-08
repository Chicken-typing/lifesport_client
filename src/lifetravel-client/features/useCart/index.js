import { selectCartItems } from "@/kytesoft-client/store/cart/selectors";
import { setCart } from "@/kytesoft-client/store/cart/slice";
import { getProductThunk } from "@/kytesoft-client/store/cart/thunks";
import { unwrapResult } from "@reduxjs/toolkit";
import { cloneDeep, find, findIndex, get, head, isEmpty, reduce, reject } from "lodash";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

export const useCart = () => {
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const getItemInCart = useCallback(
    ({ productId, attributeId }) => find(items, { productId, ...(attributeId && { attributeId }) }),
    [items]
  );

  const isInCart = useCallback(
    ({ productId, attributeId }) => !!getItemInCart({ productId, attributeId }),
    [getItemInCart]
  );

  const removeItemFromCart = useCallback(
    ({ id }) => {
      dispatch(setCart(reject(items, { id })));
    },
    [dispatch, items]
  );

  const addItemToCart = useCallback(
    async ({ attributeId, slug, quantity, isDecrement = false }) => {
      const productResult = await dispatch(getProductThunk(slug));
      const product = unwrapResult(productResult);

      const { options, attributes, id: productId, name } = product;
      const hasAttribute = !isEmpty(options) && !isEmpty(attributes);
      const attribute = find(attributes, { id: attributeId });
      const optionIndex = findIndex(
        reject(get(head(options), "values", []), (val) => !val),
        (val) => val === head(attribute?.options)
      );

      const thumbnail = hasAttribute
        ? get(head(options), `images.[${optionIndex}]`) || get(head(options), `images.[0]`)
        : get(product, "thumbnail") || head(get(product, "images"));

      const price = hasAttribute ? get(attribute, "price") : get(product, "price");

      const productQuantity = hasAttribute
        ? get(attribute, "quantity") || 0
        : get(product, "quantity") || 0;

      const cartItem = getItemInCart({ productId, attributeId });
      const exist = !isEmpty(cartItem);
      const currentQuantity = exist ? get(cartItem, "quantity") : 0;

      let totalQuantity;
      if (isDecrement) {
        if (currentQuantity - quantity === 0) {
          removeItemFromCart({ id: cartItem.id });
          return;
        }

        totalQuantity =
          currentQuantity - quantity > productQuantity
            ? productQuantity
            : currentQuantity - quantity;
      } else {
        totalQuantity =
          currentQuantity + quantity > productQuantity
            ? productQuantity
            : currentQuantity + quantity;
      }

      const totalAmount = totalQuantity * price;

      const newItem = {
        id: exist ? get(cartItem, "id") : v4(),
        productId,
        ...(attributeId && { attributeId, options: attribute.options }),
        name,
        slug,
        price,
        quantity: totalQuantity,
        totalAmount,
        thumbnail,
        productQuantity,
      };

      const newItems = cloneDeep(items);
      if (exist) {
        const idx = findIndex(items, { id: get(cartItem, "id") });
        newItems[idx] = newItem;
      } else {
        newItems.push(newItem);
      }

      dispatch(setCart(newItems));
    },
    [dispatch, getItemInCart, items, removeItemFromCart]
  );

  const resetCart = useCallback(() => {
    dispatch(setCart([]));
  }, [dispatch]);

  const isShowAddToCart = useCallback(
    ({ productId, attributeId, quantity }) => {
      if (!quantity) return false;

      const cartItem = getItemInCart({ productId, attributeId });
      if (isEmpty(cartItem)) return true;

      return !(cartItem.quantity >= quantity);
    },
    [getItemInCart]
  );

  const totalAmount = useMemo(
    () => reduce(items, (prev, { totalAmount }) => (prev += totalAmount), 0),
    [items]
  );

  const increment = useCallback(
    async ({ id }) => {
      const cartItem = find(items, { id });
      await addItemToCart({ slug: cartItem.slug, attributeId: cartItem.attributeId, quantity: 1 });
    },
    [addItemToCart, items]
  );

  const decrement = useCallback(
    async ({ id }) => {
      const cartItem = find(items, { id });
      await addItemToCart({
        slug: cartItem.slug,
        attributeId: cartItem.attributeId,
        quantity: 1,
        isDecrement: true,
      });
    },
    [addItemToCart, items]
  );

  const isShowIncrement = useCallback(
    ({ id }) => {
      const cartItem = find(items, { id });
      return cartItem?.quantity < cartItem?.productQuantity;
    },
    [items]
  );

  const isShowDecrement = useCallback(
    ({ id }) => {
      const cartItem = find(items, { id });
      return cartItem?.quantity > 1;
    },
    [items]
  );

  return {
    items,
    totalAmount,
    resetCart,
    isInCart,
    addItemToCart,
    removeItemFromCart,
    getItemInCart,
    isShowAddToCart,
    increment,
    isShowIncrement,
    decrement,
    isShowDecrement,
  };
};
