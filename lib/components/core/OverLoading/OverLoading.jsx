import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Backdrop, Typography } from '@mui/material';

function OverLoading(props) {
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
                    <CircularProgress color="primary" size={props.size} />
                    <Box sx={{ height: '24px' }}></Box>
                    {props.message && (
                        <Typography color={props.color} align="center" variant={props.variant}>
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

OverLoading.defaultProps = {
    color: 'textPrimary',
    variant: 'caption',
    size: 40
};

OverLoading.displayName = 'OverLoading';

export default OverLoading;
