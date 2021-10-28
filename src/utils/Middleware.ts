import {NextApiRequest, NextApiResponse} from 'next';
import {Middleware as BaseMiddleware} from 'next-connect';

export type Middleware = BaseMiddleware<NextApiRequest, NextApiResponse>;
