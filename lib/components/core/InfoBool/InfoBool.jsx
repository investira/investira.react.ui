import PropTypes from 'prop-types';
import { Typography, Icon, Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const Root = styled(Box)(({ gutter }) => ({
    ...(gutter && {
        margin: '0px 16px'
    })
}));

const DivIcon = styled(Stack)(({ value }) => ({
    ...(!value && {
        height: '28px',
        alignItems: 'center',
        flexDirection: 'row'
    })
}));

function InfoBool(props) {
    const { variant = 'caption', value, label, labelColor = 'textSecondary', gutter } = props;

    return (
        <Root gutter={gutter}>
            <Typography variant={variant} color={labelColor} component="p">
                {label}
            </Typography>
            <DivIcon value={value}>
                <Icon
                    color={value ? 'greenLight' : 'error'}
                    iconName={value ? 'ok' : 'cancel'}
                    size={value ? 24 : 16}
                />
            </DivIcon>
        </Root>
    );
}

InfoBool.propTypes = {
    onClick: PropTypes.func,
    gutter: PropTypes.bool,
    label: PropTypes.string,
    className: PropTypes.string,
    variant: PropTypes.string,
    labelColor: PropTypes.string,
    value: PropTypes.bool
};

InfoBool.displayName = 'InfoBool';

export default InfoBool;
