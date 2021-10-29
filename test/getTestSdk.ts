import express from 'express';
import {print} from 'graphql';
import request, {SuperAgentTest} from 'supertest';
import {getSdk} from './generated/generic-sdk';
import {getGraphqlHandler} from 'src/graphql/getGraphqlHandler';

export const getTestSdk = (agent?: SuperAgentTest) => {
  const app = express();
  app.post('/api/graphql', (req, res, next) => {
    void getGraphqlHandler()(req, res).then(next).catch(next);
  });

  const ag = agent || request.agent(app);

  return getSdk(async (doc, vars) => {
    const res = await ag
      .post('/api/graphql')
      .send({query: print(doc), variables: vars});
    if (res.error) throw res.error;
    return res.body.data;
  });
};
