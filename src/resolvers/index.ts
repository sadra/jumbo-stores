import { StoreRepository } from './../database/Store.repository';
import { IResolvers } from 'graphql-tools';
import { SotresResolver } from './stores.resolver';

const storeRepository = new StoreRepository();
const sotresResolver = new SotresResolver(storeRepository);

const resolvers: IResolvers = {
  Query: {
    ...sotresResolver.resolvers(),
  },
};

export default resolvers;
