import { RefObject, useCallback, useEffect, useState } from "react";
import { debounce } from "@/utils/debounce";

export function useModalPosition(
  containerRef: RefObject<HTMLDivElement>,
  modalRef: RefObject<HTMLUListElement>,
  visible: boolean,
  onHide: (...args: any) => void
) {
  const [position, setPosition] = useState<{
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  }>({
    top: "0px",
    left: "0px",
    right: "0px",
    bottom: "0px",
  });

  const determineDropUp = useCallback(() => {
    if (!modalRef?.current || !containerRef?.current || !visible) {
      return;
    }

    setPosition(getPossiblePosition(containerRef, modalRef));
  }, [containerRef, modalRef, visible]);

  useEffect(() => {
    determineDropUp();
  }, [determineDropUp]);

  const { resizeObserver, observe } = getResizeObserver(determineDropUp);

  useEffect(() => {
    if (modalRef.current) {
      observe!(modalRef.current);
    }
    window.addEventListener("scroll", debounce(onHide, 100), true);
    window.addEventListener("resize", debounce(determineDropUp, 100));
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", debounce(onHide, 100), true);
      window.removeEventListener("resize", debounce(determineDropUp, 100));
    };
  }, [modalRef, determineDropUp]);

  return { position };
}

export function getPossiblePosition(
  containerRef: RefObject<HTMLDivElement>,
  modalRef: RefObject<HTMLUListElement>
) {
  if (tryBottom(containerRef, modalRef)) {
    return getBottomPosition(containerRef);
  }

  return getTopPosition(containerRef, modalRef);
}

export function useHandleOutsideClick(
  containerRef: RefObject<HTMLDivElement>,
  modalRef: RefObject<HTMLUListElement>,
  cb: () => void
) {
  const handleOutsideClick = useCallback(
    (e: Event) => {
      if (
        !containerRef.current?.contains(e.target as Node) &&
        !modalRef.current?.contains(e.target as Node)
      ) {
        cb();
      }
    },
    [cb, containerRef, modalRef]
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);
}

function getTopPosition(
  containerRef: RefObject<HTMLDivElement>,
  modalRef: RefObject<HTMLUListElement>
) {
  const wrapperRect = containerRef.current?.getBoundingClientRect();
  const listBoxRect = modalRef.current?.getBoundingClientRect();

  if (!wrapperRect || !listBoxRect) {
    return {};
  }

  const top = wrapperRect.top - listBoxRect.height + window.scrollY;

  const left = wrapperRect.left + window.scrollX;

  return {
    top: `${top}px`,
    left: `${left}px`,
    width: ` ${wrapperRect.width}px`,
    position: "absolute",
  };
}

function getBottomPosition(containerRef: RefObject<HTMLDivElement>) {
  const wrapperRect = containerRef.current?.getBoundingClientRect();

  if (!wrapperRect) {
    return {};
  }

  const top = wrapperRect.bottom + window.scrollY;
  const left = wrapperRect.left + window.scrollX;

  return {
    top: `${top}px`,
    left: `${left}px`,
    width: ` ${wrapperRect.width}px`,
    position: "absolute",
  };
}

function tryBottom(
  containerRef: RefObject<HTMLDivElement>,
  modalRef: RefObject<HTMLUListElement>
) {
  const listBoxRect = modalRef.current?.getBoundingClientRect();

  if (!listBoxRect) {
    return false;
  }

  const bottomPosition = getBottomPosition(containerRef);
  const listBoxRectBottommostY =
    parseInt(bottomPosition.top || "0") + listBoxRect.height;

  const bottommostVisibleYPos = window.scrollY + window.innerHeight;

  return listBoxRectBottommostY <= bottommostVisibleYPos;
}

function getResizeObserver(cb: (...args: any) => void) {
  let resizeObserver: ResizeObserver | MutationObserver;
  let observe;

  if (ResizeObserver) {
    resizeObserver = new ResizeObserver(debounce(cb));
    observe = function (el: Element) {
      resizeObserver.observe(el);
    };
  } else {
    resizeObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function () {
        debounce(cb)();
      });

      observe = function (el: Element) {
        resizeObserver.observe(el, {
          attributes: true,
          subtree: true,
          childList: true,
        });
      };
    });
  }

  return { resizeObserver, observe };
}
