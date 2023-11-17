import { memo } from 'react';
import PropTypes from 'prop-types';
import { displays } from '../../../lib';
import { Avatar } from '@mui/material';

const Persona = memo(props => {
    const { alt, sx, ...restProps } = props;

    function stringAvatar(pName = '') {
        if (!pName) {
            return {};
        }

        return {
            sx: {
                ...sx,
                bgcolor: displays.stringToColor(pName)
            },
            children: displays.initialsLetters(pName)
        };
    }

    return <Avatar alt={alt} {...restProps} {...stringAvatar(alt)} />;
});

Persona.propTypes = {
    alt: PropTypes.string,
    sx: PropTypes.object
};

Persona.displayName = 'Persona';

export default Persona;
