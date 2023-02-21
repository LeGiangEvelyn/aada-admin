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
    const token = data.json.accessToken;
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
    console.log("token: ", CookieUtils.getToken());
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
    const headers = {
      "Content-Type": "application/json",
      Authorization: "CookieUtils.getToken()",
    };
    //   const res = await fetchUtils.fetchJson(apiUrl + "/permission", {
    //     method: "GET",
    //     headers,
    //   });
    //   console.log("token: ", CookieUtils.getToken());

    //   return res.json;
  },
};

export default authProvider;

// async function login(username: string, password: string) {
//   const data = await fetchUtils.fetchJson(loginURI, {
//     method: "POST",
//     body: JSON.stringify({ username, password }),
//     headers: new Headers({ "Content-Type": "application/json" }),
//   });
//   const token = data.json.accessToken;
//   CookieUtils.setToken(token);
//   localStorage.setItem("username", username);
//   return token;
// }

// async function logout() {
//   CookieUtils.logout();
//   return Promise.resolve();
// }

// async function checkError(params: { status: any }) {
//   const { status } = params;
//   if (status === 401 || status === 403) {
//     CookieUtils.logout();
//     return Promise.reject();
//   }
//   return Promise.resolve();
// }

// async function checkAuth() {
//   const token = CookieUtils.getToken();
//   return token ? true : Promise.reject();
// }

// export type AuthRedirectResult = {
//   redirectTo?: string | false;
//   logoutOnFailure?: boolean;
// };

// async function getPermissions() {
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: CookieUtils.getToken(),
//   };
//   const res = await fetchUtils.fetchJson(apiUrl + "/permission", {
//     method: "GET",
//     headers,
//   });

//   return res.json;
// }
