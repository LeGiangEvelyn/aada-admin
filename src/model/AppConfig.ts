import * as CookieUtils from "../Utils/CookieUtils";

export const apiUrl = "http://localhost:8080/api/v2";
export const loginURI = apiUrl + "/auth";
export const headers = new Headers({
  Authorization: "Bearer " + CookieUtils.getToken(),
});
