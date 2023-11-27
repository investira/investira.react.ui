import { memo } from 'react';
import HeaderSpace from './HeaderSpace';
import { Box } from '../wrappers';

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
