const isDevelopment = false; // localohst -> true || live -> false
const env = {
  websiteDomain: isDevelopment
    ? "http://localhost:4000"
    : "",
  apiDomain: "",
  status: {
    success: 200,
    error: 403,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    methodNotAllowed: 405,
    notAcceptable: 406,
    internalServerError: 500,
  },
};
export default env;
