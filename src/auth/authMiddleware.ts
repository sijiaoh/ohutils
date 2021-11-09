import {createSession} from './createSession';
import {UserEntity} from 'src/database/entities';
import type {Middleware} from 'src/utils/Middleware';

export const authMiddleware: Middleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return;

    const user = await UserEntity.findOne({where: {token}});
    // Invalid token.
    if (!user) {
      res.clearCookie('token');
      return;
    }

    createSession(res, user);
    req.user = user;
  } finally {
    next();
  }
};
