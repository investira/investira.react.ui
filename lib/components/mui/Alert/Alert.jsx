import { forwardRef } from "react";
import { default as MuiAlert } from "@mui/material/Alert";

const Alert = forwardRef((props, ref) => {
  return <MuiAlert {...props} ref={ref} />;
});

Alert.displayName = "Alert";

export default Alert;
