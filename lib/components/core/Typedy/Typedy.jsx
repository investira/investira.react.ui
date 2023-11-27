import { PureComponent } from 'react';
import Typed from 'typed.js';
import PropTypes from 'prop-types';

class Typedy extends PureComponent {
    componentDidMount() {
        const { strings, typeSpeed, loop, backSpeed, backDelay, smartBackspace } = this.props;

        const xOptions = {
            strings: strings,
            typeSpeed: typeSpeed,
            loop: loop,
            backSpeed: backSpeed,
            backDelay: backDelay,
            smartBackspace: smartBackspace
        };

        this.typed = new Typed(this.elem, xOptions);
    }

    componentWillUnmount() {
        this.typed.destroy();
    }

    render() {
        return (
            <span
                ref={xElem => {
                    this.elem = xElem;
                }}></span>
        );
    }
}

Typedy.propTypes = {
    strings: PropTypes.arrayOf(PropTypes.string),
    typeSpeed: PropTypes.number,
    loop: PropTypes.bool,
    backSpeed: PropTypes.number,
    backDelay: PropTypes.number,
    smartBackspace: PropTypes.bool
};

Typedy.defaultProps = {
    strings: [],
    typeSpeed: 30,
    loop: true,
    backSpeed: 30,
    backDelay: 5000,
    smartBackspace: true
};

Typedy.displayName = 'Typedy';

export default Typedy;
