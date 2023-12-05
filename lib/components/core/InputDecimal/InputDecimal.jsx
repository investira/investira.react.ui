import { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { validators } from 'investira.sdk';
import { currency } from '@investira/utilities';

const InputDecimal = forwardRef((props, ref) => {
    const { decimal = 4 } = props;
    const [value, setValue] = useState(props.value);

    function formatTextValue(pValue = '', pDecimal = 4, pLocale = 'pt-BR', pSeparator = ',') {
        const xValue = validators.isNumber(pValue) ? pValue.toFixed(pDecimal) : pValue;

        const xResult = currency.toDecimal(xValue.toString(), pDecimal, pLocale, pSeparator);
        return xResult;
    }

    function handleChange(pEvent) {
        pEvent.persist();
        const xValueAsCurrency = formatTextValue(pEvent.target.value, decimal);

        setValue(xValueAsCurrency);

        if (props.onChange) {
            props.onChange(pEvent, currency.currencyToNumber(xValueAsCurrency, '.', decimal));
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

InputDecimal.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currency: PropTypes.string,
    separator: PropTypes.oneOf(['.', ',']),
    decimal: PropTypes.number
};

InputDecimal.displayName = 'InputDecimal';

export default InputDecimal;
