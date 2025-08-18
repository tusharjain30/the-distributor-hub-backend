import moment from 'moment-timezone';
import { RESPONSE_CODES, RESPONSE_MESSAGES } from '../../config/constants.js';
import { getUserDetails } from '../services/api_v_1/user.service.js';
import { verifyToken } from './jwt.js';
import { initLogger, logInfo } from './logger.js';
import { RESPONSE } from "./response.js";

export const authMiddleWare = async (req, res, next) => {
  try {
    initLogger();
    const ignorePaths = [
      '/api_v_1/user/register',
      '/api_v_1/user/login',
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
      timestamp: parseInt(moment().tz(process.env.TIMEZONE).format("x"))
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
    };

    if (!headers.authorization) {
      logInfo('Activity Log: ', logObj);
      return res.status(RESPONSE_CODES.UNAUTHORIZED).json({ error: 'Missing auth token' });
    };

    logObj.user = verifyToken(headers.authorization);
    req.user = logObj.user;
    logInfo('Activity Log: ', logObj);
    return next();
  }
  catch (error) {
    return res.status(RESPONSE_CODES.UNAUTHORIZED).json({ error: error.message });
  };
};

export const authorizeRoles = (role = "") => {
  try {
    let response = RESPONSE;

    return async (req, res, next) => {
      const user = req.user;
      const payload = { queryType: "limited_detail", userId: user._id };
      const user_info = await getUserDetails(payload);
      if (!user_info.status) {
        response = {
          status: 0,
          message: RESPONSE_MESSAGES.USER_NOT_FOUND,
          statusCode: RESPONSE_CODES.NOT_FOUND,
          data: {}
        };
        return res.status(RESPONSE_CODES.UNAUTHORIZED).json(response);
      };
      if (user.role !== role || user_info.data.role !== role) {
        response = {
          status: 0,
          message: `${user.role} not allowed to access this resource.`,
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