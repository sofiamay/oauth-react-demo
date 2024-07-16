/* -- Server Paths -- */

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";
const SERVER_LOGGED_IN_PATH = "/auth/logged_in";
const SERVER_LOG_OUT_PATH = "/auth/logout";
const SERVER_AUTH_PATH = "/auth/url";

/* -- Site Info -- */
const SITE_TITLE = "Oauth Demo";
const SITE_YEAR = new Date().getFullYear();

export {
  SERVER_URL,
  SERVER_LOGGED_IN_PATH,
  SERVER_LOG_OUT_PATH,
  SERVER_AUTH_PATH,
  SITE_TITLE,
  SITE_YEAR,
};
