import {
  SpecificationData,
  Specification,
  SpecificationResult,
} from "./buildSpec.ts";

export function xorOperator<T>(
  parentSpecData: Specification<T>,
  spec: Specification<T>,
  name: string,
): SpecificationData<T> {
  const desc = `${parentSpecData.desc} XOR (${spec.desc})`;

  const isSatisfiedBy = (entity: T): SpecificationResult => {
    const parentResult = parentSpecData.isSatisfiedBy(entity);
    const childResult = spec.isSatisfiedBy(entity);

    const details: Array<{
      value: boolean;
      desc: string;
      name: string;
    }> = [];

    return {
      name,
      desc,
      value: (parentResult.value && !childResult.value) ||
        (!parentResult.value && childResult.value),
      details: details.concat(parentResult.details).concat(childResult.details),
    };
  };

  return { desc, name, isSatisfiedBy };
}
