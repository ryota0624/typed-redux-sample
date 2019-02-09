type Unwrap<T> = T extends {[K in keyof T]: infer U} ? U : never
type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ?
                  ReturnType<T[K]> :
                  never
}

export type CreatorsToActions<T> = Unwrap<ReturnTypes<T>>

export type Reducer<State, Action> = {
  initialState: State,
  apply(state: State, action: Action): State,
}

export type Reduce<State, Action> = (state: State | undefined, action: Action | any) => State;

export function makeReducer<State, Action>(reducer: Reducer<State, Action>): Reduce<State, Action> {
  let _state = reducer.initialState;
  return (state: State | undefined, action: Action) => {
    if (state) {
      const reduceResult = reducer.apply(state, action);
      if (reduceResult) {
        _state = reduceResult
        return reduceResult;
      }
    }
    return _state;
  }
}