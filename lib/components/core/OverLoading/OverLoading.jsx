import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Backdrop, Typography } from '@mui/material';

function OverLoading(props) {
    const { color = 'textPrimary', variant = 'caption', size = 40 } = props;
    const [open, setOpen] = React.useState(false);

    const xSx = {
        zIndex: 999,
        ...(props.backgroundFlat && { backgroundColor: 'background.default' })
    };

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    return (
        <Backdrop sx={xSx} open={open}>
            {open && (
                <Box
                    sx={{
                        margin: '0 auto',
                        width: '60%',
                        textAlign: 'center'
                    }}>
                    <CircularProgress color="primary" size={size} />
                    <Box sx={{ height: '24px' }}></Box>
                    {props.message && (
                        <Typography color={color} align="center" variant={variant}>
                            {props.message}
                        </Typography>
                    )}
                </Box>
            )}
        </Backdrop>
    );
}

OverLoading.propTypes = {
    backgroundFlat: PropTypes.bool,
    open: PropTypes.bool,
    size: PropTypes.number,
    message: PropTypes.string,
    color: PropTypes.string,
    variant: PropTypes.string
};

OverLoading.displayName = 'OverLoading';

export default OverLoading;
