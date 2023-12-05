import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import DeckContext from '../DeckContext';

const DeckView = memo(props => {
    const deckContext = useContext(DeckContext);
    /* Implementar aqui, uma condição para verificar se a View está ativa. Analisar os possíveis efeitos colaterais. */

    return React.cloneElement(props.children, {
        id: props.id,
        ...deckContext
    });
});

DeckView.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

DeckView.displayName = 'DeckView';

export default DeckView;
