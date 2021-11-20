import type {User} from '@prisma/client';
import type {NextApiRequest, NextApiResponse} from 'next';
import type nookies from 'nookies';

export type Request = NextApiRequest & {
  user?: User;
};

export type Response = NextApiResponse & {
  /** Default maxAge is 30 days. */
  cookie: (
    name: string,
    value: string,
    options?: Parameters<typeof nookies.set>[3]
  ) => void;
  clearCookie: (name: string) => void;
};

export interface Context {
  req: Request;
  res: Response;
}
