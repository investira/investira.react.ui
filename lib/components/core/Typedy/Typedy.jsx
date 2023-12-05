import { useRef, useEffect } from 'react';
import Typed from 'typed.js';
import PropTypes from 'prop-types';

function Typedy(props) {
    const {
        strings,
        typeSpeed = 30,
        loop = true,
        backSpeed = 30,
        backDelay = 5000,
        smartBackspace = true
    } = props;

    const xElemRef = useRef();
    const xTyped = useRef();

    useEffect(() => {
        const xOptions = {
            strings: strings || [],
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
    }, [strings, typeSpeed, loop, backSpeed, backDelay, smartBackspace]);

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

Typedy.displayName = 'Typedy';

export default Typedy;
