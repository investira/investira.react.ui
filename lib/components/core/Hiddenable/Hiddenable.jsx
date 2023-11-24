//import React from 'react';
import PropTypes from 'prop-types';

const Hiddenable = props => {
    return props.visible ? props.children : null;
};

Hiddenable.propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.node.isRequired
};

Hiddenable.defaultProps = {
    visible: true
};

Hiddenable.displayName = 'Hiddenable';

export default Hiddenable;
