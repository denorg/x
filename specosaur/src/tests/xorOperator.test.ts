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
  "Given specifications: isBlue and isCarnivore, Using XOR operator, should return a new specification denosaur is blue OR carnivore",
  () => {
    const denosaurIsBlueXORCarnivore = denosaurIsBlue.xor(
      denosaurIsCarnivore,
      "denosaurIsBlueXORCarnivore",
    );

    assertEquals(denosaurIsBlueXORCarnivore.name, "denosaurIsBlueXORCarnivore");
    assertEquals(
      denosaurIsBlueXORCarnivore.desc,
      "Denosaur is blue XOR (Denosaur is carnivore)",
    );
    assert(denosaurIsBlueXORCarnivore.and);
    assert(denosaurIsBlueXORCarnivore.or);
    assert(denosaurIsBlueXORCarnivore.xor);
    assert(denosaurIsBlueXORCarnivore.not);
    assert(denosaurIsBlueXORCarnivore.isSatisfiedBy);
  },
);

Deno.test(
  "calling denosaurIsBlueXORCarnivore.isSatifiedBy() on a blue carnivore denosaur should return false wtih details",
  () => {
    const denosaur: Denosaur = {
      color: "blue",
      dietPlan: "carnivore",
      weigth: 1000,
      size: 10,
    };

    const denosaurIsBlueXORCarnivore = denosaurIsBlue.xor(
      denosaurIsCarnivore,
      "denosaurIsBlueXORCarnivore",
    );

    const result = denosaurIsBlueXORCarnivore.isSatisfiedBy(denosaur);

    assertEquals(result, {
      name: "denosaurIsBlueXORCarnivore",
      desc: "Denosaur is blue XOR (Denosaur is carnivore)",
      value: false,
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
  "calling denosaurIsBlueXORCarnivore.isSatifiedBy() on a green carnivore denosaur should return true wtih details",
  () => {
    const denosaur: Denosaur = {
      color: "green",
      dietPlan: "carnivore",
      weigth: 1000,
      size: 10,
    };

    const denosaurIsBlueXORCarnivore = denosaurIsBlue.xor(
      denosaurIsCarnivore,
      "denosaurIsBlueXORCarnivore",
    );

    const result = denosaurIsBlueXORCarnivore.isSatisfiedBy(denosaur);

    assertEquals(result, {
      name: "denosaurIsBlueXORCarnivore",
      desc: "Denosaur is blue XOR (Denosaur is carnivore)",
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
  "calling denosaurIsBlueXORCarnivore.isSatifiedBy() on a green vegetarian denosaur should return false wtih details",
  () => {
    const denosaur: Denosaur = {
      color: "green",
      dietPlan: "vegetarian",
      weigth: 1000,
      size: 10,
    };

    const denosaurIsBlueXORCarnivore = denosaurIsBlue.xor(
      denosaurIsCarnivore,
      "denosaurIsBlueXORCarnivore",
    );

    const result = denosaurIsBlueXORCarnivore.isSatisfiedBy(denosaur);

    assertEquals(result, {
      name: "denosaurIsBlueXORCarnivore",
      desc: "Denosaur is blue XOR (Denosaur is carnivore)",
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
