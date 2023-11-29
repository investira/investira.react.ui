import { CircularProgress, Box } from '@mui/material';
import PropTypes from 'prop-types';

function Loading(props) {
    const { align = 'center', size = 40 } = props;
    return (
        <Box
            sx={[
                {
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                },
                align === 'center' && {
                    justifyContent: 'center'
                },
                !align === 'top' && {
                    justifyContent: 'start'
                }
            ]}>
            <Box>
                <CircularProgress size={size} />
            </Box>
        </Box>
    );
}

Loading.propTypes = {
    align: PropTypes.oneOf(['top', 'center']),
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Loading.displayName = 'Loading';

export default Loading;
