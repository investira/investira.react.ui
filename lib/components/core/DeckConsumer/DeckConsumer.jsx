import { memo } from 'react';
import PropTypes from 'prop-types';
import DeckContext from '../DeckContext';

const DeckConsumer = memo(props => {
    return <DeckContext.Consumer>{props.children}</DeckContext.Consumer>;
});

DeckConsumer.propTypes = {
    children: PropTypes.node
};

DeckConsumer.displayName = 'DeckConsumer';

export default DeckConsumer;
