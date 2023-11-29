import { memo, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { Icon } from '../';
import PropTypes from 'prop-types';

const SwithIconButton = memo(props => {
    const { size = 16, iconName = 'on_off' } = props;

    const [active, setActive] = useState(false);
    const [variant, setVariant] = useState('outlined');
    const [iconColor, setIconColor] = useState('primary');

    const handleClick = pEvent => {
        setActive(!active);
        props.onClick && props.onClick(!active, pEvent);
    };

    useEffect(() => {
        const xVariants = ['outlined', 'contained'];
        const xIconColors = ['primary', 'default'];

        const xVariant = xVariants[Number(active)];
        const xIconColor = xIconColors[Number(active)];

        setVariant(xVariant);
        setIconColor(xIconColor);
    }, [active]);

    return (
        <Button variant={variant} onClick={handleClick} color={'primary'} size={'small'}>
            <Icon iconName={iconName} size={size} color={iconColor} />
        </Button>
    );
});

SwithIconButton.propTypes = {
    size: PropTypes.number,
    iconName: PropTypes.string,
    onClick: PropTypes.func
};

SwithIconButton.displayName = 'SwithIconButton';

export default SwithIconButton;
