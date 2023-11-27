import { CircularProgress, Box } from '@mui/material';
import PropTypes from 'prop-types';

function Loading(props) {
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
                props.align === 'center' && {
                    justifyContent: 'center'
                },
                !props.align === 'top' && {
                    justifyContent: 'start'
                }
            ]}>
            <Box>
                <CircularProgress size={props.size} />
            </Box>
        </Box>
    );
}

Loading.propTypes = {
    align: PropTypes.oneOf(['top', 'center']),
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Loading.defaultProps = {
    align: 'center',
    size: 40
};

Loading.displayName = 'Loading';

export default Loading;
