import { memo } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';

const DocumentContent = memo(props => {
    return (
        <Box component="tbody">
            <tr>
                <td>{props.children}</td>
            </tr>
        </Box>
    );
});

DocumentContent.displayName = 'DocumentContent';

DocumentContent.propTypes = {
    children: PropTypes.node.isRequired
};

export default DocumentContent;
