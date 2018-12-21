import { TOGGLE_FORM, CHANGE_NAME } from '../actions/Tag';

export default function tag(state = {}, action) {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        name: action.name,
      };
    case TOGGLE_FORM:
      return {
        ...state,
        isFormOpen: !state.isFormOpen,
      };
    default:
      return state;
  }
}
