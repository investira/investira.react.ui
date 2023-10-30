import { forwardRef } from "react";
import { default as MuiFormControlLabel } from "@mui/material/FormControlLabel";

const FormControlLabel = forwardRef((props, ref) => {
  return <MuiFormControlLabel {...props} ref={ref} />;
});

FormControlLabel.displayName = "FormControlLabel";

export default FormControlLabel;
