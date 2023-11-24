import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { dates } from 'investira.sdk';

const FriendlyDatePicker = props => {
    const xMomentUtils = new props.utils({
        locale: props.locale
    });

    const xCurrentDate = xMomentUtils.date(props.value);
    const xTodayDate = xMomentUtils.date(dates.toDate());

    const xDate = {
        year: xMomentUtils.getYearText(xCurrentDate),
        month: xMomentUtils.getMonthText(xCurrentDate),
        day: xMomentUtils.getDayText(xCurrentDate),
        today: xMomentUtils.isSameDay(xCurrentDate, xTodayDate)
    };

    const xDaySx = {
        color: 'primary.main',
        textTransform: 'uppercase',
        ...((props.locked || props.disabled) && {
            color: 'secondary.light'
        })
    };

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'start',
                alignContent: 'center',
                flexWrap: 'wrap'
            }}>
            <Box sx={{ width: '100%' }}>
                <Typography color={'textSecondary'} variant={'caption'}>
                    {props.label}
                </Typography>
            </Box>
            {xDate.today ? (
                <Box sx={xDaySx}>
                    <Box sx={{ paddingTop: '19px' }}>
                        <Typography color={'inherit'} variant={'h4'}>
                            Hoje
                        </Typography>
                    </Box>
                </Box>
            ) : (
                <Box sx={xDaySx}>
                    <Typography color={'inherit'} variant={'body2'}>
                        {xDate.day} <span style={{ fontWeight: 500 }}>{xDate.month}</span>
                    </Typography>
                    <Typography color={'inherit'} variant={'h4'}>
                        {xDate.year}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

FriendlyDatePicker.propTypes = {
    utils: PropTypes.func,
    locale: PropTypes.string,
    value: PropTypes.string,
    locked: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string
};

FriendlyDatePicker.defaultProps = {
    locale: 'pt-br'
};

FriendlyDatePicker.displayName = 'FriendlyDatePicker';

export default FriendlyDatePicker;
