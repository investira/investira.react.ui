import { forwardRef } from "react";
import { default as MuiIconButton } from "@mui/material/IconButton";

const IconButton = forwardRef((props, ref) => {
  return <MuiIconButton {...props} ref={ref} />;
});

IconButton.displayName = "IconButton";

export default IconButton;
