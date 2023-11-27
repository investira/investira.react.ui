import { memo } from 'react';
import { Stack } from '@mui/material';

const FooterSpace = memo(() => {
    return <Stack component="div">&nbsp;</Stack>;
});

FooterSpace.displayName = 'FooterSpace';

export default FooterSpace;
