import PropTypes from "prop-types";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

function ThemeProvider(props) {
  const { children, theme } = props;
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default ThemeProvider;
