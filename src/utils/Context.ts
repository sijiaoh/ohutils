import {NextApiRequest, NextApiResponse} from 'next';
import nookies from 'nookies';
import {UserEntity} from 'src/database/entities';

export type Request = Omit<NextApiRequest, 'cookies'> & {
  cookies: {[key: string]: string | undefined};
  user?: UserEntity;
};

export type Response = NextApiResponse & {
  /** Default maxAge is 30 days. */
  cookie: (
    name: string,
    value: string,
    options?: Parameters<typeof nookies.set>[3]
  ) => void;
};

export interface Context {
  req: Request;
  res: Response;
}
