import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './types.js';
import { resolvers } from './resolvers.js';
(async function () {
    //create a new instance of the ApolloServer
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 }
    });
    console.log(`Server ready at ${url}`);
})();
