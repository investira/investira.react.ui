import React, { useEffect, useState, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { validators } from 'investira.sdk';

const Container = styled(Stack)(() => ({
    overflowY: 'auto',
    overflowX: 'scroll',
    flexDirection: 'row',
    justifyContent: 'start',
    boxSizing: 'content-box',
    paddingBottom: '17px',
    scrollBehavior: 'smooth',
    WebkitOverflowScrolling: 'touch',
    MsOverflowStyle: 'none', // IE 10+
    scrollbarWidth: 'none', // Firefox
    '&::-webkit-scrollbar': {
        display: 'none'
    }
}));

const Child = styled(Box)(() => ({
    height: '100%',
    padding: '0px 4px',

    '&:first-of-type': {
        paddingLeft: '16px'
    },

    '&:last-of-type': {
        paddingRight: '16px'
    }
}));

const HorizontalList = memo(props => {
    const isMount = useRef(false);
    const elementsRef = [];

    let timeout = null;
    let isScrolling = false;
    let isClicked = false;

    const scrollableRef = React.useRef();
    const [elemFocusIndex, setElemFocusIndex] = useState(props.initialFocus);
    const [childFocused, setChildFocused] = useState(props.id + '0');
    const [initElementsRef, setInitElementsRef] = useState([]);
    const [positions, setPositions] = useState([0]);

    // Centraliza o elemento selecionado
    const centerInScroll = (pIndex, pInitElementsRef, pPositions) => {
        window.clearTimeout(timeout);

        const xSelected = pIndex || 0;

        const xFocusElemRect = pInitElementsRef[xSelected].getBoundingClientRect();

        const xScrollElem = scrollableRef.current;

        if (xScrollElem) {
            const xScrollElemRect = xScrollElem.getBoundingClientRect();
            const xSpacer = (xScrollElemRect.width - xFocusElemRect.width) / 2;

            xScrollElem.scrollLeft = pPositions[xSelected] - xSpacer;
        }

        isClicked = false;
    };

    const calcPosition = pElemtsRect => {
        let xPositions = [0];
        const xTotalArea = pElemtsRect.reduce((xAcumm, xCurrentValue) => {
            const xValue = xAcumm + xCurrentValue.width;
            xPositions.push(xValue);
            return xValue;
        }, 0);

        xPositions = xPositions.filter(xValue => {
            return xValue !== xTotalArea;
        });

        return xPositions;
    };

    // Armazena a posição inicial de cada elemento da lista
    const elemsInitPosition = pElemList => {
        const xInitElemsRect = pElemList.map(elem => {
            return elem.getBoundingClientRect();
        });

        const xPositions = calcPosition(xInitElemsRect);

        return xPositions;
        //setPositions(xPositions);
    };

    const handleClick = (pData, pIndex) => () => {
        window.clearTimeout(timeout);
        isClicked = true;
        setElemFocusIndex(pIndex);
        setChildFocused(props.id + pIndex);
        centerInScroll(pIndex, initElementsRef, positions);
        props.childProps.onClick && props.childProps.onClick(pData, pIndex);
    };

    const handleScroll = e => {
        window.clearTimeout(timeout);

        if (isScrolling || !isClicked) {
            timeout = setTimeout(() => {
                isScrolling = false;
                centerInScroll(elemFocusIndex, initElementsRef, positions);
            }, 2000);
        }
        isScrolling = true;
    };

    useEffect(() => {
        setElemFocusIndex(props.initialFocus);
        setChildFocused(props.id + props.initialFocus);
    }, [props.initialFocus]);

    // TODO: Observar se esse trecho ainda é necessário
    useEffect(() => {
        window.clearTimeout(timeout);

        if (isMount.current && validators.isNull(initElementsRef[elemFocusIndex])) {
            setChildFocused(props.id + elemFocusIndex);
            centerInScroll(elemFocusIndex, initElementsRef, positions);
        }
    }, [initElementsRef]);

    useEffect(() => {
        isMount.current = true;
        if (!validators.isEmpty(elementsRef)) {
            const xPositions = elemsInitPosition(elementsRef);
            setPositions(xPositions);
            setInitElementsRef([...elementsRef]);
            centerInScroll(props.initialFocus, [...elementsRef], xPositions);
        }
        //Unmount
        return () => {
            isMount.current = false;
            window.clearTimeout(timeout);
        };
    }, []);

    // Update
    useEffect(() => {
        window.clearTimeout(timeout);

        if (!validators.isEmpty(elementsRef)) {
            setPositions(elemsInitPosition(elementsRef));
            setInitElementsRef([...elementsRef]);
        }
    }, [props.data]);

    const Component = props.child;

    return (
        <Box sx={{ overflow: 'hidden', willChange: 'overflow' }}>
            <Container
                id={props.id}
                ref={scrollableRef}
                scroll-behavior="smooth"
                onScroll={e => handleScroll(e)}>
                {!validators.isEmpty(props.data) &&
                    props.data.map((xData, xIndex) => {
                        const xCustomKey = props.keyValue ? `_${xData[props.keyValue]}` : '';
                        const xKey = `${props.id}_${xIndex}${xCustomKey}`;

                        return (
                            <Child id={xKey} key={xKey} ref={elem => (elementsRef[xIndex] = elem)}>
                                <Component
                                    {...props.childProps}
                                    id={props.id + xIndex}
                                    focused={childFocused}
                                    data={xData}
                                    index={xIndex}
                                    onClick={handleClick(xData, xIndex)}
                                />
                            </Child>
                        );
                    })}
            </Container>
        </Box>
    );
});

HorizontalList.propTypes = {
    id: PropTypes.string.isRequired,
    child: PropTypes.elementType.isRequired,
    childProps: PropTypes.object,
    data: PropTypes.array.isRequired,
    keyValue: PropTypes.string,
    initialFocus: PropTypes.number //index
};

HorizontalList.defaultProps = {
    data: [],
    initialFocus: 0
};

HorizontalList.displayName = 'HorizontalList';

// export default HorizontalList;
export default HorizontalList;
