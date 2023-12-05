/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const Root = styled(Box)(({ isSticky }) => ({
    position: 'relative',
    top: '-1px',
    transition: '0.2s ease-out',
    zIndex: '99',
    overflow: 'auto',
    background:
        'linear-gradient(to bottom,rgba(25, 27, 42, 1) 0%,rgba(25, 27, 42, 1) 71%,rgba(25, 27, 42, 0.1) 100%)',
    ...(isSticky && {
        position: 'sticky'
    })
}));

// Verificar o comportamento do isSticky na PosicaoDistribuicao. Está piscando loucamente.
function Sticky({ children, sticky = false, className, ...rest }) {
    const [isSticky, setIsSticky] = useState(false);
    const elemRef = useRef();

    // mount
    useEffect(() => {
        const cachedRef = elemRef.current,
            observer = new IntersectionObserver(([e]) => setIsSticky(e.intersectionRatio < 1), {
                threshold: [1]
            });

        observer.observe(cachedRef);

        // unmount
        return function () {
            observer.unobserve(cachedRef);
        };
    }, []);

    return (
        <Root isSticky={isSticky} ref={elemRef} {...rest}>
            {children}
        </Root>
    );
}

Sticky.propTypes = {
    children: PropTypes.node,
    sticky: PropTypes.bool,
    className: PropTypes.string
};

Sticky.displayName = 'Sticky';

export default Sticky;
