export default function createReducer(initialState, handlers) {
  return (state = initialState, action) => {
    return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;
  }
}
