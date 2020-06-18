const { ApolloServer } = require('apollo-server-express');
const express = require('express');

const SessionAPI = require('./datasources/sessions');
const SpeakerAPI = require('./datasources/speakers');

const typeDefs = require('./schema.js');
const resolvers = require('./resolvers/index');

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const getUser = (token) => {
  jwt.verify(token)
  return '381b010e-f51d-4fca-a249-271f72a6a5b9';
};

const dataSources = () => ({
  sessionAPI: new SessionAPI(),
  speakerAPI: new SpeakerAPI(),
});
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req }) => {
    const token = req.headers.authorization || '';

    // try to retrieve a user with the token
    const user = getUser(token);

    // optionally block the user
    // we could also check user roles/permissions here
    if (!user) throw new AuthenticationError('you must be logged in');

    // add the user to the context
    return { user };
  },
});

const app = express()

// server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
//   console.log(`graphQL running at ${url}`);
// });

var corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true // <-- REQUIRED backend setting
};

app.use(cors(corsOptions));
app.use(cookieParser());

server.applyMiddleware({
  app,
  path: '/',
  cors: false, // disables the apollo-server-express cors to allow the cors middleware use
})

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);