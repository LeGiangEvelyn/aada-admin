import { AuthProvider, fetchUtils } from "react-admin";
import * as CookieUtils from "./Utils/CookieUtils";
import { loginURI, apiUrl } from "./model/AppConfig";

/**
 * authProvider types
 */
const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const data = await fetchUtils.fetchJson(loginURI, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    const token = data.json.token;
    console.log("This token: " + token);
    CookieUtils.setToken(token);
    localStorage.setItem("username", username);
    return token;
  },

  logout: () => {
    CookieUtils.logout();
    return Promise.resolve();
  },

  checkAuth: () => {
    const token = CookieUtils.getToken();
    return token ? Promise.resolve() : Promise.reject();
  },

  checkError: (params: any) => {
    const { status } = params;
    if (status === 401 || status === 403) {
      CookieUtils.logout();
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: async function () {
    const headers = new Headers({
      Authorization: "Bearer " + CookieUtils.getToken(),
    });

    console.log("headers: ", headers);

    const res = await fetchUtils.fetchJson(apiUrl + "/users/permission", {
      method: "GET",
      headers,
    });

    console.log("Res " + res.json);

    return res;
  },
};

export default authProvider;
