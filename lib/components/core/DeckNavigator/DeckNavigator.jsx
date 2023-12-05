import { memo } from 'react';
import PropTypes from 'prop-types';
import { Deck, DeckContext } from '../';

const DeckNavigator = memo(props => {
    return (
        <DeckContext.Consumer>
            {({ prevView, activeView }) => {
                return (
                    <Deck id="deck-navigator" prevView={prevView} activeView={activeView}>
                        {props.children}
                    </Deck>
                );
            }}
        </DeckContext.Consumer>
    );
});

DeckNavigator.propTypes = {
    children: PropTypes.node
};

DeckNavigator.displayName = 'DeckNavigator';

export default DeckNavigator;
