import { memo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { IconButton } from '@mui/material';
import { Icon } from '../';

const rotateAnimation = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const RotateIconButton = styled(IconButton)`
    &.rotate {
        animation: ${rotateAnimation} 1s linear infinite;
    }
`;

const SyncIconButton = memo(props => {
    const [isSyncing, setIsSyncing] = useState(false);
    const { iconButtonProps, iconProps, onClick } = props;

    const timeout = useRef(null);

    const handleSync = async e => {
        timeout.current = null;
        setIsSyncing(true);
        onClick && (await onClick(e));
        timeout.current = setTimeout(() => {
            setIsSyncing(false);
        }, 300);
    };

    const buttonClass = isSyncing ? 'rotate' : '';

    return (
        <RotateIconButton {...iconButtonProps} onClick={handleSync} className={buttonClass}>
            <Icon {...iconProps} iconName={'synchronize'} />
        </RotateIconButton>
    );
});

SyncIconButton.propTypes = {
    iconButtonProps: PropTypes.object,
    iconProps: PropTypes.object,
    onClick: PropTypes.func
};

SyncIconButton.defaultProps = {
    iconButtonProps: {
        color: 'primary'
    },
    iconProps: {
        size: 16
    }
};

SyncIconButton.displayName = 'SyncIconButton';

export default SyncIconButton;
