import React, { useState } from "react";
import { renders } from "investira.react.lib";
import Basic from "../Basic";
import { styled } from "@mui/material/styles";
import { Box } from "../";

const StyledBasic = styled(Basic)({
  alignItems: "center",
  justifyContent: "center",
  alignContent: "center",
  height: "100%",
});

const Animation = styled("span")({
  "@keyframes -k_actionContainer": {
    "0%": {
      transform: "scale(0)",
      opacity: 0.3,
    },

    "100%": {
      transform: "scale(1)",
      opacity: 0,
    },
  },
  position: "absolute",
  top: 0,
  left: 0,
  width: "50px",
  height: "50px",
  animation: "-k_actionContainer 450ms cubic-bezier(0.4, 0, 0.2, 1)",
});

function ContainerFeedback(props) {
  const [feedbackClick, setFeedbackClick] = useState(false);
  const [epicenter, setEpicenter] = useState({
    left: 0,
    top: 0,
    radius: 0,
  });

  function handleFeedbackClick(e) {
    let xEpicenter = epicenter;
    if (feedbackClick) {
      xEpicenter = epicenter;
    } else {
      xEpicenter = renders.getEpicenterLeftTop(e, props.centralized);
    }

    setFeedbackClick(!feedbackClick);
    setEpicenter(xEpicenter);
  }

  return (
    <>
      <StyledBasic>{props.children}</StyledBasic>
      <Box
        component="span"
        sx={{
          // display: "flex",
          WebkitTouchCallout: "none !important",
          WebkitUserDrag: "none !important",
          WebkitTapHighlightColor: "transparent",
          userSelect: "none !important",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "block",
          zIndex: "0",
          position: "absolute",
          overflow: "hidden",
          borderRadius: "inherit",
        }}
        onMouseDown={handleFeedbackClick}
        style={props.centralized ? { overflow: "unset" } : {}}
      >
        {feedbackClick && (
          <Animation
            style={{
              left: epicenter.left,
              top: epicenter.top,
              width: epicenter.radius,
              height: epicenter.radius,
            }}
            onAnimationEnd={handleFeedbackClick}
          >
            <Box
              component="span"
              sx={{
                display: "block",
                width: "100%",
                height: "100%",
                opacity: 1,
                borderRadius: "50%",
                backgroundColor: "currentColor",
              }}
            />
          </Animation>
        )}
      </Box>
    </>
  );
}

export default ContainerFeedback;
