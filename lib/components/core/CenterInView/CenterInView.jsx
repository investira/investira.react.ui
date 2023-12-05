import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const CenterInView = props => {
    return (
        <Box
            sx={{
                position: 'relative',
                height: '100%',
                width: '100%',
                display: 'flex',
                flexGrow: '1'
            }}
            {...props}>
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                {props.children}
            </Box>
        </Box>
    );
};

CenterInView.propTypes = {
    children: PropTypes.node.isRequired
};

CenterInView.displayName = 'CenterInView';

export default CenterInView;
