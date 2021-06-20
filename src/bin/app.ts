import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import schema from '../schema';

export const app = express();

const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  tracing: process.env.NODE_ENV === 'production' ? false : true,
});

app.use(cors());

server.applyMiddleware({ app, path: '/graphql' });
