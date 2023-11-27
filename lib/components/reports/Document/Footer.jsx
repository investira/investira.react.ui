import { memo } from 'react';
import { Stack } from '../wrappers';
const Footer = memo(() => {
    return (
        <Stack
            component="footer"
            direction="row"
            sx={{
                position: 'fixed',
                bottom: 0,
                counterIncrement: 'page',
                '@media print': {
                    position: 'fixed'
                }
            }}></Stack>
    );
});

Footer.displayName = 'Footer';

export default Footer;
