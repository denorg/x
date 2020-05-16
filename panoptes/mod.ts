// Copyright 2019 Jason Zi Feng Lei. All rights reserved. MIT license.

interface OptionsStruct {
  callbackOnGet?: Boolean;
}

export function watch(obj: Object, cb: Function, opt?: OptionsStruct): Object {
  const traps: Object = {
    get: (target: Object, property: any, receiver: any) => {
      if (opt && opt.callbackOnGet === true) cb();

      const value: any = Reflect.get(target, property, receiver);

      if (typeof value === 'object' && value !== null) {
        return new Proxy(value, traps);
      }

      return value;
    },
    defineProperty: (target: Object, property: any, descriptor: any) => {
      cb();
      return Reflect.defineProperty(target, property, descriptor);
    },
    deleteProperty: (target: Object, property: any) => {
      cb();
      return Reflect.deleteProperty(target, property);
    },
  };

  return new Proxy(obj, traps);
}
