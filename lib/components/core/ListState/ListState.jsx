import { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';
import { CenterInView, Loading } from '../';

const ListMessage = memo(props => {
    const { isFetching, message, listSize = 0, padding = true, children } = props;

    if (isFetching && listSize <= 0) {
        return (
            <Box sx={[{ minHeight: '200px', width: '100%' }, padding && { padding: '0 16px' }]}>
                <CenterInView>
                    <Loading />
                </CenterInView>
            </Box>
        );
    }

    if (props.message) {
        return (
            <Box sx={[{ minHeight: '200px', width: '100%' }, padding && { padding: '0 16px' }]}>
                <CenterInView>
                    <Typography color={'textSecondary'} align={'center'}>
                        {message}
                    </Typography>
                </CenterInView>
            </Box>
        );
    }

    return (
        <Box sx={[{ minHeight: '200px', width: '100%' }, padding && { padding: '0 16px' }]}>
            {children}
        </Box>
    );
});

ListMessage.propTypes = {
    listSize: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    message: PropTypes.string,
    children: PropTypes.node.isRequired,
    padding: PropTypes.bool
};

ListMessage.displayName = 'ListMessage';

export default ListMessage;
