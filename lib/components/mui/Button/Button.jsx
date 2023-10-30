import { default as MuiWButton } from "@mui/material/Button";

function Button(props) {
  return <MuiWButton {...props} />;
}

Button.displayName = "Button";

export default Button;
