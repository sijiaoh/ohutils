import path from 'path';
import {buildSchema} from 'src/graphql/buildSchema';
import {projectCwd} from 'src/utils/projectCwd';

buildSchema({
  emitSchemaFile: path.join(projectCwd, 'generated', 'schema.graphql'),
});
