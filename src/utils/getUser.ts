import {Request} from './Context';

export const getUser = (req: Request) => {
  const user = req.user;
  if (!user) throw new Error('req.user is falsy.');
  return user;
};
