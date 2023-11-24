import PropTypes from 'prop-types';
import { Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CenterInView } from '../';

const StyledPath = styled('path')(({ theme }) => ({
    fill: theme.palette.primary.main
}));

function ErrorBody(props) {
    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                position: 'relative',
                padding: '16px',
                textAlign: 'center'
            }}>
            <CenterInView>
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        margin: '0 auto'
                    }}>
                    {props.d !== '' && (
                        <Box
                            sx={{
                                margin: '0 auto',
                                width: 'calc(100% / 4)'
                            }}>
                            <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 24 24">
                                <StyledPath d={props.d} />
                            </svg>
                        </Box>
                    )}

                    <Typography variant={'body1'} color={'textPrimary'} gutterBottom>
                        {props.message}
                    </Typography>

                    {/* <IconButton onClick={props.handleClick}>
                            <Icon iconName={'refresh'} color={'primary'} />
                        </IconButton> */}
                    <Button onClick={props.handleClick} variant={'outlined'} color={'primary'}>
                        Tentar Novamente
                    </Button>
                </Box>
            </CenterInView>
        </Box>
    );
}

ErrorBody.propTypes = {
    handleClick: PropTypes.func,
    message: PropTypes.string,
    d: PropTypes.string
};

ErrorBody.displayName = 'ErrorBody';

export default ErrorBody;
