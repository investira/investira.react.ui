import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const NavBar = memo(props => {
    return (
        <>
            <Box
                sx={[
                    {
                        position: 'relative',
                        width: '100%',
                        display: 'flex',
                        zIndex: '1100',
                        boxShadow: 'none',
                        boxSizing: 'border-box',
                        flexShrink: 0,
                        flexDirection: 'column',
                        backgroundColor: 'transparent',
                        alignContent: 'stretch',
                        padding: '0 4px'
                    },
                    props.variant === 'dense' && {
                        height: '48px'
                    },
                    props.variant === 'regular' && {
                        height: '56px'
                    },
                    props.variant === 'large' && {
                        height: '64px'
                    },
                    props.gutters && {
                        padding: '0 16px'
                    }
                ]}>
                <Box
                    sx={[
                        {
                            display: 'flex',
                            position: 'relative',
                            alignItems: 'center',
                            alignContent: 'center',
                            height: '100%',
                            justifyContent: 'space-between'
                        },
                        !props.left &&
                            !props.right && {
                                justifyContent: 'center'
                            }
                    ]}>
                    {props.left && (
                        <Box
                            sx={[
                                {
                                    display: 'flex',
                                    height: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                },
                                props.variant === 'dense' && {
                                    minWidth: '48px',
                                    width: '48px',
                                    flexGrow: 0,
                                    flexShrink: 0
                                },
                                props.variant === 'regular' && {
                                    minWidth: '48px',
                                    flexGrow: 0,
                                    flexShrink: 0
                                },
                                props.variant === 'large' && {
                                    minWidth: '48px',
                                    width: '64px',
                                    flexGrow: 0,
                                    flexShrink: 0
                                }
                            ]}>
                            {props.left}
                        </Box>
                    )}

                    {props.center && (
                        <Box
                            sx={[
                                { display: 'flex', height: '100%', alignItems: 'center' },
                                props.left &&
                                    props.center &&
                                    !props.right && { paddingRight: '12px', flexGrow: 1 },
                                props.right &&
                                    props.center &&
                                    !props.left && { paddingLeft: '12px', flexGrow: 1 },
                                props.variant === 'dense' && { flexGrow: 1 },
                                props.variant === 'regular' && {
                                    flexGrow: 1
                                },
                                props.variant === 'large' && { flexGrow: 1 }
                            ]}>
                            {props.center}
                        </Box>
                    )}

                    {props.right && (
                        <Box
                            sx={[
                                {
                                    display: 'flex',
                                    height: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end'
                                },
                                props.variant === 'dense' && {
                                    minWidth: '48px',
                                    width: '48px',
                                    flexGrow: 0,
                                    flexShrink: 0
                                },
                                props.variant === 'regular' && {
                                    minWidth: '48px',
                                    flexGrow: 0,
                                    flexShrink: 0
                                },
                                props.variant === 'large' && {
                                    minWidth: '48px',
                                    width: '64px',
                                    flexGrow: 0,
                                    flexShrink: 0
                                }
                            ]}>
                            {props.right}
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
});

NavBar.propTypes = {
    type: PropTypes.string,
    iconName: PropTypes.string,
    title: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['dense', 'regular', 'large']),
    gutters: PropTypes.bool,
    left: PropTypes.node,
    right: PropTypes.node,
    center: PropTypes.node
};

NavBar.defaultProps = {
    variant: 'dense'
};

NavBar.displayName = 'NavBar';

export default NavBar;
