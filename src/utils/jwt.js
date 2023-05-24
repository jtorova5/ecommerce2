
const jwt = require('jsonwebtoken');
const { PRIVATE_KEY_JWT } = require('../config/config');
const BdSessionManager = require('../dao/mongoManager/BdSessionManager');

const generateToken = (payload) => {
  const token = jwt.sign({ payload }, PRIVATE_KEY_JWT, { expiresIn: '1h' });
  return token;
}

const getPayload = (req, res, next) => {
  const headerAuth = req.headers.authorization;
  if (!headerAuth) {
    res.status(403).sed({ error: 'token inexistente' });
  }
  const token = headerAuth.split(' ')[1];
  if (token) {
    jwt.verify(token, PRIVATE_KEY_JWT, async (error, credential) => {
      if (error) {
        res.status(403).send({ error: 'error inesperado', description: error });
      } else {
        const user = await BdSessionManager.UserSession(credential.payload.id);
        req.payload = user;
        next();
      }
    });
  } else {
    res.status(401).send({ error: 'no se encontro token' });
  }
}

const getPayloadByCookie = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(403).send({ error: 'token inexistente' });
  }
  if (token) {
    jwt.verify(token, PRIVATE_KEY_JWT, async (error, credential) => {
      if (error) {
        res.status(403).send({ error: 'error inesperado', description: error });
      } else {
        const user = await BdSessionManager.UserSession(credential.payload.id);
        req.payload = user;
        next();
      }
    });
  } else {
    res.status(401).send({ error: 'no se encontro token' });
  }
}

module.exports = {generateToken, getPayload, getPayloadByCookie,}