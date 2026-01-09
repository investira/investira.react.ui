import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const withRedux = (Component, pStateToProps = null, pDispatchToProps = {}) => {
    function WrapComponentWithRedux(props) {
        return <Component {...props} />;
    }

    return connect(pStateToProps, dispatch => bindActionCreators(pDispatchToProps, dispatch))(
        WrapComponentWithRedux
    );
};

export default withRedux;
