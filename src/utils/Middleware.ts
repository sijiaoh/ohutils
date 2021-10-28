import {Middleware as BaseMiddleware} from 'next-connect';
import {Request, Response} from './Context';

export type Middleware = BaseMiddleware<Request, Response>;
