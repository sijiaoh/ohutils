import {NextApiRequest, NextApiResponse} from 'next';
import nookies from 'nookies';

export type Request = Omit<NextApiRequest, 'cookies'> & {
  cookies: {[key: string]: string | undefined};
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
