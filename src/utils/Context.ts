import type {NextApiRequest, NextApiResponse} from 'next';
import type nookies from 'nookies';
import type {UserEntity} from 'src/database/entities';

export type Request = NextApiRequest & {
  user?: UserEntity;
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
