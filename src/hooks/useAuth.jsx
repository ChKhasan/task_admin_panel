import React from "react";
import { TOKEN } from "../const/Api";

const useAuth = () => {
  if (localStorage.getItem(TOKEN)) return true;

  return false;
};

export default useAuth;
