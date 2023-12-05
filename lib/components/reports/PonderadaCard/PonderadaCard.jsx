import PropTypes from 'prop-types';
import { formats } from 'investira.sdk';
import { NumberCard } from '../';

const PonderadaCard = props => {
    const formatedValue = formats.formatNumber(
        props.value,
        props.decimais,
        props.separateThousand,
        props.showCurrency
    );

    return (
        <NumberCard
            label={props.label}
            value={formatedValue || 0}
            sufix={props.sufix}
            decimais={props.decimais}
            showCurrency={props.showCurrency}
            separateThousand={props.separateThousand}
        />
    );
};

PonderadaCard.displayName = 'PonderadaCard';

PonderadaCard.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showCurrency: PropTypes.bool,
    separateThousand: PropTypes.bool,
    sufix: PropTypes.string,
    decimais: PropTypes.number
};

PonderadaCard.defaultProps = {
    label: 'Média Ponderada',
    decimais: 6,
    showCurrency: false,
    separateThousand: false
};

export default NumberCard;
