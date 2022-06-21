import { getData } from "../../server/common";
import { SKILLS_LOADING, TAKE_SKILL_DATA } from "../constants/actionTypes";

export const getSkillsData = () => {
  return (dispatch) => {
    dispatch({
        type: SKILLS_LOADING,
        payload: true,
      });
    getData("skills")
      .then((res) => {
        dispatch({
          type: TAKE_SKILL_DATA,
          payload: res.data.data,
        });
      })
      .finally(() => {
        dispatch({
          type: SKILLS_LOADING,
          payload: false,
        });
      });
  };
};
