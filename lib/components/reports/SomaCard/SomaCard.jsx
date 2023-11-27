import PropTypes from 'prop-types';
import { formats } from 'investira.sdk';
import { InfoCard } from '../';
import utils from '../../utils';

const SomaCard = props => {
    const calculatedValue = utils.calc.somaAttr(props.data, props.options);
    const formatedValue = formats.formatNumber(
        calculatedValue,
        props.decimais,
        props.separateThousand,
        props.showCurrency
    );

    return (
        <InfoCard
            label={props.label}
            value={props.value || formatedValue || 'Sem dados'}
            sufix={props.sufix}
        />
    );
};

SomaCard.displayName = 'SomaCard';

SomaCard.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    data: PropTypes.array,
    options: PropTypes.shape({
        soma: PropTypes.string,
        filter: PropTypes.string,
        filter_value: PropTypes.string
    }),
    showCurrency: PropTypes.bool,
    separateThousand: PropTypes.bool,
    sufix: PropTypes.string,
    decimais: PropTypes.number
};

SomaCard.defaultProps = {
    label: 'Soma',
    decimais: 2,
    showCurrency: false,
    separateThousand: true
};

export default SomaCard;
