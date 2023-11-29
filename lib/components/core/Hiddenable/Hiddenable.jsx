//import React from 'react';
import PropTypes from 'prop-types';

const Hiddenable = props => {
    const { visible = true } = props;
    return visible ? props.children : null;
};

Hiddenable.propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.node.isRequired
};

Hiddenable.displayName = 'Hiddenable';

export default Hiddenable;
