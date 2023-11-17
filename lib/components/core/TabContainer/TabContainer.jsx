import { memo } from 'react';
import { Box, Stack } from '@mui/material';
import PropTypes from 'prop-types';

const TabContainer = memo(props => {
    return (
        <Box sx={{ position: 'relative', height: '100%' }}>
            <Stack id={`tab-${props.activeTab}`} sx={{ position: 'relative', height: '100%' }}>
                {props.children[props.activeTab]}
            </Stack>
        </Box>
    );
});

TabContainer.propTypes = {
    activeTab: PropTypes.number,
    children: PropTypes.node
};

TabContainer.displayName = 'TabContainer';

export default TabContainer;
