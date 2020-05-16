import { buildSpec, Specification, SpecificationResult } from "./buildSpec.ts";

export interface SpecificationDefinition<T> {
  desc: string;
  name: string;
  isSatisfiedBy: (entity: T) => boolean;
}

export function defineSpecification<T>(
  definition: SpecificationDefinition<T>,
): Specification<T> {
  return buildSpec({
    name: definition.name,
    desc: definition.desc,
    isSatisfiedBy: (entity: T): SpecificationResult => {
      const isSatisfied = definition.isSatisfiedBy(entity);

      return {
        name: definition.name,
        value: isSatisfied,
        desc: definition.desc,
        details: [
          {
            name: definition.name,
            value: isSatisfied,
            desc: definition.desc,
          },
        ],
      };
    },
  });
}
