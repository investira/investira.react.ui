import { memo } from 'react';
import PropTypes from 'prop-types';
import { validators } from 'investira.sdk';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { styled } from '@mui/material/styles';

const Container = styled(Swiper)(({ theme }) => ({
    display: 'flex',
    //flexDirection: "column-reverse",
    //flexDirection: "column",
    // "@global": {
    '.swiper-wrapper > div:first-of-type': {
        marginLeft: '16px'
    },
    '.swiper-wrapper > div:last-of-type': {
        marginRight: '16px'
    },
    '.swiper-pagination': {
        position: 'relative',
        bottom: 0,
        padding: '4px 16px',
        height: '28px',

        '&-bullet-active': {
            background: theme.palette.primary.main
        }
    }
    // },
}));

const SwipeList = memo(props => {
    // HANDLERS
    const handleClick = (pData, pIndex, pEvent) => () => {
        if (props.onClick) {
            props.onClick(pData, pIndex, pEvent);
        }
    };

    // RENDER
    const xId = `swipe-list-${props.id}`;
    const Component = props.child;

    const containerProps = {
        pagination: props.pagination,
        modules: [Pagination],
        centeredSlides: props.centeredSlides,
        centeredSlidesBounds: props.centeredSlidesBounds,
        slidesPerView: props.slidesPerView,
        slidesPerGroupAuto: props.slidesPerGroupAuto,
        spaceBetween: props.spaceBetween,
        shortSwipes: props.shortSwipes
    };

    return (
        <Container {...containerProps}>
            {!validators.isEmpty(props.data) &&
                Object.values(props.data).map((xItem, xIndex) => {
                    const xElemKey = `${xId}-item-${xIndex}`;
                    return (
                        <SwiperSlide key={xElemKey} style={{ width: props.slideWidth }}>
                            {({ isActive }) => (
                                <Component
                                    {...props.childProps}
                                    data={xItem}
                                    onClick={e => handleClick(xItem, xIndex, e)}
                                    isActive={isActive}
                                />
                            )}
                        </SwiperSlide>
                    );
                })}
        </Container>
    );
});

SwipeList.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    child: PropTypes.elementType.isRequired,
    childProps: PropTypes.object,
    keyValue: PropTypes.string,
    pagination: PropTypes.bool,
    slideWidth: PropTypes.number,
    spaceBetween: PropTypes.number,
    slidesPerGroupAuto: PropTypes.bool,
    centeredSlides: PropTypes.bool,
    centeredSlidesBounds: PropTypes.bool,
    slidesPerView: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    shortSwipes: PropTypes.bool,
    onClick: PropTypes.func
};

SwipeList.defaultProps = {
    id: 'default',
    data: [],
    keyValue: 'id',
    pagination: false,
    slideWidth: 343,
    spaceBetween: 8,
    centeredSlides: true,
    centeredSlidesBounds: true,
    slidesPerView: 'auto',
    slidesPerGroupAuto: false,
    shortSwipes: true
};

SwipeList.displayName = 'SwipeList';

export default SwipeList;
