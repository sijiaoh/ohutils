import {NextApiRequest, NextApiResponse} from 'next';
import nookies from 'nookies';

export type Request = NextApiRequest;

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
