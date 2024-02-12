import { FastifyInstance } from "fastify";
import { z } from "zod";
import { voting } from "../../utils/voting-pub-sub";

export async function pollResults(app: FastifyInstance) {
  app.get(
    "/polls/:pollId/results",
    { websocket: true },
    async (connection, request) => {
      // inscrever apenas nas mensagens publicadas no canal com o ID da enquete (`pollId`)

      const getPollParams = z.object({
        pollId: z.string().uuid(),
      });

      const { pollId } = getPollParams.parse(request.params);

      voting.subscribe(pollId, (message) => {
        connection.socket.send(JSON.stringify(message));
      });
    }
  );
}

// Pattern Pub/Sub (Publish/Subscribe)
//  - The server will be responsible for publishing the poll results to all connected clients.
//  - The clients will be responsible for subscribing to the poll results and updating the UI accordingly.
