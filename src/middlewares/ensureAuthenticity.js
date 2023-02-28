const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/authConfig");
function ensureAutheticiy(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Uusário não autenticado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);
    request.user = {
      id: Number(user_id),
    };
    return next();
  } catch {
    throw new AppError("Token invalido", 401);
  }
}

module.exports = ensureAutheticiy;
