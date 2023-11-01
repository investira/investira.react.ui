import React from "react";
import { Typography, Icon, Box, Stack } from "../";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const Root = styled(Box)(({ gutter }) => ({
  ...(gutter && {
    margin: "0px 16px",
  }),
}));

const DivIcon = styled(Stack)(({ value }) => ({
  ...(!value && {
    height: "28px",
    alignItems: "center",
    flexDirection: "row",
  }),
}));
function InfoBool(props) {
  return (
    <Root gutter={props.gutter}>
      <Typography
        variant={props.variant}
        color={props.labelColor}
        component="p"
      >
        {props.label}
      </Typography>
      <DivIcon value={props.value}>
        <Icon
          color={props.value ? "greenLight" : "error"}
          iconName={props.value ? "ok" : "cancel"}
          size={props.value ? 24 : 16}
        />
      </DivIcon>
    </Root>
  );
}

InfoBool.defaultProps = {
  variant: "caption",
  labelColor: "textSecondary",
};

InfoBool.propTypes = {
  onClick: PropTypes.func,
  gutter: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  labelColor: PropTypes.string,
  value: PropTypes.bool,
};

export default InfoBool;
