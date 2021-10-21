import {BuildSchemaOptions, buildSchemaSync, NonEmptyArray} from 'type-graphql';
import * as resolvers from './resolvers';

export const buildSchema = (options?: Partial<BuildSchemaOptions>) => {
  return buildSchemaSync({
    resolvers: Object.values(resolvers) as unknown as NonEmptyArray<Function>,
    ...options,
  });
};
