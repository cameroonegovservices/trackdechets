import client from "../graphql-client";
import jwtDecoder from "jwt-decode";

export const localAuthService = {
  isAuthenticated: false,
  locallyAutheticate(token: string) {
    this.isAuthenticated = true;
    window.localStorage.setItem("td-token", token);
  },
  locallySignOut() {
    this.isAuthenticated = false;
    client.resetStore();
    window.localStorage.removeItem("td-token");
  },
  getToken() {
    const token = window.localStorage.getItem("td-token");

    if (isTokenValid(token)) {
      return token;
    }

    this.locallySignOut();
    return null;
  },
  init() {
    const isValid = isTokenValid(window.localStorage.getItem("td-token"));

    if (isValid) {
      this.isAuthenticated = true;
    }
  }
};

function isTokenValid(token: string | null) {
  if (!token) {
    return false;
  }

  const decodedToken = jwtDecoder<{ exp: number }>(token);

  const currentTime = Date.now() / 1000;
  if (!decodedToken || !decodedToken.exp || decodedToken.exp < currentTime) {
    return false;
  }

  return true;
}

localAuthService.init();
