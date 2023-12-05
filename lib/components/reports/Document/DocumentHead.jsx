import { memo } from 'react';
import { Box } from '@mui/material';
import HeaderSpace from './HeaderSpace';

const DocumentHead = memo(() => {
    return (
        <Box component="thead" sx={{ width: '100%' }}>
            <tr>
                <th>
                    <HeaderSpace />
                </th>
            </tr>
        </Box>
    );
});

DocumentHead.displayName = 'DocumentHead';

export default DocumentHead;
