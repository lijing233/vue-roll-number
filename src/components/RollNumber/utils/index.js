export const getDomHeight = (el) => {
  let height = 0;
  if (el.getBoundingClientRect) {
    height = el.getBoundingClientRect().height;
  }
  if (!height) {
    height = Math.max(el.offsetHeight, el.clientHeight);
  }

  return height;
};
