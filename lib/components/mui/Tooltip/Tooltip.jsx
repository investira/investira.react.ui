import { forwardRef } from "react";
import { default as MuiTooltip } from "@mui/material/Tooltip";

const Tooltip = forwardRef((props, ref) => {
  return <MuiTooltip {...props} ref={ref} />;
});

Tooltip.displayName = "Tooltip";

export default Tooltip;
