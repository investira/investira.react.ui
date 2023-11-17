import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const Root = styled(Box)(() => ({
    backgroundColor: '#949ed8',
    backgroundImage: 'linear-gradient(90deg, #949ed8, #7a81ab, #949ed8)',
    backgroundSize: '50% 100%',
    backgroundRepeat: 'no-repeat',
    borderRadius: '4px',
    display: 'inline-block',
    width: '100%',
    height: '0.5rem',
    opacity: '0.67',
    animation: 'highlight 1s ease-in-out infinite',
    '@keyframes highlight': {
        '0%': {
            backgroundPosition: '-100% 0'
        },

        '100%': {
            backgroundPosition: 'calc(50% + 100%) 0'
        }
    }
}));
function Placeholder(props) {
    const { width, height, words, lines, radius } = props;
    const elems = [];

    let placeholderStyle = {
        display: 'inline-block',
        ...(width && { width }),
        ...(height && { height }),
        ...(radius && { borderRadius: radius })
    };

    if (words) {
        for (let i = 0; i < words; i++) {
            let xWidth = Math.floor(Math.random() * (80 - 20)) + 20;
            elems.push(
                <Root component="span" key={i} style={{ width: xWidth, marginRight: '4px' }}>
                    &zwnj;
                </Root>
            );
        }
    } else {
        for (let i = 0; i < lines; i++) {
            elems.push(
                <Root key={i} style={placeholderStyle}>
                    &zwnj;
                </Root>
            );
        }
    }

    return <> {elems.map(elem => elem)} </>;
}

Placeholder.propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lines: PropTypes.number,
    words: PropTypes.number,
    radius: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Placeholder.defaultProps = {
    width: '100%',
    height: '0.5rem',
    circle: false,
    lines: 1,
    variant: 'p',
    radius: '4px'
};

export default Placeholder;
