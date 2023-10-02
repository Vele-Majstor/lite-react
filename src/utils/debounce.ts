export const debounce = (func: (...args: any) => any, wait: number = 500) => {
  let timer: NodeJS.Timer | null;

  function debounced(...args: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(null, args);
    }, wait);
  }

  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
  };

  return debounced;
};
