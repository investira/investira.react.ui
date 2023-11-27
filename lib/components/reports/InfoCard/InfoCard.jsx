import PropTypes from 'prop-types';
import { validators } from 'investira.sdk';
import { Stack, Card, CardContent, Typography } from '@mui/material';

const InfoCard = props => {
    if (validators.isEmpty(props.value) && validators.isEmpty()) {
        return null;
    }

    return (
        <Stack sx={{ ...props.sx }} flexGrow={1}>
            <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                    <Typography variant="caption" gutterBottom>
                        {props.label}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {`${props.value} ${props.sufix}`}
                    </Typography>
                </CardContent>
            </Card>
        </Stack>
    );
};

InfoCard.displayName = 'InfoCard';

InfoCard.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sufix: PropTypes.string,
    sx: PropTypes.object
};

InfoCard.defaultProps = {
    sufix: ''
};

export default InfoCard;
