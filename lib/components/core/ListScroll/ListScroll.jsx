import { memo } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroller from '../InfiniteScroller';
import ContentList from '../ContentList';

const ListScroll = memo(props => {
    const { onNextPage, nextPage, list, item, emptyMessage, itemProps } = props;

    return (
        <InfiniteScroller onNextPage={onNextPage} nextPage={nextPage}>
            <ContentList
                list={list || []}
                item={item}
                emptyMessage={emptyMessage}
                itemProps={itemProps || {}}
            />
        </InfiniteScroller>
    );
});

ListScroll.propTypes = {
    list: PropTypes.array.isRequired,
    emptyMessage: PropTypes.string,
    item: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node, PropTypes.func]).isRequired,
    className: PropTypes.object,
    itemProps: PropTypes.object,
    onNextPage: PropTypes.func,
    nextPage: PropTypes.bool
    //onExited: PropTypes.func
};

ListScroll.displayName = 'ListScroll';

export default ListScroll;
