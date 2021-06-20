import { IResolvers } from 'graphql-tools';
import { SotresResolver } from './stores.resolver';

const sotresResolver = new SotresResolver();

const resolvers: IResolvers = {
  Query: {
    ...sotresResolver.resolvers(),
  },
};

export default resolvers;
