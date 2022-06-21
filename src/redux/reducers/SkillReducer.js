import { SKILLS_LOADING, TAKE_SKILL_DATA } from "../constants/actionTypes";
const initialState = {
  skills_data: [],
  skills_loading: false 
};
export default function (state = initialState, action) {
  switch (action.type) {
    case TAKE_SKILL_DATA:
      return {
        ...state,
        skills_data: action.payload,
      };
      case SKILLS_LOADING: 
      return {
          ...state,
          skills_loading: action.payload
      }
    default:
      return state;
  }
}
