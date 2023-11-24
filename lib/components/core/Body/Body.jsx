import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { ErrorBoundary } from '../';

const Body = props => {
    const { children, ...otherProps } = props;
    return (
        <ErrorBoundary>
            <Box position={'relative'} height={'100%'} {...otherProps}>
                {children}
            </Box>
        </ErrorBoundary>
    );
};

Body.propTypes = {
    children: PropTypes.node
};

Body.displayName = 'Body';

export default Body;
