import PropTypes from 'prop-types';
import { formats } from 'investira.sdk';
import { InfoCard } from '../';

const NumberCard = props => {
    const formatedValue = formats.formatNumber(
        props.value,
        props.decimais,
        props.separateThousand,
        props.showCurrency
    );

    return <InfoCard label={props.label} value={formatedValue || 0} sufix={props.sufix} />;
};

NumberCard.displayName = 'NumberCard';

NumberCard.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showCurrency: PropTypes.bool,
    separateThousand: PropTypes.bool,
    sufix: PropTypes.string,
    decimais: PropTypes.number
};

NumberCard.defaultProps = {
    label: 'Número',
    decimais: 6,
    showCurrency: false,
    separateThousand: false
};

export default NumberCard;
