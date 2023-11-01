import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { validators } from 'investira.sdk';
import { styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';

const View = styled(Stack)(({ variant }) => ({
    width: '100%',
    height: '100%',
    position: 'absolute',
    flexGrow: '1',
    flexDirection: 'initial',
    top: '0',
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    '& > div': {
        width: '100%'
    },
    ...(variant === 'offset' && {
        transform: 'translate(100%)',
        left: '100%'
    }),
    ...(variant === 'prev' && {
        transform: 'translate(-8%)',
        opacity: 0,
        pointerEvents: 'none'
    }),
    ...(variant === 'active' && { opacity: 1 })
}));

const Deck = memo(props => {
    const isActive = useCallback((pActiveView, pId) => {
        if (pActiveView === pId) {
            return true;
        }
        return false;
    }, []);

    const isPrev = useCallback((pPrevView, id) => {
        if (pPrevView.includes(id)) {
            return true;
        }
        return false;
    }, []);

    const viewVariant = useCallback(
        (pId, pActiveView, pPrevView) => {
            let xVariant = '';
            if (isPrev(pPrevView, pId)) {
                xVariant = 'prev';
            }

            if (isActive(pActiveView, pId)) {
                xVariant = 'active';
            }

            if (!isActive(pActiveView, pId) && !isPrev(pPrevView, pId)) {
                xVariant = 'offset';
            }

            return xVariant;
        },
        [isActive, isPrev]
    );

    const spreadChildren = useCallback(pChildren => {
        const xNewChildren = [];

        for (const child of pChildren) {
            if (validators.isArray(child)) {
                xNewChildren.push(...child);
            } else {
                xNewChildren.push(child);
            }
        }

        return xNewChildren;
    }, []);

    const styleView = (pActiveView, pChildId, pIndex) => {
        const isActive = pActiveView === pChildId;
        return isActive ? { zIndex: 1101 + pIndex } : { zIndex: 1100 };
    };

    const mapChildrens = useCallback(
        pChildren => {
            const xChildrens = spreadChildren(pChildren);
            const xElements = xChildrens.map((xChild, xIndex) => {
                if (xChild !== false) {
                    return (
                        <View
                            id={`${xChild.props.id}`}
                            key={xIndex}
                            style={styleView(props.activeView, xChild.props.id, xIndex)}
                            variant={viewVariant(
                                xChild.props.id,
                                props.activeView,
                                props.prevView
                            )}>
                            {xChild}
                        </View>
                    );
                }
                return false;
            });

            return xElements;
        },
        [props.activeView, viewVariant]
    );

    const { children, id } = props;

    return (
        <Box id={`deck-${id}`} display="block" height="100%" width="inherit" position="relative">
            <Box id={`deck-${id}__wrap`} height="100%" position="relative">
                {children.constructor === Array ? mapChildrens(children) : props.children}
            </Box>
        </Box>
    );
});

Deck.propTypes = {
    id: PropTypes.string.isRequired,
    prevView: PropTypes.array,
    activeView: PropTypes.string,
    children: PropTypes.node
};

Deck.defaultProps = {
    prevView: []
};

Deck.displayName = 'Deck';

export default Deck;
