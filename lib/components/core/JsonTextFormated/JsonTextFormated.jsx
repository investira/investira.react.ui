import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const JsonTextFormated = props => {
    const { text, ...otherProps } = props;

    const createMarkup = pTextFragment => {
        return { __html: pTextFragment };
    };

    return text.split('\n').map((fragment, key) => (
        <Typography key={key} {...otherProps}>
            <span dangerouslySetInnerHTML={createMarkup(fragment)} />
        </Typography>
    ));
};

JsonTextFormated.propTypes = {
    text: PropTypes.string.isRequired
};

JsonTextFormated.defaultProps = {
    text: ''
};

export default JsonTextFormated;
