import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../resolvers';
import { GraphQLSchema } from 'graphql';
import { schema } from './schema.graphql';

const gqlSchema: GraphQLSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default gqlSchema;
