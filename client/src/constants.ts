/* -- Server Paths -- */

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";
const SERVER_LOGGED_IN_PATH = "/auth/logged_in";
const SERVER_LOG_OUT_PATH = "/auth/logout";

/* -- Site Info -- */
const SITE_TITLE = "Oauth Demo";
const SITE_YEAR = new Date().getFullYear();

export {
  SERVER_URL,
  SERVER_LOGGED_IN_PATH,
  SERVER_LOG_OUT_PATH,
  SITE_TITLE,
  SITE_YEAR,
};
