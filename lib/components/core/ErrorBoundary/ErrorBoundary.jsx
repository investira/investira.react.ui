import { Component } from 'react';
import PropTypes from 'prop-types';
import { ErrorBody, ErrorData } from '../';

const ERROR = {
    EMPTY_DATA: 'ERROR_EMPTY_DATA',
    RESPONSE: 'ERROR_RESPONSE'
};

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            info: '',
            error: ''
        };
    }

    static getDerivedStateFromError() {
        return {
            hasError: true
        };
    }

    componentDidCatch(error, info) {
        this.setState({ error: error.message, info: JSON.stringify(info) });
    }

    retry = () => {
        this.setState({ hasError: false });
    };

    render() {
        if (this.state.hasError) {
            if (this.state.error === ERROR.RESPONSE || this.state.error === ERROR.EMPTY_DATA) {
                return <ErrorData error={this.state.error} handleClick={this.retry} />;
            }

            return <ErrorBody handleClick={this.retry} message={'Oops! Algo deu errado!'} />;
        } else {
            return this.props.children;
        }
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.element
};

export default ErrorBoundary;
