import classNames from 'classnames';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import MomentUtils from '@date-io/moment';
import { TextField } from '@mui/material';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import FriendlyDatePicker from '../FriendlyDatePicker';

import 'moment/min/locales';

const useStyles = makeStyles(
    () => ({
        root: {
            position: 'relative'
        },
        hidePicker: {
            position: 'absolute !important',
            top: '0',
            left: '0',
            opacity: '0',
            height: '100%'
        }
    }),
    { name: 'DatePicker' }
);

const DatePicker = props => {
    const classes = useStyles();

    const { friendly, locked, disabled, ...otherProps } = props;

    const xClassPicker = classNames(classes.picker, {
        [classes.hidePicker]: friendly
    });

    return (
        <>
            {friendly && (
                <FriendlyDatePicker
                    utils={MomentUtils}
                    locale={props.locale}
                    locked={locked}
                    disabled={disabled}
                    {...otherProps}
                />
            )}

            <MuiDatePicker
                {...otherProps}
                disabled={locked || disabled}
                autoComplete={'off'}
                refuse={/[^\d]+/gi}
                cancelLabel="fechar"
                className={xClassPicker}
                renderInput={params => <TextField {...params} />}
            />
        </>
    );
};

DatePicker.propTypes = {
    friendly: PropTypes.bool,
    locale: PropTypes.string,
    locked: PropTypes.bool,
    disabled: PropTypes.bool
};

DatePicker.defaultProps = {
    friendly: true,
    locale: 'pt-br'
};

export default DatePicker;
