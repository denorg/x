/** Applies properties of mixins to instance. */
export function applyMixins(instance: any, mixins: any[]) {
  mixins.forEach((mixin) => {
    Object.getOwnPropertyNames(mixin).forEach((name) => {
      Object.defineProperty(
        instance,
        name,
        Object.getOwnPropertyDescriptor(
          mixin,
          name,
        ) as PropertyDescriptor,
      );
    });
  });
}

/** Applies properties of base class prototypes to instance. */
export function applyInstanceMixins(instance: any, baseCtors: any[]) {
  applyMixins(instance, baseCtors.map((baseCtor) => baseCtor.prototype));
}

/** Applies properties of base class prototypes to class prototype. */
export function applyClassMixins(ctor: any, baseCtors: any[]) {
  applyInstanceMixins(ctor.prototype, baseCtors);
}
