import {
  Specification,
  SpecificationData,
  SpecificationResult,
} from "./buildSpec.ts";

export function notOperator<T>(
  parentSpec: Specification<T>,
  name: string,
): SpecificationData<T> {
  const desc = `NOT (${parentSpec.desc})`;

  const isSatisfiedBy = (entity: T): SpecificationResult => {
    const parentResult = parentSpec.isSatisfiedBy(entity);

    return {
      name,
      desc,
      value: !parentResult.value,
      details: [
        {
          name,
          desc,
          value: !parentResult.value,
        },
      ],
    };
  };

  return { desc, name, isSatisfiedBy };
}
