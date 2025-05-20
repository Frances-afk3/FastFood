export function logger(req, res, next) {
  console.log(`[${req.method}] ${req.url}`);
  next();
}
// This middleware logs the HTTP method and URL of incoming requests.