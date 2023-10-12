import { debounce } from "@/utils/debounce";

export function getResizeObserver(cb: (...args: any) => void) {
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
