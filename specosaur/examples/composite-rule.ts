import { defineSpecification } from "../mod.ts";

type Denosaur = {
  color: string;
  dietPlan: "carnivore" | "vegetarian" | "omnivorous";
  weigth: number;
  size: number;
};

const denosaurIsCarnivore = defineSpecification({
  name: "denosaurIsCarnivore",
  desc: "Denosaur is carnivore",
  isSatisfiedBy: (denosaur: Denosaur) => denosaur.dietPlan === "carnivore",
});

const denosaurIsBlue = defineSpecification({
  name: "denosaurIsBlue",
  desc: "Denosaur is blue",
  isSatisfiedBy: (denosaur: Denosaur) => denosaur.color === "blue",
});

const denosaur: Denosaur = {
  color: "blue",
  dietPlan: "carnivore",
  weigth: 1000,
  size: 10,
};

const isBlueAndCarnivore = denosaurIsBlue.and(
  denosaurIsCarnivore,
  "isBlueAndCarnivore",
);

const result = isBlueAndCarnivore.isSatisfiedBy(denosaur);

console.log(result); // => true
