import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function getPoll(app: FastifyInstance) {
  app.get(
    "/polls/:pollId",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // validate the request body for the poll id
      const getPollParams = z.object({
        pollId: z.string().uuid(),
      });

      // parse the request body or throw an error
      const { pollId } = getPollParams.parse(request.params);

      // find the poll by id and include the options
      const poll = await prisma.poll.findUnique({
        where: {
          id: pollId,
        },
        include: {
          options: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });

      return reply.status(200).send({ poll });
    }
  );
}
