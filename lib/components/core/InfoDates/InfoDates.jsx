import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { formats, validators } from 'investira.sdk';

formats.locale('pt-br');

function InfoDates(props) {
    const {
        variant = 'caption',
        labelVariant = 'caption',
        timeVariant = 'caption',
        colon = false,
        gutterBottom = true,
        label,
        time,
        bold,
        color,
        format,
        direction
    } = props;
    return (
        <Box
            sx={[
                props.direction === 'horizontal' && {
                    display: 'flex'
                }
            ]}>
            <Box
                sx={[
                    props.direction === 'horizontal' && {
                        mr: 1
                    }
                ]}>
                <Typography
                    variant={labelVariant}
                    color={'textSecondary'}
                    gutterBottom={gutterBottom}
                    component="p">
                    {label}
                    {(colon || direction === 'horizontal') && ':'}
                </Typography>
            </Box>
            {validators.isEmpty(time) ? (
                <Typography
                    variant={timeVariant}
                    color={'textPrimary'}
                    gutterBottom={gutterBottom}
                    component="p">
                    --
                </Typography>
            ) : bold ? (
                <Typography
                    variant={timeVariant}
                    color={color || 'textPrimary'}
                    gutterBottom={gutterBottom}
                    component="p">
                    <b>
                        {variant === 'custom' && formats.formatDateCustom(time, format)}
                        {variant === 'datetime' &&
                            formats.formatDateCustom(time, 'DD/MMM/YY HH:mm')}
                        {variant === 'date' && formats.formatDateCustom(time, 'DD/MMM/YY')}
                        {variant === 'duration' && formats.duration(time)}
                        {variant === 'fromnow' && formats.fromNow(time)}
                    </b>
                </Typography>
            ) : (
                <Typography
                    variant={timeVariant}
                    color={color || 'textPrimary'}
                    gutterBottom={gutterBottom}
                    component="p">
                    {variant === 'custom' && formats.formatDateCustom(time, format)}
                    {variant === 'datetime' && formats.formatDateCustom(time, 'DD/MMM/YY HH:mm')}
                    {variant === 'date' && formats.formatDateCustom(time, 'DD/MMM/YY')}
                    {variant === 'duration' && formats.duration(time)}
                    {variant === 'fromnow' && formats.fromNow(time)}
                </Typography>
            )}
        </Box>
    );
}

InfoDates.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    gutterBottom: PropTypes.bool,
    variant: PropTypes.string,
    labelVariant: PropTypes.string,
    time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    timeVariant: PropTypes.string,
    format: PropTypes.string,
    colon: PropTypes.bool,
    bold: PropTypes.bool,
    direction: PropTypes.string,
    color: PropTypes.oneOf(['textPrimary', 'textSecondary'])
};

InfoDates.displayName = 'InfoDates';

export default InfoDates;
