import { defineSpecification } from "../mod.ts";

type Denosaur = {
  color: string;
  dietPlan: "carnivore" | "vegetarian" | "omnivorous";
  weigth: number;
  size: number;
};

const denosaur: Denosaur = {
  color: "green",
  dietPlan: "carnivore",
  weigth: 1000,
  size: 10,
};

const denosaurIsBlue = defineSpecification({
  name: "denosaurIsBlue",
  desc: "Denosaur is blue",
  isSatisfiedBy: (denosaur: Denosaur) => denosaur.color === "blue",
});

const result = denosaurIsBlue.isSatisfiedBy(denosaur);

console.log(result.value); // => false
