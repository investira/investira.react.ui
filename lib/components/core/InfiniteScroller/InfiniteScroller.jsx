import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { validators } from "investira.sdk";

import { Scroller, Box } from "../";
import { Loading, CenterInView } from "../template";

function InfiniteScroller(props) {
  const scroller = useRef();
  const endListRef = useRef();
  const startListRef = useRef();

  let target = null;
  let observer = null;

  let tempScrollHeight = 0;

  //TODO: Alterar pela do sdk quando for publicado
  const queryParamsToObject = (pQuerystring) => {
    const xQueryParams = pQuerystring.split("?")[1].split("&");
    let xParams = {};

    xQueryParams.forEach((pParam) => {
      const xParam = pParam.split("=");
      xParams[xParam[0]] = xParam[1];
    });

    return xParams;
  };

  const handleNextPage = (pProps) => {
    const { onNextPage, nextPage } = pProps;
    if (nextPage && onNextPage) {
      const xNextParams = queryParamsToObject(nextPage);
      onNextPage(xNextParams);
    }
  };

  const handlePrevPage = (pProps) => {
    const { onPrevPage, prevPage } = pProps;
    const isPrevPageEmpty = validators.isEmpty(prevPage);
    if (prevPage && !isPrevPageEmpty && onPrevPage) {
      const xPrevParams = queryParamsToObject(prevPage);
      onPrevPage(xPrevParams);
    } else if (isPrevPageEmpty) {
      onPrevPage();
    }
  };

  const nextPageObserver = (pTarget, pScrollElem, pScrollerRect) => {
    if (pTarget) {
      const xOptions = {
        root: pScrollElem,
        rootMargin: `0px 0px ${pScrollerRect.height * 0.8}px 0px`,
        threshold: 0,
      };

      observer.current = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          handleNextPage(props);
        }
      }, xOptions);

      observer.current.observe(pTarget);
    } else {
      console.info("Não há target");
    }
  };

  const prevPageObserver = (pTarget, pScrollElem, pScrollerRect) => {
    if (pTarget) {
      const xOptions = {
        root: pScrollElem,
        rootMargin: `0px 0px 0px 0px`,
        //rootMargin: `${pScrollerRect.height * 0.66}px 0px 0px 0px`,
        threshold: 0,
      };

      observer.current = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          handlePrevPage(props);
        }
      }, xOptions);

      observer.current.observe(pTarget);
    } else {
      console.info("Não há target");
    }
  };

  const onMountScroll = () => {
    window.setTimeout(autoScroller, 300);
  };

  const autoScroller = () => {
    if (scroller && scroller.current) {
      const xScroller = scroller.current.scrollRef.current;
      xScroller.scrollTo(0, xScroller.scrollHeight);
    } else {
      console.info("Componente Scroller não encontrado");
    }
  };

  const rightScroll = () => {
    if (scroller.current.scrollRef.current.scrollHeight) {
      const xScroller = scroller.current.scrollRef.current;
      const xCurrentScrollHeight = xScroller.scrollHeight;
      const xDiffScrollHeight = xCurrentScrollHeight - tempScrollHeight;

      const xStartHeight = startListRef.current.getBoundingClientRect().height;

      xScroller.scrollTo(0, xDiffScrollHeight - xStartHeight);
      tempScrollHeight = xCurrentScrollHeight;
    }
  };

  useEffect(() => {
    if (
      scroller &&
      scroller.current &&
      scroller.current.scrollRef &&
      scroller.current.scrollRef.current &&
      endListRef &&
      endListRef.current &&
      startListRef &&
      startListRef.current
    ) {
      const xScrollerElem = scroller.current.scrollRef.current;
      const xScrollerRect =
        scroller.current.scrollRef.current.getBoundingClientRect();

      if (!validators.isNull(props.onNextPage)) {
        target.current = endListRef.current;
        nextPageObserver(target.current, xScrollerElem, xScrollerRect);
      }

      if (!validators.isNull(props.onPrevPage)) {
        onMountScroll();
        target.current = startListRef.current;
        prevPageObserver(target.current, xScrollerElem, xScrollerRect);
      }
    }
    return () => {
      observer.current && observer.current.unobserve(target.current);
    };
  }, []);

  useEffect(() => {
    if (
      validators.isNull(props.prevPage) &&
      !validators.isNull(props.onPrevPage)
    ) {
      onMountScroll();
    }

    if (
      !validators.isNull(props.onPrevPage) &&
      !validators.isNull(props.prevPage)
    ) {
      rightScroll();
    }
  }, [props.prevPage, props.onPrevPage]);

  const { children, nextPage, prevPage } = props;
  //const xChild = React.Children.only(children);

  return (
    <Scroller ref={scroller}>
      <Box
        id={"startList"}
        ref={startListRef}
        sx={[
          { position: "relative", height: "24px", p: 2 },
          validators.isEmpty(prevPage) && {
            display: "none",
            visibility: "nome",
          },
        ]}
      >
        <CenterInView>
          <Loading />
        </CenterInView>
      </Box>

      {/* {React.cloneElement(xChild, {}, xChild)} */}
      {children}

      <Box
        id={"endlist"}
        ref={endListRef}
        sx={[
          { position: "relative", height: "24px", p: 2 },
          validators.isEmpty(nextPage) && {
            display: "none",
            visibility: "nome",
          },
        ]}
      >
        <CenterInView>
          <Loading />
        </CenterInView>
      </Box>
    </Scroller>
  );
}

InfiniteScroller.propTypes = {
  children: PropTypes.element.isRequired,
  nextPage: PropTypes.string,
  onNextPage: PropTypes.func,
  prevPage: PropTypes.string,
  onPrevPage: PropTypes.func,
};

export default InfiniteScroller;
