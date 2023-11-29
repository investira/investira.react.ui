import PropTypes from 'prop-types';
import { Typography, Stack, Box } from '@mui/material';
import { validators } from 'investira.sdk';
import { ProgressBar } from '../';

function InfoBar(props) {
    const {
        variant = 'caption',
        labelColor = 'textSecondary',
        labelComponent = 'span',
        caption,
        captionVariant = 'caption',
        captionColor = 'textPrimary',
        captionComponent = 'span',
        value,
        valueColor = 'primary',
        animate = 'progress',
        children
    } = props;

    return (
        <Stack
            justifyContent="flex-start"
            alignItems="stretch"
            direction="column"
            spacing={0}
            flexGrow={1}>
            <Typography variant={variant} color={labelColor} component={labelComponent}>
                {props.label}
            </Typography>

            <Box sx={{ position: 'relative', margin: '4px 0 2px 0' }}>
                <ProgressBar animate={animate} value={value} color={valueColor} />
            </Box>

            {(!validators.isEmpty(caption) || !validators.isEmpty(children)) && (
                <Typography
                    variant={captionVariant}
                    color={captionColor}
                    component={captionComponent}>
                    {children || caption}
                </Typography>
            )}
        </Stack>
    );
}

InfoBar.propTypes = {
    label: PropTypes.string,
    caption: PropTypes.string,
    captionVariant: PropTypes.string,
    className: PropTypes.string,
    variant: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    valueColor: PropTypes.oneOf(['primary', 'secondary', 'info', 'error', 'warning']),
    labelColor: PropTypes.oneOf(['textPrimary', 'textSecondary']),
    labelComponent: PropTypes.string,
    captionColor: PropTypes.oneOf(['textPrimary', 'textSecondary']),
    captionComponent: PropTypes.string,
    animate: PropTypes.oneOf(['indeterminate', 'progress']),
    children: PropTypes.node
};

InfoBar.displayName = 'InfoBar';

export default InfoBar;
