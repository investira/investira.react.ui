import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, ButtonBase } from '@mui/material';

function NavDots(props) {
    const [wrapWidth, setWrapWidth] = useState(window.screen.width);
    const [wrapPosition, setWrapPosition] = useState(0);

    const btnRef = useRef();

    const handleClick = pIndex => {
        props.onClick && props.onClick(pIndex);
    };

    const navigation = (pSize, pIndex, pDotWidth) => {
        const xTotalDots = pSize;
        const xTotalVisible = 5;
        const xOffset = 3;
        const xIntervalo = xTotalDots - xTotalVisible;
        const xWalker = pIndex + xOffset;
        const xMultiply = xTotalDots - (xWalker + xIntervalo);

        if (pIndex >= xTotalVisible - xOffset && pIndex <= xTotalDots - xOffset) {
            const xNewPos = pDotWidth * xMultiply;
            setWrapPosition(xNewPos);
        } else if (pIndex < xTotalVisible - xOffset) {
            const xStartPos = 0;
            setWrapPosition(xStartPos);
        } else if (pIndex > xTotalDots - xOffset) {
            const xEndPos = (xTotalDots - xTotalVisible) * pDotWidth;
            setWrapPosition(xEndPos * -1);
        }
    };

    useEffect(() => {
        setWrapWidth(props.size > 5 ? btnRef.current.offsetWidth * props.size : '100%');
    }, []);

    useEffect(() => {
        if (props.size > 5) {
            navigation(props.size, props.index, btnRef.current.offsetWidth);
        }
    }, [props.index]);

    const xChilds = [];

    for (let xI = 0; xI < props.size; xI++) {
        xChilds.push(
            <div ref={btnRef} key={xI}>
                <ButtonBase centerRipple={true} onClick={() => handleClick(xI)}>
                    <Box py={1} px={'13px'}>
                        <Box
                            component="span"
                            sx={[
                                {
                                    display: 'inline-block',
                                    p: 0.5,
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    transition: 'all 0.2s ease-in-out'
                                },
                                props.index === xI && {
                                    backgroundColor: '#00dfa8',
                                    transform: 'scale(1.5)'
                                }
                            ]}
                        />
                    </Box>
                </ButtonBase>
            </div>
        );
    }

    return (
        <Box
            sx={{
                position: 'relative',
                width: '170px',
                overflow: 'hidden',
                color: 'rgba(255, 255, 255, 0.9)'
            }}>
            <Box
                sx={[
                    {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease-in-out'
                    },
                    props.size > 5 && { justifyContent: 'flex-start' }
                ]}
                style={{
                    width: wrapWidth,
                    transform: `translate(${wrapPosition}px,0px)`
                }}>
                {xChilds}
            </Box>
        </Box>
    );
}

NavDots.propTypes = {
    onClick: PropTypes.func,
    size: PropTypes.number,
    index: PropTypes.number
};

NavDots.displayName = 'NavDots';

export default NavDots;
