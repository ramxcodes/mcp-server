import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";

const handler = createMcpHandler(
  (server) => {
    server.tool(
      "courseRecommender",
      "Recommend courses based on the user's interests",
      {
        experienceLevel: z.enum(["beginner", "intermediate"]),
      },
      async ({ experienceLevel }) => ({
        content: [
          {
            type: "text",
            text: `I recommend you take the ${
              experienceLevel === "beginner" ? "Beginner JS" : "Nextjs"
            } course`,
          },
        ],
      })
    );
  },
  {
    capabilities: {
      tools: {
        courseRecommender: {
          description: "Recommend courses based on the user's interests",
        },
      },
    },
  },
  {
    redisUrl: process.env.REDIS_URL,
    sseEndpoint: "/sse",
    streamableHttpEndpoint: "/mcp",
    verboseLogs: true,
    maxDuration: 60,
  }
);

export { handler as GET, handler as POST, handler as DELETE };
