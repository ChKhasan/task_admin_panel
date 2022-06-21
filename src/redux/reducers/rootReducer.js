import { combineReducers } from "redux";
import SkillReducer from "./SkillReducer";

export const rootReducer = combineReducers({
    skills: SkillReducer
});
