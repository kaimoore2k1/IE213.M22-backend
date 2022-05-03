"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const account_schema_1 = require("../schema/account.schema");
const account_resolver_1 = require("../resolvers/account.resolver");
const product_resolver_1 = require("../resolvers/product.resolver");
const product_schema_1 = require("../schema/product.schema");
dotenv_1.default.config();
async function startApolloServer() {
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: [account_schema_1.accountTypeDefs, product_schema_1.productTypeDefs],
        resolvers: [account_resolver_1.accountResolvers, product_resolver_1.productResolvers],
        context: ({ req, res }) => {
            const authHeader = req.headers.authorization || '';
            const accessToken = authHeader && authHeader.split(' ')[1];
            return { req, res, accessToken };
        }/* ,
        plugins: [process.env.NODE_ENV === 'production'
                ? (0, apollo_server_core_1.ApolloServerPluginLandingPageProductionDefault)()
                : (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()], */
    });
    await server.start();
    server.applyMiddleware({
        app,
        path: '/'
    });
    // Modified server startup
    await new Promise(resolve => httpServer.listen({ port: process.env.PORT || 8000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer();
