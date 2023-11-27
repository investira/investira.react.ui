import { useRef, useEffect } from 'react';
import Typed from 'typed.js';
import PropTypes from 'prop-types';

function Typedy(props) {
    const xElemRef = useRef();
    const xTyped = useRef();

    useEffect(() => {
        const { strings, typeSpeed, loop, backSpeed, backDelay, smartBackspace } = props;
        const xOptions = {
            strings: strings,
            typeSpeed: typeSpeed,
            loop: loop,
            backSpeed: backSpeed,
            backDelay: backDelay,
            smartBackspace: smartBackspace
        };

        xTyped.current = new Typed(xElemRef.current, xOptions);

        return () => {
            xTyped.current.destroy();
        };
    }, [props]);

    return <span ref={xElemRef}></span>;
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
