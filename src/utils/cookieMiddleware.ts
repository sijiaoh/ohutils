import nookies from 'nookies';
import {Middleware} from 'src/utils/Middleware';

export const cookieMiddleware: Middleware = (req, res, next) => {
  res.cookie = (name, value, options?: Parameters<typeof nookies.set>[3]) => {
    req.cookies[name] = value;
    nookies.set({res}, name, value, {
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
      ...options,
    });
  };
  res.clearCookie = name => {
    delete req.cookies[name];
    nookies.destroy({res}, name);
  };
  next();
};
