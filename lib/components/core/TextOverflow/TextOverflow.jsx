import { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const Fluid = styled('div')(() => {
    return {
        flex: '1 1 100%',
        minWidth: 0
    };
});

const TextOverflow = memo(props => {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%'
            }}>
            <Fluid>
                <Typography
                    {...props}
                    component="p"
                    sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        lineClamp: '1',
                        boxOrient: 'vertical',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical',
                        ...props.sx
                    }}>
                    {props.children}
                </Typography>
            </Fluid>
        </Box>
    );
});

TextOverflow.propTypes = {
    sx: PropTypes.object,
    children: PropTypes.node
};

TextOverflow.displayName = 'TextOverflow';

export default TextOverflow;
