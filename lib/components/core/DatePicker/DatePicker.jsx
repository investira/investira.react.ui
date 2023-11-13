import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import { TextField } from '@mui/material';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import { FriendlyDatePicker } from '../';

import 'moment/min/locales';

const DatePicker = props => {
    const { friendly, locked, disabled, ...otherProps } = props;

    const xPickerSx = {
        ...(friendly && {
            position: 'absolute !important',
            top: '0',
            left: '0',
            opacity: '0',
            height: '100%'
        })
    };

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
                sx={xPickerSx}
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
