export function TransfromerMiddleware(req, res, next) {
  if (req.query.where) req.query.where = JSON.parse(req.query.where);
  if (req.query.order) req.query.order = JSON.parse(req.query.order);
  next();
}
