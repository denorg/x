import { assertEquals, assert } from "https://deno.land/std/testing/asserts.ts";

import { defineSpecification } from "../defineSpecification.ts";

type Denosaur = {
  color: string;
  dietPlan: "carnivore" | "vegetarian" | "omnivorous";
  weigth: number;
  size: number;
};

Deno.test(
  "Given specifications: isBlue and isCarnivore, Using AND operator, should return a new specification denosaur is blue and carnivore",
  () => {
    const specification = defineSpecification({
      name: "denosaurIsBlue",
      desc: "Denosaur is blue",
      isSatisfiedBy: (denosaur: Denosaur) => denosaur.color === "blue",
    });

    assertEquals(specification.name, "denosaurIsBlue");
    assertEquals(specification.desc, "Denosaur is blue");
    assert(specification.and);
    assert(specification.or);
    assert(specification.xor);
    assert(specification.not);
    assert(specification.isSatisfiedBy);
  },
);
