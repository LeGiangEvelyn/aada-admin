import Cookies from "js-cookie";
//import {uriLogout} from '../constants/Config';

const TOKEN_ID_COOKIES = "authorization";
const USERNAME_COOKIES = "username";
const ROLE_COOKIES = "role";
const COOKIES_OPTIONS = {
  path: "/",
  domain:
    window.location.hostname.indexOf("locallhost:3000") >= 0
      ? ".locallhost:3000n"
      : "",
  secure: window.location.protocol === "https:",
};

function setCookie(key: string, value: string, option: any) {
  return Cookies.set(key, value, option);
}

function getCookie(key: string) {
  return Cookies.get(key);
}

function removeCookie(key: string, option: any) {
  Cookies.remove(key, option);
}

export function setToken(token: string) {
  setCookie(TOKEN_ID_COOKIES, token, COOKIES_OPTIONS);
}
export function getToken() {
  return getCookie(TOKEN_ID_COOKIES);
}

export function logout() {
  removeCookie(TOKEN_ID_COOKIES, COOKIES_OPTIONS);
  removeCookie(USERNAME_COOKIES, COOKIES_OPTIONS);
  removeCookie(ROLE_COOKIES, COOKIES_OPTIONS);
  localStorage.clear();
  //window.location = uriLogout;
}
