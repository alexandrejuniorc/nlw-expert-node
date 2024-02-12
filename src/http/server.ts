import fastifyCookie from "@fastify/cookie";
import fastify from "fastify";
import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";

// create a new fastify server for handling HTTP requests
const app = fastify();

app.register(fastifyCookie, {
  secret: "polls-app-nlw", // set a secret to sign the cookie
  hook: "onRequest", // set the cookie on every request
  parseOptions: {}, // options for parsing the cookie header
});

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);

// start the server for incoming HTTP requests
app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
