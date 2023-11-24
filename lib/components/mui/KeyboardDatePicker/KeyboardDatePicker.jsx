import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';

const KeyboardDatePicker = props => {
    return (
        <MuiDatePicker
            {...props}
            refuse={/[^\d]+/gi}
            cancelLabel="fechar"
            slotProps={{ textField: {} }}
        />
    );
};

export default KeyboardDatePicker;
