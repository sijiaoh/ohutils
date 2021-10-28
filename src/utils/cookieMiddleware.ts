import nookies from 'nookies';
import {Middleware} from 'src/utils/Middleware';

export const cookieMiddleware: Middleware = (req, res, next) => {
  res.cookie = (name, value, options?: Parameters<typeof nookies.set>[3]) => {
    nookies.set({res}, name, value, {
      maxAge: 30 * 24 * 60 * 60,
      ...options,
    });
  };
  next();
};
