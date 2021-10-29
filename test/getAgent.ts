import express from 'express';
import request from 'supertest';
import {getGraphqlHandler} from 'src/graphql/getGraphqlHandler';

export const getAgent = () => {
  const app = express();
  app.post('/api/graphql', (req, res, next) => {
    void getGraphqlHandler()(req, res).then(next).catch(next);
  });

  return request.agent(app);
};
