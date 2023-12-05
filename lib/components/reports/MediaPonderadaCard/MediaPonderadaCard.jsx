import { memo } from 'react';
import PropTypes from 'prop-types';
import { formats } from 'investira.sdk';
import { InfoCard } from '../';
import { calc } from '@utils';
const MediaPonderadaCard = memo(props => {
    const calculatedValue = calc.mediaPonderada(props.data, props.cols);
    const formatedValue = formats.formatNumber(
        calculatedValue,
        props.decimais,
        props.separateThousand,
        props.showCurrency
    );

    return <InfoCard label={props.label} value={formatedValue || 0} sufix={props.sufix} />;
});

MediaPonderadaCard.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    data: PropTypes.array,
    cols: PropTypes.array,
    decimais: PropTypes.number,
    showCurrency: PropTypes.bool,
    separateThousand: PropTypes.bool,
    sufix: PropTypes.string
};

MediaPonderadaCard.defaultProps = {
    label: 'Média Ponderada',
    decimais: 6,
    showCurrency: false,
    separateThousand: false
};

MediaPonderadaCard.displayName = 'MediaPonderadaCard';

export default MediaPonderadaCard;
