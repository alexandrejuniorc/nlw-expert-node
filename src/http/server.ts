import { PrismaClient } from "@prisma/client";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

// create a new fastify server for handling HTTP requests
const app = fastify();

// create a new Prisma client for database access
const prisma = new PrismaClient()

app.post("/polls", async (request: FastifyRequest, reply: FastifyReply) => {
    // validate the request body with zod
    const createPollBody = z.object({
        title: z.string()
    })

    // parse the request body or throw an error
    const { title } = createPollBody.parse(request.body);

    // create a new poll in the database
    const poll = await prisma.poll.create({
        data: {
            title
        }
    })

    return reply.status(201).send({ pollId: poll.id });
})

// start the server for incoming HTTP requests
app.listen({ port: 3333 }).then(() => {
    console.log("HTTP server running!");
})