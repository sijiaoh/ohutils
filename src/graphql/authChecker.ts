import {AuthChecker} from 'type-graphql';
import {Context} from 'src/utils/Context';

export const authChecker: AuthChecker<Context> = ({context}, roles) => {
  return !!context.req.user && roles.length === 0;
};
