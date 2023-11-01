import { memo } from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';

const ChipsItem = memo(props => {
    const { id, data, onClick, onDelete, size } = props;
    const { value, label, avatar, icon, disabled } = data;
    const xVariant = props.focused === props.id ? 'default' : 'outlined';

    return (
        <Chip
            key={id}
            onClick={onClick}
            onDelete={onDelete}
            value={value}
            label={label}
            avatar={avatar}
            icon={icon}
            color={'primary'}
            clickable={false}
            variant={xVariant}
            disabled={disabled || false}
            size={size}
            sx={props.sx}
        />
    );
});

ChipsItem.propTypes = {
    focused: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    data: PropTypes.object,
    onClick: PropTypes.func,
    onDelete: PropTypes.func,
    size: PropTypes.number,
    sx: PropTypes.object
};

ChipsItem.displayName = 'ChipsItem';

export default ChipsItem;
