import { Box } from '@mui/material';
import PropTypes from 'prop-types';

function Divisor(props) {
    const xSx = {
        vertical: {
            display: 'flex',
            alignSelf: 'stretch',
            my: 1,
            borderLeft: '1px solid #030305',
            borderRight: '1px solid #24273a',
            height: '100%'
        },
        horizontal: {
            borderTop: '1px solid #030305',
            borderBottom: '1px solid #24273a',
            width: '100%'
        }
    };

    return <Box sx={xSx[props.direction]}></Box>;
}

Divisor.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizontal']).isRequired
};

Divisor.displayName = 'Divisor';

export default Divisor;
