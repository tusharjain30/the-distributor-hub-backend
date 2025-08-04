import { RESPONSE_CODES, RESPONSE_MESSAGES } from '../../config/constants.js';
import { userDetail } from '../services/api_v_1/user.service.js';
import { verifyToken } from './jwt.js';
import { initLogger, logInfo } from './logger.js';

export const authMiddleWare = async (req, res, next) => {
  try {
    initLogger();
    const ignorePaths = [
      '/api_v_1/users/register',
      '/api_v_1/users/login',
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
    req.userId = logObj.user.userId;
    logInfo('Activity Log: ', logObj);
    return next();
  }
  catch (error) {
    return res.status(RESPONSE_CODES.UNAUTHORIZED).json({ error: error.message });
  };
};

export const authorizeMiddleware = (roles = []) => {
  try {
    let response = {
      status: 0,
      message: "",
      statusCode: RESPONSE_CODES.GET,
      data: {}
    };
    if (typeof roles === "string") {
      roles = [roles];
    };

    return async (req, res, next) => {
      const user_info = await userDetail({ type: "limited_detail", _id: req.userId });
      if (!user_info.status) {
        response = {
          status: 0,
          message: RESPONSE_MESSAGES.USER_NOT_FOUND,
          statusCode: RESPONSE_CODES.NOT_FOUND,
          data: {}
        };
        return res.status(RESPONSE_CODES.UNAUTHORIZED).json(response);
      };
      const { role } = user_info.data;
      if (roles.length && !roles.includes(role)) {
        response = {
          status: 0,
          message: `${role} not allowed to access this resouce.`,
          statusCode: RESPONSE_CODES.UNAUTHORIZED,
          data: {}
        };
        return res.status(RESPONSE_CODES.UNAUTHORIZED).json(response);
      };
      next();
    };
  } catch {
    return res.status(RESPONSE_CODES.UNAUTHORIZED).json({ error: error.message });
  };
};