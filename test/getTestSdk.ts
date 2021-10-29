import {print} from 'graphql';
import {SuperAgentTest} from 'supertest';
import {getSdk} from './generated/generic-sdk';
import {getAgent} from './getAgent';

export const getTestSdk = (agent?: SuperAgentTest) => {
  agent = agent || getAgent();

  return getSdk(async (doc, vars) => {
    const res = await agent!
      .post('/api/graphql')
      .send({query: print(doc), variables: vars});

    if (res.body.errors) throw res.body.errors;
    if (res.error) throw res.error;

    return res.body.data;
  });
};
