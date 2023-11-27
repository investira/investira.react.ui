import { memo } from 'react';
import { Stack } from '../wrappers';

const FooterSpace = memo(() => {
    return <Stack component="div">&nbsp;</Stack>;
});

FooterSpace.displayName = 'FooterSpace';

export default FooterSpace;
