import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { validators } from 'investira.sdk';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CenterInView } from '../';

const StyledTransitionGroup = styled(TransitionGroup)({
    position: 'relative'
});

const StyledCSSTransition = styled(CSSTransition)({
    position: 'relative'
});
function ContentList(props) {
    const hasListData = pList => {
        return validators.isEmpty(pList);
    };

    const isDataValid = pList => {
        if (hasListData(pList) && validators.isArray(pList)) {
            return !validators.isNull(pList[0].id);
        } else {
            return false;
        }
    };

    if (validators.isNull(props.list)) {
        return (
            <CenterInView>
                <Typography variant={'body2'} align={'center'} color={'textSecondary'}>
                    Propriedade <b>list</b> está indefinida. É necessário que um array seja
                    atribuido.
                </Typography>
            </CenterInView>
        );
    }

    if (validators.isNull(props.item)) {
        return (
            <CenterInView>
                <Typography variant={'body2'} align={'center'} color={'textSecondary'}>
                    Propriedade <b>item</b> está indefinida. É necessário que um componente seja
                    atribuido.
                </Typography>
            </CenterInView>
        );
    }

    const Component = props.item;
    const { keyName, ...othersItemProps } = props.itemProps;

    return (
        <Box
            sx={[
                { position: 'relative', minHeight: '100%' },
                ...(hasListData(props.list) && { height: '100%' })
            ]}>
            {hasListData(props.list) ? (
                <CenterInView>
                    <Typography variant={'body2'} align={'center'} color={'textSecondary'}>
                        {props.emptyMessage || 'Lista está vazia'}
                    </Typography>
                </CenterInView>
            ) : isDataValid(props.list) ? (
                <CenterInView>
                    <Typography variant={'body2'} align={'center'} color={'textSecondary'}>
                        É necessário haver um id único
                    </Typography>
                </CenterInView>
            ) : (
                <StyledTransitionGroup appear={true} enter={true} exit={true}>
                    {Object.values(props.list).map((xItem, xIndex) => {
                        return (
                            <StyledCSSTransition
                                key={xItem[keyName] || xIndex}
                                in={true}
                                timeout={500}
                                unmountOnExit
                                appear
                                onEnter={props.onEnter}
                                onExited={props.onExited}>
                                <Component
                                    key={`Item-${xItem[keyName] || xIndex}`}
                                    data={xItem}
                                    {...othersItemProps}
                                />
                            </StyledCSSTransition>
                        );
                    })}
                </StyledTransitionGroup>
            )}
        </Box>
    );
}

ContentList.propTypes = {
    list: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    emptyMessage: PropTypes.string,
    item: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node, PropTypes.func]).isRequired,
    className: PropTypes.object,
    itemProps: PropTypes.object,
    onEnter: PropTypes.func,
    onExited: PropTypes.func
};

ContentList.defaultProps = {
    itemProps: {}
};

export default ContentList;
