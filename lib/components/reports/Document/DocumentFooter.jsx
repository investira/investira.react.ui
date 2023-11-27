import { memo } from 'react';
import FooterSpace from './FooterSpace';
import { Box } from '@mui/material';

const DocumentFooter = memo(() => {
    return (
        <Box component="tfoot" sx={{ width: '100%' }}>
            <tr>
                <td>
                    <FooterSpace />
                </td>
            </tr>
        </Box>
    );
});

DocumentFooter.displayName = 'DocumentFooter';

export default DocumentFooter;
