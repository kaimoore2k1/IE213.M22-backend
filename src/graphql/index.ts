import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageProductionDefault } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import jwt, { Secret } from 'jsonwebtoken';
import 'reflect-metadata';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
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
import {billTypeDefs} from '../schema/bill.schema'
import {billResolver} from '../resolvers/bill.resolver'
import {userTypeDefs} from '../schema/user.schema'
import {userResolvers} from '../resolvers/user.resolver'
import { contactTypeDefs } from '../schema/contact.schema';
import { contactResolver } from '../resolvers/contact.resolver';
import { userTypeDefs } from '../schema/user.schema';
import { userResolvers } from '../resolvers/user.resolver';

dotenv.config();

async function startApolloServer() { 
  const app = express();
  
  // //Đăng kí dịch dụ login facebook
  // passport.use(new FacebookStrategy({
  //   clientID: '384196866810992',
  //   clientSecret: 'a22f6b2ff7eb6213ca40f055f25408ec',
  //   callbackURL: "http://localhost:3000/auth/facebook/callback"
  // },
  // function(accessToken, refreshToken, profile, cb) {
  //   // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
  //   //   return cb(err, user);
  //   // });
  // }
  // ));


  // app.use(cors({origin: 'https://senshop.tech/', credentials: true}))
  app.use(cors({origin: 'http://localhost:3000', credentials: true}))
  //Sử dụng cookie Parser
  app.use(cookieParser());

	// app.use(cors({origin: 'https://senshop.tech/', credentials: true}))
	app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
	//Sử dụng cookie Parser
	app.use(cookieParser());

	//http://localhost:4000/refresh_token
	app.use('/refresh_token', refreshTokenRouter);

	const httpServer = http.createServer(app);

	const server = new ApolloServer({
		typeDefs: [accountTypeDefs, productTypeDefs, adminTypeDefs, commentTypeDefs, blogTypeDefs, bookingTypeDefs, contactTypeDefs, billTypeDefs, userTypeDefs],
		resolvers: [accountResolvers, productResolvers, adminResolvers, commentResolvers, blogResolvers, bookingResolver, contactResolver, billResolver, userResolvers],
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
