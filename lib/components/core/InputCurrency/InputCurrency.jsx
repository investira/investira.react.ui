import React, { useEffect, useState, forwardRef } from "react";
import { currency } from "investira.react.lib";
import { validators } from "investira.sdk";
import PropTypes from "prop-types";

const InputCurrency = forwardRef((props, ref) => {
  console.log(props);
  const [value, setValue] = useState(props.value);

  function formatTextValue(pValue = "", pDecimal = 2, pCurrency = "BRL") {
    const xValue = validators.isNumber(pValue)
      ? pValue.toFixed(pDecimal)
      : pValue;

    return currency.toCurrency(
      xValue.toString(),
      ".",
      pCurrency,
      "pt-BR",
      pDecimal
    );
  }

  function handleChange(pEvent) {
    pEvent.persist();
    const xValueAsCurrency = formatTextValue(
      pEvent.target.value,
      props.decimal,
      props.currency
    );

    setValue(xValueAsCurrency);

    if (props.onChange) {
      props.onChange(
        pEvent,
        currency.currencyToNumber(xValueAsCurrency, ".", props.decimal)
      );
    }
  }

  useEffect(() => {
    if (formatTextValue(props.value) !== value) {
      setValue(formatTextValue(props.value));
    }
  }, [props.value, value]);

  const { ...inputProps } = props;

  return (
    <input
      ref={ref}
      {...inputProps}
      type="text"
      pattern="\d*"
      data-numeric-input
      value={value || props.value}
      onChange={handleChange}
    />
  );
});

InputCurrency.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currency: PropTypes.string,
  separator: PropTypes.oneOf([".", ","]),
};

InputCurrency.defaultProps = {
  separator: ",",
  currency: "BRL",
};

InputCurrency.displayName = "InputCurrency";

export default InputCurrency;
