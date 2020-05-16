# deno-queueing

Implementation of commonly used queue's in TypeScript

## Priority Queue

A [Priority queue](https://www.wikiwand.com/en/Priority_queue) implemented via a [Binary heap](https://www.wikiwand.com/en/Binary_heap). Generic implementation where `T` is the type of the items and `U` is the type of the priorities. The type `U` must be comparable to itself (i.e. `number`, `string`...)

Constructor parameters:

- `mapper`: function that will return the priority mapping of type `U` for a given element of type `T`. Defaults to the identity function.
- `items` (rest parameter): the items that should be initally put into the queue. Defaults to an empty array.

Usage with defaults:

```typescript
const queue = new PriorityQueue();
const small = 1;
const middle = 5;
const big = 9;

queue.enqueue(middle);
queue.enqueue(big);
queue.enqueue(small);

console.log(queue.dequeue()); // 1
console.log(queue.dequeue()); // 5
console.log(queue.dequeue()); // 9

console.log(queue.dequeue()); // Underflow error
```

Usage with set parameters:
```typescript
interface WithValue {value: number;}

const withSmallUnits = { value: 101 };
const withMiddleUnits = { value: 95 };
const withBigUnits = { value: 909 };

const mapping = ({value}:WithValue) => value % 10; // return the digit in the units place

const queue = new PriorityQueue(mapping, withMiddleUnits, withBigUnits, withSmallUnits);

console.log(queue.dequeue()); // {value: 101}
console.log(queue.dequeue()); // {value: 95}
console.log(queue.dequeue()); // {value: 909}

```

## Simple Queue

A simple FIFO [Queue](https://www.wikiwand.com/en/Queue_(abstract_data_type)), implemented as a simple abstraction over the built-in array type. Generic implementation where `T` is the type of the items.

Constructor parameters:

- `items` (rest parameter): the items that should be initally put into the queue. Defaults to an empty array.

Usage with defaults:

```typescript
const small = 1;
const middle = 5;
const big = 9;

const queue = new Queue(middle, big);

queue.enqueue(small);

console.log(queue.dequeue()); // 5
console.log(queue.dequeue()); // 9
console.log(queue.dequeue()); // 1

console.log(queue.dequeue()); // Underflow error
```

## Simple Stack

A simple LIFO [Stack](https://www.wikiwand.com/en/Stack_(abstract_data_type)), implemented as a simple abstraction over the built-in array type. Generic implementation where `T` is the type of the items.

Constructor parameters:

- `items` (rest parameter): the items that should be initally put into the queue. Defaults to an empty array.

Usage with defaults:

```typescript
const small = 1;
const middle = 5;
const big = 9;

const stack = new Stack(middle, big);

stack.enqueue(small);

console.log(stack.pop()); // 1
console.log(stack.pop()); // 9
console.log(stack.pop()); // 5

console.log(stack.pop()); // Underflow error
```