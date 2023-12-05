import { memo } from "react";
import PropTypes from "prop-types";
import CrudContext from "../CrudContext";

const CrudConsumer = memo((props) => {
  return <CrudContext.Consumer>{props.children}</CrudContext.Consumer>;
});

CrudConsumer.propTypes = {
  children: PropTypes.func.isRequired,
};

CrudConsumer.displayName = "CrudConsumer";

export default CrudConsumer;
