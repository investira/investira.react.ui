import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tooltip from "@mui/material";
import { styled } from "@mui/material/styles";
import Icon from "../Icon";

const Button = styled("button")(() => ({
  display: "inline-block",
  position: "relative",
  pointerEvents: "all",
  verticalAlign: "top",
  border: 0,
  height: "16px",
  width: "16px",
  margin: "0 4px",
  "& > svg": {
    position: "absolute",
    top: 0,
    left: 0,
  },
}));

function CopyToClipboard(props) {
  const [iconName, setIconName] = useState("paper");
  const [tooltip, setTooltip] = useState("Copiar");

  let body = document.getElementsByTagName("body")[0];

  let timeout = null;

  const copyToClipboard = (pValue, pEvent) => {
    pEvent.stopPropagation();
    const tempInput = document.createElement("input");
    body.appendChild(tempInput);
    tempInput.setAttribute("value", pValue.toString());
    tempInput.select();
    document.execCommand("copy");
    body.removeChild(tempInput);

    setIconName("ok");
    setTooltip("COPIADO!");
  };

  const resetState = () => {
    timeout = setTimeout(() => {
      setIconName("paper");
      setTooltip("Copiar");
    }, 1000);
  };

  useEffect(() => {
    resetState();
  }, [iconName]);

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Tooltip title={tooltip} placement="top">
      <Button onClick={(e) => copyToClipboard(props.value, e)}>
        <Icon iconName={iconName} size={16} color={"primary"} />
      </Button>
    </Tooltip>
  );
}

CopyToClipboard.propTypes = {
  value: PropTypes.string.isRequired,
};

export default CopyToClipboard;
