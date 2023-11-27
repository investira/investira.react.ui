import PropTypes from 'prop-types';
import { NumberCard } from '../';

const FinCard = props => {
    return (
        <NumberCard
            label={props.label}
            value={props.value || 0}
            sufix={props.sufix}
            decimais={props.decimais}
            showCurrency={props.showCurrency}
            separateThousand={props.separateThousand}
        />
    );
};

FinCard.displayName = 'FinCard';

FinCard.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showCurrency: PropTypes.bool,
    separateThousand: PropTypes.bool,
    sufix: PropTypes.string,
    decimais: PropTypes.number
};

FinCard.defaultProps = {
    label: 'Financeiro',
    decimais: 2,
    showCurrency: true,
    separateThousand: true
};

export default FinCard;
