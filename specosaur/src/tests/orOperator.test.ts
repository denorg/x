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
  "Given specifications: isBlue and isCarnivore, Using OR operator, should return a new specification denosaur is blue OR carnivore",
  () => {
    const denosaurIsBlueORCarnivore = denosaurIsBlue.or(
      denosaurIsCarnivore,
      "denosaurIsBlueORCarnivore",
    );

    assertEquals(denosaurIsBlueORCarnivore.name, "denosaurIsBlueORCarnivore");
    assertEquals(
      denosaurIsBlueORCarnivore.desc,
      "Denosaur is blue OR (Denosaur is carnivore)",
    );
    assert(denosaurIsBlueORCarnivore.and);
    assert(denosaurIsBlueORCarnivore.or);
    assert(denosaurIsBlueORCarnivore.xor);
    assert(denosaurIsBlueORCarnivore.not);
    assert(denosaurIsBlueORCarnivore.isSatisfiedBy);
  },
);

Deno.test(
  "calling denosaurIsBlueORCarnivore.isSatifiedBy() on a blue carnivore denosaur should return true wtih details",
  () => {
    const denosaur: Denosaur = {
      color: "blue",
      dietPlan: "carnivore",
      weigth: 1000,
      size: 10,
    };

    const denosaurIsBlueORCarnivore = denosaurIsBlue.or(
      denosaurIsCarnivore,
      "denosaurIsBlueORCarnivore",
    );

    const result = denosaurIsBlueORCarnivore.isSatisfiedBy(denosaur);

    assertEquals(result, {
      name: "denosaurIsBlueORCarnivore",
      desc: "Denosaur is blue OR (Denosaur is carnivore)",
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
  "calling denosaurIsBlueORCarnivore.isSatifiedBy() on a green carnivore denosaur should return true wtih details",
  () => {
    const denosaur: Denosaur = {
      color: "green",
      dietPlan: "carnivore",
      weigth: 1000,
      size: 10,
    };

    const denosaurIsBlueORCarnivore = denosaurIsBlue.or(
      denosaurIsCarnivore,
      "denosaurIsBlueORCarnivore",
    );

    const result = denosaurIsBlueORCarnivore.isSatisfiedBy(denosaur);

    assertEquals(result, {
      name: "denosaurIsBlueORCarnivore",
      desc: "Denosaur is blue OR (Denosaur is carnivore)",
      value: true,
      details: [
        { name: "denosaurIsBlue", value: false, desc: "Denosaur is blue" },
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
  "calling denosaurIsBlueORCarnivore.isSatifiedBy() on a green vegetarian denosaur should return false wtih details",
  () => {
    const denosaur: Denosaur = {
      color: "green",
      dietPlan: "vegetarian",
      weigth: 1000,
      size: 10,
    };

    const denosaurIsBlueORCarnivore = denosaurIsBlue.or(
      denosaurIsCarnivore,
      "denosaurIsBlueORCarnivore",
    );

    const result = denosaurIsBlueORCarnivore.isSatisfiedBy(denosaur);

    assertEquals(result, {
      name: "denosaurIsBlueORCarnivore",
      desc: "Denosaur is blue OR (Denosaur is carnivore)",
      value: false,
      details: [
        { name: "denosaurIsBlue", value: false, desc: "Denosaur is blue" },
        {
          name: "denosaurIsCarnivore",
          value: false,
          desc: "Denosaur is carnivore",
        },
      ],
    });
  },
);
