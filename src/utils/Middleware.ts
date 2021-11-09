import type {Middleware as BaseMiddleware} from 'next-connect';
import type {Request, Response} from './Context';

export type Middleware = BaseMiddleware<Request, Response>;
