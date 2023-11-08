import { formatNumber } from "@/kytesoft-client/helpers";
import { selectCurrencyConfig } from "@/kytesoft-client/store/app/selectors";
import { isEmpty } from "lodash";
import { useCallback } from "react";
import { useSelector } from "react-redux";

export const usePrice = () => {
  const currencyConfig = useSelector(selectCurrencyConfig);

  const formatPrice = useCallback(
    (val) => {
      if (isEmpty(currencyConfig)) return formatNumber(val);

      const formatter = new Intl.NumberFormat(currencyConfig?.locale, {
        style: "currency",
        currency: currencyConfig?.currency,
      });

      return formatter.format(val);
    },
    [currencyConfig]
  );

  return { formatPrice };
};
