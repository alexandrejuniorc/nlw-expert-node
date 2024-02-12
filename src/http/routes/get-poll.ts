import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { redis } from "../../lib/redis";

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

      if (!poll) {
        return reply.status(400).send({ message: "Poll not found" });
      }

      const result = await redis.zrange(pollId, 0, -1, "WITHSCORES"); // get the poll options and their scores

      const votes = result.reduce((object, line, index) => {
        if (index % 2 === 0) {
          const score = result[index + 1];
          Object.assign(object, { [line]: Number(score) });
        }

        return object;
      }, {} as Record<string, number>);

      return reply.status(200).send({
        poll: {
          id: poll.id,
          title: poll.title,
          options: poll.options.map((option) => ({
            id: option.id,
            title: option.title,
            score: option.id in votes ? votes[option.id] : 0,
          })),
        },
      });
    }
  );
}
