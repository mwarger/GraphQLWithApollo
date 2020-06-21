const { ApolloServer } = require("apollo-server");
const SessionAPI = require("./datasources/sessions");
const SpeakerAPI = require("./datasources/speakers");
const UserService = require("./datasources/users");

const typeDefs = require("./schema.js");
const resolvers = require("./resolvers/index");

const dataSources = () => ({
  sessionAPI: new SessionAPI(),
  speakerAPI: new SpeakerAPI(),
  userService: new UserService(),
});
const server = new ApolloServer({ typeDefs, resolvers, dataSources });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`graphQL running at ${url}`);
});
