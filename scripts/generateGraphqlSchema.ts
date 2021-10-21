import path from 'path';
import {buildSchema} from 'src/graphql/buildSchema';

const projectCwd = process.env.PROJECT_CWD;
if (!projectCwd) throw new Error('Do not exec script directly.');

buildSchema({
  emitSchemaFile: path.join(projectCwd, 'generated', 'schema.graphql'),
});
