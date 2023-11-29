import { useEffect, useState, forwardRef } from 'react';
import { currency as utilCurrency } from '@investira/utilities';
import { validators } from 'investira.sdk';
import PropTypes from 'prop-types';

const InputCurrency = forwardRef((props, ref) => {
    const { decimal = 2, onChange, currency = 'BRL' } = props;
    const [value, setValue] = useState(props.value);

    function formatTextValue(pValue = '', pDecimal = 2, pCurrency = 'BRL') {
        const xValue = validators.isNumber(pValue) ? pValue.toFixed(pDecimal) : pValue;

        return utilCurrency.toCurrency(xValue.toString(), '.', pCurrency, 'pt-BR', pDecimal);
    }

    function handleChange(pEvent) {
        pEvent.persist();
        const xValueAsCurrency = formatTextValue(pEvent.target.value, decimal, currency);

        setValue(xValueAsCurrency);

        if (onChange) {
            onChange(pEvent, utilCurrency.currencyToNumber(xValueAsCurrency, '.', decimal));
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
    separator: PropTypes.oneOf(['.', ',']),
    decimal: PropTypes.number
};

InputCurrency.displayName = 'InputCurrency';

export default InputCurrency;
