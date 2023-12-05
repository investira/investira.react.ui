import { forwardRef } from "react";
import { default as MuiStack } from "@mui/material/Stack";

const Stack = forwardRef((props, ref) => {
  return <MuiStack {...props} ref={ref} />;
});

Stack.displayName = "Stack";

export default Stack;
