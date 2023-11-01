import React from "react";
import { Typography, Box } from "../";
import { validators } from "investira.sdk";
import PropTypes from "prop-types";

function Info(props) {
  return (
    <Box
      sx={[
        props.gutter === "full" && {
          mx: 2,
        },
        props.gutter === "left" && {
          ml: 2,
        },
        props.gutter === "right" && {
          mr: 2,
        },
        props.direction === "horizontal" && {
          display: "flex",
          alignItems: "center",
        },
      ]}
      id={props.label}
      onClick={props.onClick}
    >
      <Box
        sx={{
          ...(props.direction === "horizontal" && {
            mr: 1,
          }),
        }}
      >
        <Typography
          variant={props.variant}
          color={props.labelColor}
          gutterBottom={props.gutterBottom}
          component="p"
        >
          {props.label}
          {(props.colon || props.direction === "horizontal") && ":"}
        </Typography>
      </Box>
      {validators.isEmpty(props.value) ? (
        <Typography
          variant={props.variantValue}
          color={props.valueColor}
          gutterBottom={props.gutterBottom}
          component="p"
        >
          --
        </Typography>
      ) : props.bold ? (
        <Typography
          variant={props.variantValue || props.variant}
          color={props.valueColor}
          gutterBottom={props.gutterBottom}
          component="p"
        >
          <b> {props.value} </b>
        </Typography>
      ) : (
        <Typography
          variant={props.variantValue || props.variant}
          color={props.valueColor}
          gutterBottom={props.gutterBottom}
          component="p"
        >
          {props.value}
        </Typography>
      )}
    </Box>
  );
}

Info.defaultProps = {
  variant: "caption",
  labelColor: "textSecondary",
  gutterBottom: true,
  valueColor: "textPrimary",
  variantValue: "caption",
  direction: "vertical",
  colon: false,
  bold: false,
};

Info.propTypes = {
  onClick: PropTypes.func,
  direction: PropTypes.oneOf(["vertical", "horizontal"]),
  colon: PropTypes.bool,
  bold: PropTypes.bool,
  gutter: PropTypes.oneOf(["left", "full", "right"]),
  gutterBottom: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  variantValue: PropTypes.string,
  labelColor: PropTypes.string,
  valueColor: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default Info;
