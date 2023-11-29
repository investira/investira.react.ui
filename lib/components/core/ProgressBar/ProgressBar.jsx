import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const Span = styled(Box)(({ theme, animate, color, value }) => {
    return {
        position: 'absolute',
        display: 'block',
        height: '100%',
        borderRadius: '3px',
        transition: 'width 500ms ease-in-out',
        backgroundColor: theme.palette[color].main,
        width: `${String(value)}%`,
        ...(animate === 'indeterminate' && {
            '@keyframes increase': {
                from: {
                    left: '-5%',
                    width: '5%'
                },
                to: {
                    left: '130%',
                    width: '100%'
                }
            },
            '@keyframes decrease': {
                from: {
                    left: '-80%',
                    width: '80%'
                },
                to: {
                    left: '110%',
                    width: '10%'
                }
            },
            '&:first-of-type': {
                animation: 'increase 2s infinite'
            },

            '&:last-of-type': {
                animation: 'decrease 2s 0.5s infinite'
            }
        })
    };
});

function ProgressBar(props) {
    const { color = 'primary', value = 100, animate = 'progress' } = props;
    return (
        <Box
            sx={[
                theme => ({
                    position: 'relative',
                    width: '100%',
                    backgroundColor: theme.palette.background.light,
                    borderRadius: '3px',
                    minHeight: '6px',
                    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.2)',
                    overflowX: 'hidden'
                })
            ]}>
            <Span animate={animate} color={color} value={value} component="span"></Span>
            <Span color={color} animate={animate}></Span>
        </Box>
    );
}

ProgressBar.propTypes = {
    color: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    animate: PropTypes.oneOf(['indeterminate', 'progress'])
};

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
