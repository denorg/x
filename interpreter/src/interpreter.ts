type TSideEffect<S> = (
  state: TState<S>,
  ...args: unknown[]
) => TState<S> | void;
type TSideEffects<S> = TSideEffect<S>[];
type TState<S> = Record<string, TSideEffects<S> | S>;
type TAction<V, S> = (variables: readonly V[], state: TState<S>) => TState<S>;
type TConstraint<S> = (state: TState<S>) => boolean;
type TDescription<V, S> = {
  variables: V[];
  actions: TAction<V, S>[];
  initialState: TState<S>;
  constraints: TConstraint<S>[];
};

export default class Interpreter<V, S> {
  variables: V[] = [];
  actions: TAction<V, S>[] = [];
  state: TState<S> = { sideEffects: [] };
  constraints: TConstraint<S>[] = [];

  constructor(description: TDescription<V, S>) {
    const { variables, actions, initialState, constraints } = description;
    this.variables = variables;
    this.actions = actions;
    this.state = { ...this.state, ...initialState };
    this.constraints = constraints;
  }

  private assert = (state: TState<S>, objective: TConstraint<S>) => {
    return objective(state);
  };

  private callEffect = (state: TState<S>, effect: TSideEffect<S>) => {
    const out = effect(state) ? effect(state) : state;
    return out as TState<S>;
  };

  private callAction = (state: TState<S>, action: TAction<V, S>) => {
    const callEffect = this.callEffect;
    const variables = Object.freeze(this.variables);
    const outState = action(variables, state);
    const sideEffects = outState.sideEffects as TSideEffects<S>;
    const afterEffects = sideEffects.reduce(
      (s, eff) => callEffect(s, eff),
      outState
    );
    return afterEffects;
  };

  interpret = () => {
    const { assert, callAction } = this;
    const state = Object.freeze(this.state);
    const actions = this.actions;
    const constraints = this.constraints;
    const output = actions.reduce((s, a) => callAction(s, a), state);
    const assertions = constraints.map(obj => assert(output, obj));

    return [output, assertions] as const;
  };
}
