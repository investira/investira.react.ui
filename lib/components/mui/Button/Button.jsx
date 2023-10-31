import { default as MuiButton } from "@mui/material/Button";

function Button(props) {
  return <MuiButton {...props} />;
}

Button.displayName = "Button";

export default Button;
