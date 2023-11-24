import PropTypes from 'prop-types';
import { validators } from 'investira.sdk';

export const Basic = props => {
    // eslint-disable-next-line no-unused-vars
    const { id, idSuffix, tag, ...xPassThruAttrs } = props;

    let Tag = props.tag;
    let xId = null;
    if (!validators.isEmpty(props.id)) {
        xId = props.id.trim();
        if (!validators.isEmpty(props.idSuffix)) {
            xId += props.idSuffix.trim();
        }
    }

    return (
        <Tag {...xPassThruAttrs} id={xId} name={xId}>
            {props.children}
        </Tag>
    );
};

Basic.propTypes = {
    id: PropTypes.string,
    idSuffix: PropTypes.string,
    tag: PropTypes.string,
    children: PropTypes.node
};

Basic.defaultProps = {
    tag: 'div'
};

Basic.displayName = 'Basic';

export default Basic;
