import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageProductionDefault } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import jwt,{ Secret } from 'jsonwebtoken';
import 'reflect-metadata';
import refreshTokenRouter from '../routes/refreshTokenRouter';
import { accountTypeDefs } from '../schema/account.schema';
import { accountResolvers } from '../resolvers/account.resolver';
import { commentTypeDefs } from '../schema/comment.schema';
import { commentResolvers } from '../resolvers/comment.resolver';
import {productResolvers} from '../resolvers/product.resolver';
import {productTypeDefs} from '../schema/product.schema';
import {adminResolvers} from '../resolvers/admin.resolver';
import {adminTypeDefs} from '../schema/admin.schema';
import {blogResolvers} from '../resolvers/blog.resolver';
import {blogTypeDefs} from '../schema/blog.schema';




dotenv.config();

async function startApolloServer() { 
  const app = express();
  
  // app.use(cors({origin: 'https://senshop.tech/', credentials: true}))
  app.use(cors({origin: 'http://localhost:3000', credentials: true}))
  //Sử dụng cookie Parser
  app.use(cookieParser());

  //http://localhost:4000/refresh_token
  app.use('/refresh_token', refreshTokenRouter);

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: [accountTypeDefs, productTypeDefs, adminTypeDefs,commentTypeDefs,blogTypeDefs],
    resolvers: [accountResolvers, productResolvers, adminResolvers,commentResolvers,blogResolvers],
    context: ({ req, res }) => {
      const authHeader = req.headers.authorization || '';
      const accessToken = authHeader && authHeader.split(' ')[1]
      const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE_NAME as string];


      return { req, res, accessToken, refreshToken}
    },
    plugins: [process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault()
      : ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await server.start();
  server.applyMiddleware({
    app,
    path: '/',
    // cors: { origin: 'https://senshop.tech/', credentials: true },
    cors: { origin: 'http://localhost:3000', credentials: true }
  });

  const PORT = process.env.PORT || 8000
  // Modified server startup
  await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer()