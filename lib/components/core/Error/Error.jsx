import { Box } from '@mui/material';
import PropTypes from 'prop-types';
function Error(props) {
    const { height, width, startAnimation = true } = props;
    return (
        <Box
            sx={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center'
            }}>
            <Box
                sx={{
                    fill: 'none',
                    stroke: '#ed4420',
                    strokeWidth: 40,
                    strokeMiterlimit: 10
                }}
                style={{
                    width: width ? `${width}px` : null,
                    height: height ? `${height}px` : null
                }}>
                <svg
                    id="Error_1"
                    x="0px"
                    y="0px"
                    width={width ? `${width}px` : null}
                    height={height ? `${height}px` : null}
                    viewBox="0 0 512 512">
                    <Box
                        component="path"
                        sx={[
                            {
                                fill: 'none',
                                stroke: '#ed4420',
                                strokeWidth: 40,
                                strokeMiterlimit: 10
                            },
                            startAnimation && {
                                strokeDasharray: '1473 1475',
                                strokeDashoffset: '1474',
                                animation:
                                    'draw 690ms ease-in 100ms forwards, fade 690ms ease-in 100ms forwards',
                                '@keyframes draw': {
                                    '100%': {
                                        strokeDashoffset: 0
                                    }
                                },
                                '@keyframes fade': {
                                    '0%': {
                                        strokeOpacity: 0
                                    },

                                    '93.54838709677419%': {
                                        strokeOpacity: 0.93
                                    },

                                    '100%': {
                                        strokeOpacity: 1
                                    }
                                }
                            }
                        ]}
                        d="M22.49999999999997,255.2A234.4,234.4 0,1,1 491.29999999999995,255.2A234.4,234.4 0,1,1 22.49999999999997,255.2"></Box>
                    <Box
                        component="path"
                        sx={[
                            {
                                fill: 'none',
                                stroke: '#ed4420',
                                strokeWidth: 40,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10
                            },
                            startAnimation && {
                                strokeDasharray: '201 203',
                                strokeDashoffset: '202',
                                animation:
                                    'draw 490ms ease-in 300ms forwards, fadeLine 490ms ease-in 300ms forwards',
                                '@keyframes draw': {
                                    '100%': {
                                        strokeDashoffset: 0
                                    }
                                },
                                '@keyframes fadeLine': {
                                    '0%': {
                                        strokeOpacity: 0
                                    },

                                    '43.54838709677419%': {
                                        strokeOpacity: 0.93
                                    },

                                    '50%': {
                                        strokeOpacity: 1
                                    }
                                }
                            }
                        ]}
                        d="M185.5,183.3L327.2,325.1"></Box>
                    <Box
                        component="path"
                        sx={[
                            {
                                fill: 'none',
                                stroke: '#ed4420',
                                strokeWidth: 40,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10
                            },
                            startAnimation && {
                                strokeDasharray: '201 203',
                                strokeDashoffset: '202',
                                animation:
                                    'draw 490ms ease-in 300ms forwards, fadeLine 490ms ease-in 300ms forwards',
                                '@keyframes draw': {
                                    '100%': {
                                        strokeDashoffset: 0
                                    }
                                },
                                '@keyframes fadeLine': {
                                    '0%': {
                                        strokeOpacity: 0
                                    },

                                    '43.54838709677419%': {
                                        strokeOpacity: 0.93
                                    },

                                    '50%': {
                                        strokeOpacity: 1
                                    }
                                }
                            }
                        ]}
                        d="M185.5,325.1L327.2,183.3"></Box>
                </svg>
            </Box>
        </Box>
    );
}

Error.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    startAnimation: PropTypes.bool
};

export default Error;
