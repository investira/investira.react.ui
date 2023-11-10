import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { formats } from 'investira.sdk';
import { Rate } from '../';

function Format(props) {
    const formatValue = (pType, pValue, pDecimais) => {
        const xValue = {
            ...(['currency', 'currency_abs', 'number', 'percentual'].includes(props.format) && {
                currency:
                    typeof pValue === 'string'
                        ? pValue
                        : formats.friendlyNumber(pValue, pDecimais || 2, true),
                currency_abs:
                    typeof pValue === 'string'
                        ? pValue
                        : formats.formatNumber(pValue, 2, true, true),
                number:
                    typeof pValue === 'string'
                        ? pValue
                        : formats.formatNumber(pValue, pDecimais || 0, true, false)
            }),
            ...(['date', 'hour'].includes(props.format) && {
                date: formats.formatDate(pValue),
                hour:
                    typeof pValue === 'string' ? pValue : formats.formatDateCustom(pValue, 'HH:mm')
            }),
            rate: <Rate value={pValue} status={props.status} size={props.size} />,
            text: pValue,
            percentual: `${pValue}%`
        };

        return xValue[pType] || pValue;
    };

    const { format, value, decimais, ...restProps } = props;

    return <Typography {...restProps}>{formatValue(format, value, decimais)}</Typography>;
}

Format.propTypes = {
    format: PropTypes.oneOf([
        'currency',
        'currency_abs',
        'number',
        'percentual',
        'rate',
        'date',
        'hour',
        'text'
    ]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    size: PropTypes.number,
    variant: PropTypes.string,
    color: PropTypes.string,
    status: PropTypes.oneOf([0, 1, 2]),
    decimais: PropTypes.number
};

Format.defaultProps = {
    format: 'text',
    value: 0,
    color: 'textPrimary',
    size: 16,
    variant: 'caption',
    status: 1
};

export default Format;
