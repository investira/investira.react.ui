import { Typography, Box } from '@mui/material';
import { validators } from 'investira.sdk';
import PropTypes from 'prop-types';

function Info(props) {
    const {
        variant = 'caption',
        labelColor = 'textSecondary',
        gutterBottom = true,
        valueColor = 'textPrimary',
        variantValue = 'caption',
        direction = 'vertical',
        colon = false,
        bold = false,
        gutter,
        label,
        onClick,
        value
    } = props;

    return (
        <Box
            sx={[
                gutter === 'full' && {
                    mx: 2
                },
                gutter === 'left' && {
                    ml: 2
                },
                gutter === 'right' && {
                    mr: 2
                },
                direction === 'horizontal' && {
                    display: 'flex',
                    alignItems: 'center'
                }
            ]}
            id={label}
            onClick={onClick}>
            <Box
                sx={{
                    ...(direction === 'horizontal' && {
                        mr: 1
                    })
                }}>
                <Typography
                    variant={variant}
                    color={labelColor}
                    gutterBottom={gutterBottom}
                    component="p">
                    {label}
                    {(colon || direction === 'horizontal') && ':'}
                </Typography>
            </Box>
            {validators.isEmpty(value) ? (
                <Typography
                    variant={variantValue}
                    color={valueColor}
                    gutterBottom={gutterBottom}
                    component="p">
                    --
                </Typography>
            ) : bold ? (
                <Typography
                    variant={variantValue || variant}
                    color={valueColor}
                    gutterBottom={gutterBottom}
                    component="p">
                    <b> {props.value} </b>
                </Typography>
            ) : (
                <Typography
                    variant={variantValue || variant}
                    color={valueColor}
                    gutterBottom={gutterBottom}
                    component="p">
                    {props.value}
                </Typography>
            )}
        </Box>
    );
}

Info.propTypes = {
    onClick: PropTypes.func,
    direction: PropTypes.oneOf(['vertical', 'horizontal']),
    colon: PropTypes.bool,
    bold: PropTypes.bool,
    gutter: PropTypes.oneOf(['left', 'full', 'right']),
    gutterBottom: PropTypes.bool,
    label: PropTypes.string,
    className: PropTypes.string,
    variant: PropTypes.string,
    variantValue: PropTypes.string,
    labelColor: PropTypes.string,
    valueColor: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number])
};

Info.displayName = 'Info';

export default Info;
