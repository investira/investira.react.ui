import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const NavBar = memo(props => {
    const { variant = 'dense', gutters, left, right, center } = props;

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
                    variant === 'dense' && {
                        height: '48px'
                    },
                    variant === 'regular' && {
                        height: '56px'
                    },
                    variant === 'large' && {
                        height: '64px'
                    },
                    gutters && {
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
                        !left &&
                            !right && {
                                justifyContent: 'center'
                            }
                    ]}>
                    {left && (
                        <Box
                            sx={[
                                {
                                    display: 'flex',
                                    height: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                },
                                variant === 'dense' && {
                                    minWidth: '48px',
                                    width: '48px',
                                    flexGrow: 0,
                                    flexShrink: 0
                                },
                                variant === 'regular' && {
                                    minWidth: '48px',
                                    flexGrow: 0,
                                    flexShrink: 0
                                },
                                variant === 'large' && {
                                    minWidth: '48px',
                                    width: '64px',
                                    flexGrow: 0,
                                    flexShrink: 0
                                }
                            ]}>
                            {left}
                        </Box>
                    )}

                    {center && (
                        <Box
                            sx={[
                                { display: 'flex', height: '100%', alignItems: 'center' },
                                left && center && !right && { paddingRight: '12px', flexGrow: 1 },
                                right && center && !left && { paddingLeft: '12px', flexGrow: 1 },
                                variant === 'dense' && { flexGrow: 1 },
                                variant === 'regular' && {
                                    flexGrow: 1
                                },
                                variant === 'large' && { flexGrow: 1 }
                            ]}>
                            {center}
                        </Box>
                    )}

                    {right && (
                        <Box
                            sx={[
                                {
                                    display: 'flex',
                                    height: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end'
                                },
                                variant === 'dense' && {
                                    minWidth: '48px',
                                    width: '48px',
                                    flexGrow: 0,
                                    flexShrink: 0
                                },
                                variant === 'regular' && {
                                    minWidth: '48px',
                                    flexGrow: 0,
                                    flexShrink: 0
                                },
                                variant === 'large' && {
                                    minWidth: '48px',
                                    width: '64px',
                                    flexGrow: 0,
                                    flexShrink: 0
                                }
                            ]}>
                            {right}
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

NavBar.displayName = 'NavBar';

export default NavBar;
