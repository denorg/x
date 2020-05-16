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

Deno.test(
  "Given specifications: denosaurIsBlue using NOT operator on a blue denosaur should return false with details",
  () => {
    const denosaur: Denosaur = {
      color: "blue",
      dietPlan: "carnivore",
      weigth: 1000,
      size: 10,
    };

    const result = denosaurIsBlue
      .not("denosaurIsNOTBlue")
      .isSatisfiedBy(denosaur);

    assertEquals(result, {
      name: "denosaurIsNOTBlue",
      desc: "NOT (Denosaur is blue)",
      value: false,
      details: [
        {
          name: "denosaurIsNOTBlue",
          value: false,
          desc: "NOT (Denosaur is blue)",
        },
      ],
    });
  },
);

Deno.test(
  "Given specifications: denosaurIsBlue using NOT operator on a green denosaur should return false with details",
  () => {
    const denosaur: Denosaur = {
      color: "green",
      dietPlan: "carnivore",
      weigth: 1000,
      size: 10,
    };

    const result = denosaurIsBlue
      .not("denosaurIsNOTBlue")
      .isSatisfiedBy(denosaur);

    assertEquals(result, {
      name: "denosaurIsNOTBlue",
      desc: "NOT (Denosaur is blue)",
      value: true,
      details: [
        {
          name: "denosaurIsNOTBlue",
          value: true,
          desc: "NOT (Denosaur is blue)",
        },
      ],
    });
  },
);
