import React from "react";
import { Box, Typography } from "../";
import { formats, validators } from "investira.sdk";
import PropTypes from "prop-types";

formats.locale("pt-br");

function InfoDates(props) {
  return (
    <Box
      sx={[
        props.direction === "horizontal" && {
          display: "flex",
        },
      ]}
    >
      <Box
        sx={[
          props.direction === "horizontal" && {
            mr: 1,
          },
        ]}
      >
        <Typography
          variant={props.labelVariant}
          color={"textSecondary"}
          gutterBottom={props.gutterBottom}
          component="p"
        >
          {props.label}
          {(props.colon || props.direction === "horizontal") && ":"}
        </Typography>
      </Box>
      {validators.isEmpty(props.time) ? (
        <Typography
          variant={props.timeVariant}
          color={"textPrimary"}
          gutterBottom={props.gutterBottom}
          component="p"
        >
          --
        </Typography>
      ) : props.bold ? (
        <Typography
          variant={props.timeVariant}
          color={props.color || "textPrimary"}
          gutterBottom={props.gutterBottom}
          component="p"
        >
          <b>
            {props.variant === "custom" &&
              formats.formatDateCustom(props.time, props.format)}
            {props.variant === "datetime" &&
              formats.formatDateCustom(props.time, "DD/MMM/YY HH:mm")}
            {props.variant === "date" &&
              formats.formatDateCustom(props.time, "DD/MMM/YY")}
            {props.variant === "duration" && formats.duration(props.time)}
            {props.variant === "fromnow" && formats.fromNow(props.time)}
          </b>
        </Typography>
      ) : (
        <Typography
          variant={props.timeVariant}
          color={props.color || "textPrimary"}
          gutterBottom={props.gutterBottom}
          component="p"
        >
          {props.variant === "custom" &&
            formats.formatDateCustom(props.time, props.format)}
          {props.variant === "datetime" &&
            formats.formatDateCustom(props.time, "DD/MMM/YY HH:mm")}
          {props.variant === "date" &&
            formats.formatDateCustom(props.time, "DD/MMM/YY")}
          {props.variant === "duration" && formats.duration(props.time)}
          {props.variant === "fromnow" && formats.fromNow(props.time)}
        </Typography>
      )}
    </Box>
  );
}

InfoDates.defaultProps = {
  variant: "caption",
  labelVariant: "caption",
  timeVariant: "caption",
  colon: false,
  gutterBottom: true,
};

InfoDates.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  gutterBottom: PropTypes.bool,
  variant: PropTypes.string,
  labelVariant: PropTypes.string,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  timeVariant: PropTypes.string,
  format: PropTypes.string,
  colon: PropTypes.bool,
  bold: PropTypes.bool,
  direction: PropTypes.string,
  color: PropTypes.oneOf(["textPrimary", "textSecondary"]),
};

export default InfoDates;
