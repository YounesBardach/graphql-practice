import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';
import { typeDefs, resolvers } from './schema.js';

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => ({ prisma })
});

console.log(`🚀 GraphQL ready at ${url}`);
console.log(`Try opening that URL in your browser to use Apollo Sandbox.`);