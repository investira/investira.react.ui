import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Backdrop, Typography, LinearProgress, Button, Box, Stack } from '@mui/material';
import { Icon } from '../';

function OverWaiting(props) {
    const [open, setOpen] = React.useState(false);

    const xSxRoot = {
        zIndex: 'drawer' + 1,
        ...(props.backgroundFlat && { backgroundColor: 'background.default' })
    };

    const handleCancel = pEvent => {
        props.onCancel && props.onCancel(pEvent);
    };

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const { message, progressProps, typographyProps, header } = props;

    return (
        <Backdrop sx={xSxRoot} open={open}>
            {open && (
                <>
                    {header && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '55px',
                                padding: '16px'
                            }}>
                            {header}
                        </Box>
                    )}
                    <Box
                        sx={{
                            margin: '0 auto',
                            width: '80%',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                        <Box sx={{ position: 'relative' }}>
                            <Icon
                                color={progressProps.color || 'primary'}
                                iconName="clock"
                                size={128}
                            />
                        </Box>

                        <Stack spacing={2} sx={{ paddingTop: '24px', width: '100%' }}>
                            <LinearProgress
                                color={progressProps.color}
                                variant={progressProps.variant}
                                value={progressProps.value}
                            />

                            {message && (
                                <Typography
                                    color={typographyProps.color || 'textPrimary'}
                                    align="center"
                                    variant={typographyProps.variant || 'caption'}>
                                    {message}
                                </Typography>
                            )}
                        </Stack>

                        {props.cancelable && (
                            <Box sx={{ position: 'absolute', bottom: '24px' }}>
                                <Button variant="outlined" color="primary" onClick={handleCancel}>
                                    Cancelar
                                </Button>
                            </Box>
                        )}
                    </Box>
                </>
            )}
        </Backdrop>
    );
}

OverWaiting.propTypes = {
    open: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    message: PropTypes.string,
    progressProps: PropTypes.shape({
        color: PropTypes.oneOf(['primary', 'secondary']),
        value: PropTypes.number,
        variant: PropTypes.oneOf(['buffer', 'determinate', 'indeterminate', 'query'])
    }),
    typographyProps: PropTypes.object,
    onCancel: PropTypes.func,
    cancelable: PropTypes.bool,
    backgroundFlat: PropTypes.bool,
    header: PropTypes.node
};

OverWaiting.defaultProps = {
    open: false,
    min: 0,
    max: 100,
    progressProps: {
        color: 'primary',
        value: 100,
        variant: 'indeterminate'
    },
    typographyProps: {
        color: 'textPrimary',
        variant: 'caption'
    },
    cancelable: true
};

OverWaiting.displayName = 'OverWaiting';

export default OverWaiting;
