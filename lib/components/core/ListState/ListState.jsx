import { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';
import { CenterInView, Loading } from '../';

const ListMessage = memo(props => {
    if (props.isFetching && props.listSize <= 0) {
        return (
            <Box
                sx={[
                    { minHeight: '200px', width: '100%' },
                    props.padding && { padding: '0 16px' }
                ]}>
                <CenterInView>
                    <Loading />
                </CenterInView>
            </Box>
        );
    }

    if (props.message) {
        return (
            <Box
                sx={[
                    { minHeight: '200px', width: '100%' },
                    props.padding && { padding: '0 16px' }
                ]}>
                <CenterInView>
                    <Typography color={'textSecondary'} align={'center'}>
                        {props.message}
                    </Typography>
                </CenterInView>
            </Box>
        );
    }

    return (
        <Box sx={[{ minHeight: '200px', width: '100%' }, props.padding && { padding: '0 16px' }]}>
            {props.children}
        </Box>
    );
});

ListMessage.defaultProps = {
    listSize: 0,
    padding: true,
    className: {}
};

ListMessage.propTypes = {
    listSize: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    message: PropTypes.string,
    children: PropTypes.node.isRequired,
    padding: PropTypes.bool
};

ListMessage.displayName = 'ListMessage';

export default ListMessage;
