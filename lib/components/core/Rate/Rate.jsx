import { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';
import { Icon } from '../';

const Rate = memo(props => {
    const elem = [
        { icon: 'arrow_negative', color: 'error' },
        { icon: 'arrow_positive', color: 'primary' },
        { icon: 'none', color: 'warn' }
    ];

    const attrs = pValue => {
        if (pValue < 0) {
            return elem[0];
        }

        if (pValue > 0) {
            return elem[1];
        }

        if (pValue === 0) {
            return elem[2];
        }
    };

    const xValue = props.value ? props.value.toFixed(2) : 0;

    return (
        <Box
            sx={theme => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                color: theme.palette[props.contrastColor || attrs(props.value || 0).color].main
            })}>
            <Typography variant={'caption'}>
                <span>{xValue}%</span>
            </Typography>

            <Icon
                size={props.size || 16}
                iconName={attrs(props.value || 0).icon}
                color={'inherit'}
            />
        </Box>
    );
});

Rate.propTypes = {
    value: PropTypes.number,
    size: PropTypes.number,
    contrastColor: PropTypes.string
};

Rate.displayName = 'Rate';

export default Rate;
