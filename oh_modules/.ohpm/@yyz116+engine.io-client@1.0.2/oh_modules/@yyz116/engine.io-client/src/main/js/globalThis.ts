//export const globalThisShim = global;
export const globalThisShim = (() => {
  return Function("return this")();
})();