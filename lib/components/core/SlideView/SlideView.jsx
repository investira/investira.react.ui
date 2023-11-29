/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Hammer from 'hammerjs';
import { Icon, NavDots } from '../';
import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Style from './SlideView.module.css';

//TODO: Encontrar uam solução para o style

// const DotButton = styled(ButtonBase)(({ theme }) => ({
//     display: 'inline-block',
//     margin: '8px',
//     padding: '8px',
//     borderRadius: '50%',
//     color: alpha(theme.palette.white, 0.9)
// }));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.primary
}));
function SlideView(props) {
    const { area = 'content', nav } = props;
    const [wrapWidth, setWrapWidth] = useState(0);
    const [wrapPosition, setWrapPosition] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);
    const [slideChildWidth, setSlideChildWidth] = useState(0);
    const [slideCount, setSlideCount] = useState(0);
    const [slideCurrent, setSlideCurrent] = useState(0);
    const [backButton, setBackButton] = useState(false);
    const [nextButton, setNextButton] = useState(true);
    const [swipeableState, setSwipeableState] = useState(props.swipeable);
    const [roadmap, setRoadmap] = useState([]);
    const [triggerNext, setTriggerNext] = useState(false);
    let views = [];
    const slideRef = useRef();
    const slideWrapRef = useRef();
    const slideChildRef = useRef();

    const _isMounted = useRef(false);

    // function dotsButtons(pChildrens) {
    //   const xMaxDots = 5;

    //   let xCurrent = [...pChildrens];

    //   xCurrent.slice(slideCurrent, slideCurrent + xMaxDots);

    //   const elements = xCurrent.map((_, i) => {
    //     return (
    //       <DotButton key={i} centerRipple={true} onClick={() => move(i)}>
    //         <Box
    //           component="span"
    //           sx={[
    //             (theme) => (
    //               {
    //                 display: "block",
    //                 width: "8px",
    //                 height: "8px",
    //                 borderRadius: "50%",
    //                 backgroundColor: alpha(theme.palette.white, 0.9),
    //               },
    //               slideCurrent === i && {
    //                 backgroundColor: theme.palette.primary,
    //               }
    //             ),
    //           ]}
    //         />
    //       </DotButton>
    //     );
    //   });

    //   return elements;
    // }

    const nextSlide = () => {
        if (slideCurrent < slideCount - 1) {
            const xNewSlideCurrent = slideCurrent + 1;
            setSlideCurrent(xNewSlideCurrent);
            move(xNewSlideCurrent);
        }
    };

    const prevSlide = () => {
        if (slideCurrent > 0) {
            const xNewSlideCurrent = slideCurrent - 1;
            setSlideCurrent(xNewSlideCurrent);
            move(xNewSlideCurrent);
        }
    };

    const mapChildrens = () => {
        let elements = props.children.map((child, i) => {
            return (
                <Box
                    key={`${props.id}-${i}`}
                    ref={slideChildRef}
                    id={`slideview-${i}`}
                    sx={[
                        {
                            pointerEvents: 'none',
                            width: 'calc(100vw - 24px)',
                            padding: '0 4px',
                            height: 'calc(100% - 34px)',
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            overflowY: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            zIndex: 0
                        },
                        props.fullWidth && {
                            width: '100vw',
                            height: '100%',
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            overflowY: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            zIndex: 0
                        }
                    ]}
                    style={{
                        zIndex: 100 - i
                    }}>
                    {child}
                </Box>
            );
        });

        return elements;
    };

    function setElementsSizes() {
        if (_isMounted.current) {
            let xChildCount = React.Children.count(props.children);
            let xSlideWidth = slideRef.current.offsetWidth;
            let xSlideChildWidth = slideChildRef.current.offsetWidth;
            let xWrapWidth = xSlideWidth;

            setWrapWidth(xWrapWidth);
            setSlideWidth(xSlideWidth);
            setSlideChildWidth(xSlideChildWidth);
            setSlideCount(xChildCount);
        }
    }

    function onPan(e) {
        e.preventDefault();
        let xDelta = e.deltaX;
        let xPercent = (100 / wrapWidth) * xDelta;

        let xAnimate = false;

        if (e.type === 'panend' || e.type === 'pancancel') {
            if (Math.abs(xPercent) > 21 && e.type === 'panend') {
                let xSlideCurrent = slideCurrent;

                setSlideCurrent((xSlideCurrent += xPercent < 0 ? 1 : -1));

                if (swipeableState && slideCount === slideCurrent && xPercent < -50) {
                    props.onSlideFinish && props.onSlideFinish();
                }
            }

            xPercent = 0;
            xAnimate = true;
        }

        move(slideCurrent, xPercent, xAnimate);
    }

    const move = (pMoveIndex, pPercent, pAnimate) => {
        if (_isMounted.current) {
            setSlideCurrent(pMoveIndex);
            let xMoveIndex = Math.max(0, Math.min(pMoveIndex, slideCount - 1));
            let xPercent = pPercent || 0;
            let xClassName = slideWrapRef.current.className;

            if (pAnimate) {
                if (xClassName.indexOf(Style.swapped) === -1) {
                    slideWrapRef.current.className += ` ${Style.swapped}`;
                }
            } else {
                if (xClassName.indexOf(Style.swapped) !== -1) {
                    slideWrapRef.current.className = xClassName.replace(Style.swapped, '').trim();
                }
            }

            let xViewIndex, xPos, xTranslate;

            for (xViewIndex = 0; xViewIndex < slideCount; xViewIndex++) {
                if (props.fullWidth) {
                    xPos = (wrapWidth / 100) * ((xViewIndex - xMoveIndex) * 100 + xPercent);
                } else {
                    xPos = (slideChildWidth / 100) * ((xViewIndex - xMoveIndex) * 100 + xPercent);
                    xPos = xPos + 12;
                }

                if (Hammer.DIRECTION_HORIZONTAL) {
                    xTranslate = 'translate3d(' + xPos + 'px, 0, 0)';
                }

                views[xViewIndex].style.transform = xTranslate;
                views[xViewIndex].style.mozTransform = xTranslate;
                views[xViewIndex].style.webkitTransform = xTranslate;
            }

            setSlideCurrent(xMoveIndex);
            setBackButton(xMoveIndex > 0 ? true : false);
            setNextButton(xMoveIndex < slideCount - 1 ? true : false);

            props.slideCallback &&
                props.slideCallback({
                    wrapWidth,
                    wrapPosition,
                    slideWidth,
                    slideChildWidth,
                    slideCount,
                    slideCurrent,
                    backButton,
                    nextButton,
                    swipeableState,
                    roadmap,
                    triggerNext
                });
        }
    };

    function pvSwipeable() {
        /*
         * Resolve Bug no Chrome Mobile
         */

        function logArrayElements(element) {
            let xHammer = Hammer(element);
            xHammer.on('swipe', () => {
                return false;
            });
        }

        if (props.fullWidth) {
            views = slideWrapRef.current.querySelectorAll(`div[id^="slideview-"]`);

            views.forEach(logArrayElements);
        }

        /* --- */
        let hammer = new Hammer(slideWrapRef.current, {
            inputClass:
                Hammer.TouchMouseInput /* Truque para permitir o pan horizontal e a rolagem */
        });

        hammer.add(
            new Hammer.Pan({
                direction: Hammer.DIRECTION_HORIZONTAL,
                threshold: 30
            })
        );

        hammer.on('panmove panend pancancel', Hammer.bindFn(onPan, this));
    }

    const mount = () => {
        // const xViews = Array.prototype.slice.call(slideWrapRef.current.children, 0);

        setElementsSizes();
        props.swipeable && pvSwipeable();
    };

    useEffect(() => {
        _isMounted.current = true;
        mount();
        window.addEventListener('resize', () => {
            setElementsSizes();
            move(slideCurrent);
        });
        return () => {
            _isMounted.current = false;
            window.removeEventListener('resize', () => {
                setElementsSizes();
                move(slideCurrent);
            });
        };
    }, []);

    useEffect(() => {
        if (props.slideCallback) {
            props.slideCallback({
                wrapWidth,
                wrapPosition,
                slideWidth,
                slideChildWidth,
                slideCount,
                slideCurrent,
                backButton,
                nextButton,
                swipeableState,
                roadmap,
                triggerNext
            });
        }
    }, [slideCurrent]);

    useEffect(() => {
        move(slideCurrent);
    }, [slideCount]);

    useEffect(() => {
        move(props.step);
    }, [props.step]);

    useEffect(() => {
        views = Array.prototype.slice.call(slideWrapRef.current.children, 0);
        let xChildCount = React.Children.count(props.children);
        setSlideCount(xChildCount);
    }, [props.children]);

    useEffect(() => {
        setTriggerNext(props.triggerNext);
    }, [props.triggerNext]);
    useEffect(() => {
        if (triggerNext) {
            move(slideCurrent + 1);
        }
    }, [triggerNext]);

    return (
        <Box
            sx={[
                {
                    display: 'grid',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%'
                },
                area === 'container' && {
                    width: '100%',
                    height: '100%'
                }
            ]}
            ref={slideRef}>
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    maxHeight: '100%',
                    transform: `translate(${wrapPosition}px)`
                }}
                ref={slideWrapRef}>
                {mapChildrens()}
            </Box>

            {nav ? (
                <Box
                    component="nav"
                    sx={[
                        {
                            position: 'absolute',
                            bottom: 0,
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            padding: '16px 4px 16px 4px'
                        },
                        nav === 'dots' && { justifyContent: 'center' },
                        nav === 'arrows' && { justifyContent: 'space-between' }
                    ]}>
                    {nav === 'dots' ? (
                        <NavDots size={props.children.length} index={slideCurrent} onClick={move} />
                    ) : nav === 'arrows' ? (
                        <Fragment>
                            {props.onSlideStart && !backButton ? (
                                <IconButton aria-label="voltar" onClick={props.onSlideStart}>
                                    <Icon color={'primary'} iconName="arrow-previous" size={24} />
                                </IconButton>
                            ) : (
                                <IconButton
                                    aria-label="voltar"
                                    onClick={prevSlide}
                                    disabled={!props.nextButton || !backButton}>
                                    <Icon color={'primary'} iconName="arrow-previous" size={24} />
                                </IconButton>
                            )}

                            {props.onSlideFinish && !nextButton ? (
                                <StyledIconButton
                                    aria-label="finalizar"
                                    onClick={props.onSlideFinish}>
                                    <Icon color={'primary'} iconName="ok" size={24} />
                                </StyledIconButton>
                            ) : (
                                <StyledIconButton
                                    aria-label="avançar"
                                    onClick={nextSlide}
                                    disabled={!props.nextButton || !nextButton}>
                                    <Icon color={'primary'} iconName="arrow-next" size={24} />
                                </StyledIconButton>
                            )}
                        </Fragment>
                    ) : (
                        false
                    )}
                </Box>
            ) : (
                false
            )}
        </Box>
    );
}

SlideView.propTypes = {
    id: PropTypes.string.isRequired,
    nav: PropTypes.oneOf(['arrows', 'dots']),
    swipeable: PropTypes.bool,

    nextButton: PropTypes.bool,
    area: PropTypes.oneOf(['content', 'container']),
    step: PropTypes.number,
    children: PropTypes.node,
    onSlideStart: PropTypes.func,
    onSlideFinish: PropTypes.func,
    triggerNext: PropTypes.bool,
    slideCallback: PropTypes.func,
    fullWidth: PropTypes.bool
};

SlideView.displayName = 'SlideView';

export default SlideView;
