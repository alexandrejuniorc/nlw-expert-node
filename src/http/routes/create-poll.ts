import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function createPoll(app: FastifyInstance) {
  app.post("/polls", async (request: FastifyRequest, reply: FastifyReply) => {
    // validate the request body with zod
    const createPollBody = z.object({
      title: z.string(),
      options: z.array(z.string()),
    });

    // parse the request body or throw an error
    const { title, options } = createPollBody.parse(request.body);

    // create a new poll in the database
    const poll = await prisma.poll.create({
      data: {
        title,
        // create poll options in the database for the poll
        options: {
          createMany: {
            data: options.map((option) => ({
              title: option,
            })),
          },
        },
      },
    });

    return reply.status(201).send({ pollId: poll.id });
  });
}
