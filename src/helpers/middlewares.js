import { RESPONSE_CODES } from '../../config/constants.js';
import { verifyToken } from './jwt.js';
import { initLogger, logInfo } from './logger.js';

export const authMiddleWare = async (req, res, next) => {
  try {
    initLogger();
    const ignorePaths = [
      '/api_v_1/admins/register',
      '/api_v_1/admins/login',
    ];

    const {
      method,
      headers,
      originalUrl
    } = req;

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const logObj = {
      ip,
      headers: req.headers,
      method: req.method,
      url: req.originalUrl,
      timestamp: Date.now()
    };

    // if ((method === 'POST')) {
    //   logInfo('Activity Log: ', logObj);
    //   // ignoring register URL
    //   return next();
    // }

    const ignoreIndex = ignorePaths.findIndex(item => item === originalUrl);
    if (ignoreIndex > -1) {
      logInfo('Activity Log: ', logObj);
      return next();
    }

    if (!headers.authorization) {
      logInfo('Activity Log: ', logObj);
      return res.status(RESPONSE_CODES.UNAUTHORIZED).json({ error: 'Missing auth token' });
    }

    logObj.user = verifyToken(headers.authorization);
    console.log(logObj.user._id)
    req.adminId = logObj.user.adminId;
    logInfo('Activity Log: ', logObj);
    return next();
  }
  catch (error) {
    return res.status(RESPONSE_CODES.UNAUTHORIZED).json({ error: error.message });
  };
};
