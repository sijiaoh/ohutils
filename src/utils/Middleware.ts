import {RequestHandler} from 'next-connect';
import {Request, Response} from './Context';

export type Middleware = RequestHandler<Request, Response>;
