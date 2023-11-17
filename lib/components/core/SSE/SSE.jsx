import React, { PureComponent } from "react";
//import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import { validators } from "investira.sdk";

import { Typography, CenterInView } from "../";

let eventSource = null;

class SSE extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: props.initialValue,
      error: false,
    };

    this.isMount = false;
  }

  updateResponseData = (pReponseData, pPrevData) => {
    const xResponseDataParsed = JSON.parse(pReponseData);

    let xResponseData = null;

    if (validators.isArray(xResponseDataParsed)) {
      xResponseData = [...pPrevData, ...xResponseDataParsed];
    } else {
      xResponseData = { ...pPrevData, ...xResponseDataParsed };
    }

    this.isMount &&
      this.setState({
        data: xResponseData,
      });
  };

  updateError = (pValue) => {
    this.isMount &&
      this.setState({
        error: pValue,
      });
  };

  componentDidMount() {
    this.isMount = true;

    eventSource = new EventSource(this.props.route);

    eventSource.onmessage = (e) => {
      this.updateResponseData(e.data, this.state.data);
    };

    eventSource.onerror = (e) => {
      !validators.isNull(e.data) && this.updateError(true);
    };
  }

  componentWillUnmount() {
    this.isMount = false;
    eventSource && eventSource.close();
  }

  render() {
    if (this.state.error) {
      return (
        <CenterInView>
          <Typography
            color={"textSecondary"}
            variant={"caption"}
            align={"center"}
            component={"p"}
          >
            Falha na conexão SSE
          </Typography>
        </CenterInView>
      );
    }

    return React.cloneElement(React.Children.only(this.props.children), {
      responseData: this.state.data,
    });
  }
}

SSE.propTypes = {
  children: PropTypes.element.isRequired,
  route: PropTypes.string.isRequired,
  initialValue: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

SSE.defaultProps = {
  initialValue: {},
};

export default SSE;
