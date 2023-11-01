import React from "react";
import PropTypes from "prop-types";

import { Typography, Stack, ProgressBar, Box } from "../";
import { validators } from "investira.sdk";
function InfoBar(props) {
  return (
    <Stack
      justifyContent="flex-start"
      alignItems="stretch"
      direction="column"
      spacing={0}
      flexGrow={1}
    >
      <Typography
        variant={props.variant}
        color={props.labelColor}
        component={props.labelComponent}
      >
        {props.label}
      </Typography>

      <Box sx={{ position: "relative", margin: "4px 0 2px 0" }}>
        <ProgressBar
          animate={props.animate}
          value={props.value}
          color={props.valueColor}
        />
      </Box>

      {(!validators.isEmpty(props.caption) ||
        !validators.isEmpty(props.children)) && (
        <Typography
          variant={props.captionVariant}
          color={props.captionColor}
          component={props.captionComponent}
        >
          {props.children || props.caption}
        </Typography>
      )}
    </Stack>
  );
}

InfoBar.defaultProps = {
  variant: "caption",
  labelColor: "textSecondary",
  labelComponent: "span",
  captionVariant: "caption",
  captionColor: "textPrimary",
  captionComponent: "span",
  valueColor: "primary",
  animate: "progress",
};

InfoBar.propTypes = {
  label: PropTypes.string,
  caption: PropTypes.string,
  captionVariant: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueColor: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "error",
    "warning",
  ]),
  labelColor: PropTypes.oneOf(["textPrimary", "textSecondary"]),
  labelComponent: PropTypes.string,
  captionColor: PropTypes.oneOf(["textPrimary", "textSecondary"]),
  captionComponent: PropTypes.string,
  animate: PropTypes.oneOf(["indeterminate", "progress"]),
};

export default InfoBar;
