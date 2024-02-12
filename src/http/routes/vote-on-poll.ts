import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function voteOnPoll(app: FastifyInstance) {
  app.post(
    "/polls/:pollId/votes",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // validate the request body for the poll id
      const voteOnPollBody = z.object({
        pollOptionId: z.string().uuid(),
      });

      // validate the request params for the poll id
      const voteOnPollParams = z.object({
        pollId: z.string().uuid(),
      });

      const { pollOptionId } = voteOnPollBody.parse(request.body); // parse the request body or throw an error
      const { pollId } = voteOnPollParams.parse(request.params); // parse the request params or throw an error

      let { sessionId } = request.cookies;

      if (sessionId) {
        const userPreviousVoteOnPoll = await prisma.vote.findUnique({
          where: {
            sessionId_pollId: {
              sessionId,
              pollId,
            },
          },
        });

        if (
          userPreviousVoteOnPoll &&
          userPreviousVoteOnPoll.pollOptionId !== pollOptionId
        ) {
          // delete the previous vote and create a new one
          await prisma.vote.delete({
            where: {
              id: userPreviousVoteOnPoll.id,
            },
          });
        } else if (userPreviousVoteOnPoll) {
          return reply.status(400).send({
            message: "You already voted on this poll",
          });
        }
      }

      if (!sessionId) {
        const sessionId = randomUUID();

        reply.setCookie("sessionId", sessionId, {
          path: "/", // the cookie is valid for all routes
          maxAge: 60 * 60 * 24 * 7, // 1 week
          signed: true, // the cookie is signed
          httpOnly: true, // the cookie cannot be accessed by JavaScript
        });
      }

      await prisma.vote.create({
        data: {
          sessionId: sessionId || "", // Assign an empty string if sessionId is undefined
          pollId,
          pollOptionId,
        },
      });

      return reply.status(201).send();
    }
  );
}
