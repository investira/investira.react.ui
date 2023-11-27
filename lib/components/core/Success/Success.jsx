import { Box } from '@mui/material';
import PropTypes from 'prop-types';

function Success(props) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center'
            }}>
            <Box
                sx={{
                    fill: props.fill,
                    stroke: props.arcStroke || props.stroke,
                    strokeWidth: 40,
                    strokeMiterlimit: 10
                }}
                style={{
                    width: props.width ? `${props.width}px` : null,
                    height: props.height ? `${props.height}px` : null
                }}>
                <svg
                    id="Layer_1"
                    x="0px"
                    y="0px"
                    width={props.width ? `${props.width}px` : null}
                    height={props.height ? `${props.height}px` : null}
                    viewBox="0 0 512 512">
                    <Box
                        component="path"
                        sx={[
                            props.startAnimation && {
                                strokeDasharray: '1473 1475',
                                strokeDashoffset: 1474,
                                animation:
                                    'draw 690ms ease-in 0ms forwards, fade 690ms ease-in 100ms forwards',
                                '@keyframes draw': {
                                    '100%': {
                                        strokeDashoffset: 0
                                    }
                                },
                                '@keyframes fade': {
                                    '0%': {
                                        strokeOpacity: 0
                                    },

                                    '90.45346062052506%': {
                                        strokeOpacity: 0.9
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
                                stroke: props.iconStroke || props.stroke,
                                strokeWidth: 40,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10
                            },
                            props.startAnimation && {
                                strokeDasharray: '298 300',
                                strokeDashoffset: 299,
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

                                    '90.45346062052506%': {
                                        strokeOpacity: 0.9
                                    },

                                    '100%': {
                                        strokeOpacity: 1
                                    }
                                }
                            }
                        ]}
                        d="M154.7,256.7L224.6,328.7L357.3,183.3"></Box>
                </svg>
            </Box>
        </Box>
    );
}

Success.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    startAnimation: PropTypes.bool,
    stroke: PropTypes.string,
    arcStroke: PropTypes.string,
    iconStroke: PropTypes.string,
    fill: PropTypes.string
};

Success.defaultProps = {
    height: 200,
    width: 200,
    startAnimation: true,
    stroke: '#00dfa8',
    fill: 'none'
};

Success.display = 'Success';

export default Success;
