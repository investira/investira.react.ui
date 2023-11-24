import PropTypes from 'prop-types';
//import { TextField } from '@mui/material';
import { DesktopDatePicker as MuiDesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import 'moment/min/locales';

const DesktopDatePicker = props => {
    const { textFieldProps, ...restProps } = props;
    return (
        <MuiDesktopDatePicker
            {...restProps}
            //renderInput={(params) => <TextField {...params} {...textFieldProps} />}
            slotProps={{ textField: { ...textFieldProps } }}
        />
    );
};

DesktopDatePicker.propTypes = {
    textFieldProps: PropTypes.object
};

DesktopDatePicker.displayName = 'DesktopDatePicker';

export default DesktopDatePicker;
