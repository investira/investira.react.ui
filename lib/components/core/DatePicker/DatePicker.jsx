import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import { FriendlyDatePicker } from '../';

import 'moment/min/locales';

const DatePicker = props => {
    const {
        friendly = true,
        locked = false,
        locale = 'pt-br',
        disabled = false,
        ...otherProps
    } = props;

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
                    locale={locale}
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
                slotProps={{ textField: {} }}
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

DatePicker.displayName = 'DatePicker';

export default DatePicker;
