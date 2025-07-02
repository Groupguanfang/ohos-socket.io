import { Emitter } from "@yyz116/emitter";

export function on(
  obj: Emitter<any, any>,
  ev: string,
  fn: (err?: any) => any
): Function {
  obj.on(ev, fn);
  return function subDestroy(): void {
    obj.off(ev, fn);
  };
}
