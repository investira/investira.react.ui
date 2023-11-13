import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import classNames from 'classnames';
import { Typography } from '../';
import { dates } from 'investira.sdk';

const useStyles = makeStyles(
    theme => {
        return {
            root: {
                position: 'relative',
                display: 'flex',
                justifyContent: 'start',
                alignContent: 'center',
                flexWrap: 'wrap'
            },
            monthYear: {
                padding: '4px 0',
                marginRight: '8px',
                color: theme.palette.primary.main,
                textAlign: 'right',
                textTransform: 'uppercase'
            },
            day: {
                color: theme.palette.primary.main,
                textTransform: 'uppercase'
            },
            label: {
                width: '100%'
            },
            locked: {
                color: theme.palette.secondary.light
            },
            disabled: {
                color: theme.palette.secondary.light
            }
        };
    },
    { name: 'FriendlyDatePicker' }
);

const FriendlyDatePicker = props => {
    const classes = useStyles();

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

    const xClassDay = classNames(classes.day, {
        [classes.locked]: props.locked,
        [classes.disabled]: props.disabled
    });

    return (
        <div className={classes.root}>
            <div className={classes.label}>
                <Typography color={'textSecondary'} variant={'caption'}>
                    {props.label}
                </Typography>
            </div>
            {xDate.today ? (
                <div className={xClassDay}>
                    <div style={{ paddingTop: '19px' }}>
                        <Typography color={'inherit'} variant={'h4'}>
                            Hoje
                        </Typography>
                    </div>
                </div>
            ) : (
                <>
                    <div className={xClassDay}>
                        <Typography color={'inherit'} variant={'body2'}>
                            {xDate.day} <span style={{ fontWeight: 500 }}>{xDate.month}</span>
                        </Typography>
                        <Typography color={'inherit'} variant={'h4'}>
                            {xDate.year}
                        </Typography>
                    </div>
                </>
            )}
        </div>
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

export default FriendlyDatePicker;
