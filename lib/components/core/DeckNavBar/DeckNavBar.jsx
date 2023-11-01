import { memo } from 'react';
import PropTypes from 'prop-types';
import { validators } from 'investira.sdk';

import { NavBar, IconButton, Icon } from '@mui/material';
import DeckContext from '../DeckContext';

const DeckNavBar = memo(props => {
    return (
        <DeckContext.Consumer>
            {({ prevView, handlePrevView, activeView }) => {
                const xBehaviors = {
                    default: validators.isEmpty(prevView),
                    inverted: !validators.isEmpty(prevView),
                    visible: true,
                    custom: true
                };

                const xActionBehavior = xBehaviors[props.actionBehavior];

                const xAction =
                    props.actionBehavior === 'custom' ? props.right[activeView] : props.right;

                return (
                    <NavBar
                        left={
                            !validators.isEmpty(prevView) ? (
                                <IconButton
                                    color={'primary'}
                                    onClick={() => handlePrevView(props.onBack)}>
                                    <Icon size={21} iconName={'arrow-previous'} />
                                </IconButton>
                            ) : (
                                props.left
                            )
                        }
                        center={props.center}
                        right={xActionBehavior && xAction}
                    />
                );
            }}
        </DeckContext.Consumer>
    );
});

DeckNavBar.propTypes = {
    left: PropTypes.object,
    right: PropTypes.object,
    center: PropTypes.object,
    onBack: PropTypes.func,
    actionBehavior: PropTypes.oneOf(['default', 'inverted', 'visible', 'custom'])
};

DeckNavBar.defaultProps = {
    actionBehavior: 'default'
};

DeckNavBar.displayName = 'DeckNavBar';

export default DeckNavBar;
