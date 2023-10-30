import { TextField } from "@mui/material";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";

const KeyboardDatePicker = (props) => {
  return (
    <MuiDatePicker
      {...props}
      refuse={/[^\d]+/gi}
      cancelLabel="fechar"
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default KeyboardDatePicker;
