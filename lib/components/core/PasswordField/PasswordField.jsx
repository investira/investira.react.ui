import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Icon } from '../';

const PasswordField = memo(props => {
    const [showPass, setShowPass] = useState(false);

    function handleClickShowPassword() {
        setShowPass(!showPass);
    }

    function handleMouseDownPassword(pEvent) {
        pEvent.preventDefault();
    }

    return (
        <TextField
            {...props}
            type={!showPass ? 'password' : 'text'}
            inputProps={{
                ...props.inputProps,
                autoComplete: 'off'
            }}
            InputProps={{
                ...props.InputProps,
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}>
                            {!showPass ? (
                                <Icon key="eye_off" iconName="eye_off" size={21} color="primary" />
                            ) : (
                                <Icon key="eye" iconName="eye" size={21} color="primary" />
                            )}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
});

PasswordField.propTypes = {
    InputProps: PropTypes.object,
    inputProps: PropTypes.object
};

PasswordField.displayName = 'PasswordField';

export default PasswordField;
