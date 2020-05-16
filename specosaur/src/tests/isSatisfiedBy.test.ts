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
  "Given specifications: denosaurIsBlue calling isSatifiedBy() on a blue denosaur should return true with details",
  () => {
    const denosaur: Denosaur = {
      color: "blue",
      dietPlan: "carnivore",
      weigth: 1000,
      size: 10,
    };

    const result = denosaurIsBlue.isSatisfiedBy(denosaur);

    assertEquals(result, {
      name: "denosaurIsBlue",
      desc: "Denosaur is blue",
      value: true,
      details: [
        { name: "denosaurIsBlue", value: true, desc: "Denosaur is blue" },
      ],
    });
  },
);

Deno.test(
  "Given specifications: denosaurIsBlue calling isSatifiedBy() on a green denosaur should return true with details",
  () => {
    const denosaur: Denosaur = {
      color: "green",
      dietPlan: "carnivore",
      weigth: 1000,
      size: 10,
    };

    const result = denosaurIsBlue.isSatisfiedBy(denosaur);

    assertEquals(result, {
      name: "denosaurIsBlue",
      desc: "Denosaur is blue",
      value: false,
      details: [
        { name: "denosaurIsBlue", value: false, desc: "Denosaur is blue" },
      ],
    });
  },
);
