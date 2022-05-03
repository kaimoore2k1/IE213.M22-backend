import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageProductionDefault, AuthenticationError } from 'apollo-server-core';
import { accountTypeDefs } from '../schema/account.schema';
import { accountResolvers } from '../resolvers/account.resolver'
import {productResolvers} from '../resolvers/product.resolver'
import {productTypeDefs} from '../schema/product.schema'
import {adminResolvers} from '../resolvers/admin.resolver'
import {adminTypeDefs} from '../schema/admin.schema'


dotenv.config();

async function startApolloServer() { 
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: [accountTypeDefs, productTypeDefs, adminTypeDefs],
    resolvers: [accountResolvers, productResolvers, adminResolvers],
    context: ({ req, res }) => {
      const authHeader = req.headers.authorization || '';
      const accessToken = authHeader && authHeader.split(' ')[1]

      return { req, res, accessToken}
    },
    plugins: [process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault()
      : ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await server.start();
  server.applyMiddleware({
    app,
    path: '/'
  });
  // Modified server startup
  await new Promise<void>(resolve => httpServer.listen({ port: process.env.PORT || 8000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer()