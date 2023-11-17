import { memo } from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress, Box, Stack } from '@mui/material';

// Substituir pelo LoadingButton do MUI
const SubmitButton = memo(props => {
    const { children, isSubmitting, variant, disabled, fullWidth, ...restProps } = props;
    return (
        <Box position="relative">
            <Button
                fullWidth={fullWidth}
                {...restProps}
                type={'submit'}
                color={'primary'}
                variant={variant}
                disabled={disabled}>
                {children}
            </Button>
            {isSubmitting && (
                <Stack
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}>
                    <CircularProgress size={24} />
                </Stack>
            )}
        </Box>
    );
});

SubmitButton.propTypes = {
    variant: PropTypes.string,
    disabled: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    children: PropTypes.node,
    fullWidth: PropTypes.bool
};

SubmitButton.defaultProps = {
    variant: 'outlined',
    disabled: false,
    isSubmitting: false
};

SubmitButton.displayName = 'SubmitButton';

export default SubmitButton;
