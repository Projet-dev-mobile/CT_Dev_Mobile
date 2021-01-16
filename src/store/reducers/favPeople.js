const initialState = { favPeople: [] }

function favPeople(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SAVE_PEOPLE':
      nextState = {
        ...state,
        favPeople: [...state.favPeople, action.value]
      };
      return nextState || state
    case 'UNSAVE_PEOPLE':
      nextState = {
        ...state,
        favPeople: state.favPeople.filter(id => id !== action.value)
      };
      return nextState || state
    default:
      return state
  };
}

export default favPeople;