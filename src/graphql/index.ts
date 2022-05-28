import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageProductionDefault } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import jwt, { Secret } from 'jsonwebtoken';
import 'reflect-metadata';
import passport from 'passport';
import { facebookPassportConfig, googlePassportConfig } from '../utils/passport'
import { facebookAuth } from '../utils/socialProvidersAuth';
import authRoute from '../routes/auth'
import refreshTokenRouter from '../routes/refreshTokenRouter';
import { accountTypeDefs } from '../schema/account.schema';
import { accountResolvers } from '../resolvers/account.resolver';
import { commentTypeDefs } from '../schema/comment.schema';
import { commentResolvers } from '../resolvers/comment.resolver';
import { productResolvers } from '../resolvers/product.resolver';
import { productTypeDefs } from '../schema/product.schema';
import { blogResolvers } from '../resolvers/blog.resolver';
import { blogTypeDefs } from '../schema/blog.schema';
import { adminResolvers } from '../resolvers/admin.resolver';
import { adminTypeDefs } from '../schema/admin.schema';
import { bookingTypeDefs } from '../schema/booking.schema';
import { bookingResolver } from '../resolvers/booking.resolver';
import session from 'express-session';

import Accounts from '../model/Accounts';

dotenv.config();


async function startApolloServer() { 
  const app = express();
  
//   app.use(
// 	cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
//   );

	app.use(session({
		secret: 'session',
		resave: false,
		saveUninitialized: true,
		// cookie: { secure: false }
		cookie: { maxAge: 60 * 60 * 1000 }
	}))

  //Khởi tạo chế độ của passport
  app.use(passport.initialize());
  //Lưu data trong session
  app.use(passport.session());
	
  facebookPassportConfig()
	googlePassportConfig()



 
  	
  


	app.use('/auth', authRoute)
	passport.serializeUser<any, any>((req, user, done) => {
		done(null, user);
	  });
	  
	  passport.deserializeUser<any,any>((user, done) => {
		done(null, user);
	  });

	
	
  // app.use(cors({origin: 'https://senshop.tech/', credentials: true}))
  app.use(cors({origin: 'http://localhost:3000', credentials: true, optionsSuccessStatus: 200}))
  //Sử dụng cookie Parser
  app.use(cookieParser());
	
	//http://localhost:4000/refresh_token
	app.use('/refresh_token', refreshTokenRouter);

	const httpServer = http.createServer(app);

	const server = new ApolloServer({
		typeDefs: [accountTypeDefs, productTypeDefs, adminTypeDefs, commentTypeDefs, blogTypeDefs, bookingTypeDefs],
		resolvers: [accountResolvers, productResolvers, adminResolvers, commentResolvers, blogResolvers, bookingResolver],
		context: ({ req, res }) => {
			const authHeader = req.headers.authorization || '';
			const accessToken = authHeader && authHeader.split(' ')[1];
			const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE_NAME as string];

			return { req, res, accessToken, refreshToken };
		},
		plugins: [process.env.NODE_ENV === 'production' ? ApolloServerPluginLandingPageProductionDefault() : ApolloServerPluginLandingPageGraphQLPlayground()]
	});
	await server.start();
	server.applyMiddleware({
		app,
		path: '/',
		// cors: { origin: 'https://senshop.tech/', credentials: true },
		cors: { origin: 'http://localhost:3000', credentials: true }
	});

	const PORT = process.env.PORT || 8000;
	// Modified server startup
	await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
