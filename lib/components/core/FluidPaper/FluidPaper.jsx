import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const Root = styled(Stack)(({ selected, theme }) => ({
    color: 'rgba(255, 255, 255, 0.87)',
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    backgroundColor: theme.palette.secondary.main,
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    margin: '0px 16px',
    borderRadius: '10px',
    boxShadow:
        '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    ...(selected && {
        boxShadow: 'none',
        borderRadius: 0,
        width: '100vw',
        backgroundColor: theme.palette.secondary.dark,
        margin: 0,
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    })
}));
function FluidPaper(props) {
    return (
        <Root selected={Boolean(props.selected)} onClick={props.onClick}>
            {props.children}
        </Root>
    );
}

FluidPaper.propTypes = {
    children: PropTypes.node,
    square: PropTypes.bool,
    variant: PropTypes.string,
    elevation: PropTypes.string,
    selected: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    onClick: PropTypes.func
};

FluidPaper.displayName = 'FluidPaper';

export default FluidPaper;
