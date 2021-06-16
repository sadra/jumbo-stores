import { IResolvers } from 'graphql-tools';
import storesResolver from './stores.resolver';

const resolvers: IResolvers = {
  Query: {
    ...storesResolver,
  },
};

export default resolvers;
