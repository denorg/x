import { assertEquals, assert } from "https://deno.land/std/testing/asserts.ts";

import { defineSpecification } from "../../mod.ts";

type Denosaur = {
  color: string;
  dietPlan: "carnivore" | "vegetarian" | "omnivorous";
  weigth: number;
  size: number;
};

const denosaurIsBlue = defineSpecification({
  name: "denosaurIsBlue",
  desc: "Denosaur is blue",
  isSatisfiedBy: (denosaur: Denosaur) => denosaur.color === "blue",
});

const denosaurIsCarnivore = defineSpecification({
  name: "denosaurIsCarnivore",
  desc: "Denosaur is carnivore",
  isSatisfiedBy: (denosaur: Denosaur) => denosaur.dietPlan === "carnivore",
});

Deno.test(
  "Given specifications: isBlue and isCarnivore, Using AND operator, should return a new specification denosaur is blue and carnivore",
  () => {
    const denosaurIsBlueANDCarnivore = denosaurIsBlue.and(
      denosaurIsCarnivore,
      "denosaurIsBlueANDCarnivore",
    );

    assertEquals(denosaurIsBlueANDCarnivore.name, "denosaurIsBlueANDCarnivore");
    assertEquals(
      denosaurIsBlueANDCarnivore.desc,
      "Denosaur is blue AND (Denosaur is carnivore)",
    );
    assert(denosaurIsBlueANDCarnivore.and);
    assert(denosaurIsBlueANDCarnivore.or);
    assert(denosaurIsBlueANDCarnivore.xor);
    assert(denosaurIsBlueANDCarnivore.not);
    assert(denosaurIsBlueANDCarnivore.isSatisfiedBy);
  },
);

Deno.test(
  "calling denosaurIsBlueANDCarnivore.isSatifiedBy() on a blue carnivore denosaur should return true wtih details",
  () => {
    const denosaur: Denosaur = {
      color: "blue",
      dietPlan: "carnivore",
      weigth: 1000,
      size: 10,
    };

    const denosaurIsBlueANDCarnivore = denosaurIsBlue.and(
      denosaurIsCarnivore,
      "denosaurIsBlueANDCarnivore",
    );

    const result = denosaurIsBlueANDCarnivore.isSatisfiedBy(denosaur);

    assertEquals(result, {
      name: "denosaurIsBlueANDCarnivore",
      desc: "Denosaur is blue AND (Denosaur is carnivore)",
      value: true,
      details: [
        { name: "denosaurIsBlue", value: true, desc: "Denosaur is blue" },
        {
          name: "denosaurIsCarnivore",
          value: true,
          desc: "Denosaur is carnivore",
        },
      ],
    });
  },
);

Deno.test(
  "calling denosaurIsBlueANDCarnivore.isSatifiedBy() on a blue vegetarian denosaur should return false wtih details",
  () => {
    const denosaur: Denosaur = {
      color: "blue",
      dietPlan: "vegetarian",
      weigth: 1000,
      size: 10,
    };

    const denosaurIsBlueANDCarnivore = denosaurIsBlue.and(
      denosaurIsCarnivore,
      "denosaurIsBlueANDCarnivore",
    );

    const result = denosaurIsBlueANDCarnivore.isSatisfiedBy(denosaur);

    assertEquals(result, {
      name: "denosaurIsBlueANDCarnivore",
      desc: "Denosaur is blue AND (Denosaur is carnivore)",
      value: false,
      details: [
        { name: "denosaurIsBlue", value: true, desc: "Denosaur is blue" },
        {
          name: "denosaurIsCarnivore",
          value: false,
          desc: "Denosaur is carnivore",
        },
      ],
    });
  },
);
