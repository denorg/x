# Specosaur

Specification pattern library for Deno.

Portage for Deno of [spoeck](https://www.npmjs.com/package/spoeck) npm module

# Create a specification :

```typescript
import { defineSpecification } from 'https://deno.land/x/specosaur/mod.ts';

type Denosaur = {
  color: string;
  dietPlan: 'carnivore' | 'vegetarian' | 'omnivorous';
  weigth: number;
  size: number;
};

const denosaur: Denosaur = {
  color: 'green',
  dietPlan: 'carnivore',
  weigth: 1000,
  size: 10,
};

const denosaurIsBlue = defineSpecification({
  name: 'denosaurIsBlue',
  desc: 'Denosaur is blue',
  isSatisfiedBy: (denosaur: Denosaur) => denosaur.color === 'blue',
});

const result = denosaurIsBlue.isSatisfiedBy(denosaur);

console.log(result.value); // => false
```

# Result format :

The specification `isSatisifiedBy` function will always return an object with these properties.

- `name`: Is the name of the specification.
- `desc`: Is the description of the specification.
- `value`: Is the boolean that indicate if the specification is respected.
- `details`: Is the list of all sub specifications results.

```typescript
// With a simple rule :
const result = {
  name: 'denosaurIsBlue',
  desc: 'Denosaur is blue',
  value: false,
  details: [{ name: 'denosaurIsBlue', value: false, desc: 'Denosaur is blue' }],
};

// With a composite rule :
const isBlueAndCarnivore = denosaurIsBlue.and(
  denosaurIsCarnivore,
  'isBlueAndCarnivore',
);

const compositeRuleResult = {
  name: 'isBlueAndCarnivore',
  desc: 'Denosaur is blue AND (Denosaur is carnivore)',
  value: true,
  details: [
    { name: 'denosaurIsBlue', value: true, desc: 'Denosaur is blue' },
    { name: 'denosaurIsCarnivore', value: true, desc: 'Denosaur is carnivore' },
  ],
};
```

# Combining specifications with operator :

## AND operator:

```typescript
const isBlueAndCarnivore = denosaurIsBlue.and(
  denosaurIsCarnivore,
  'isBlueAndCarnivore',
);
```

## OR operator :

```typescript
const isBlueOrCarnivore = denosaurIsBlue.or(
  denosaurIsCarnivore,
  'isBlueOrCarnivore',
);
```

## XOR operator :

```typescript
const isBlueXorCarnivore = denosaurIsBlue.xor(
  denosaurIsCarnivore,
  'isBlueXorCarnivore',
);
```

## NOT operator :

```typescript
const isBlueAndNotCarnivore = denosaurIsBlue.and(
  denosaurIsCarnivore.not(isNotCarinvore),
  'isBlueAndNotCarnivore',
);
```
