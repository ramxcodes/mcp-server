import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";
import { appwriteTools } from "../../lib/tools/appwrite";

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
            type: "text" as const,
            text: `I recommend you take the ${
              experienceLevel === "beginner" ? "Beginner JS" : "Nextjs"
            } course`,
          },
        ],
      })
    );

    server.tool(
      "getDocument",
      "Get a document by its unique ID from the Appwrite database",
      {
        documentId: z
          .string()
          .describe("The unique ID of the document to retrieve"),
        collectionId: z
          .string()
          .optional()
          .describe("The collection ID (defaults to 'company_names')"),
      },
      async ({ documentId, collectionId }) => {
        return await appwriteTools.getDocument.handler({
          documentId,
          collectionId,
        });
      }
    );

    server.tool(
      "listDocuments",
      "List all documents from the companies collection",
      {
        collectionId: z
          .string()
          .optional()
          .describe("The collection ID (defaults to 'company_names')"),
        limit: z
          .number()
          .optional()
          .describe("Maximum number of documents to return (defaults to 25)"),
      },
      async ({ collectionId, limit }) => {
        return await appwriteTools.listDocuments.handler({
          collectionId,
          limit,
        });
      }
    );
  },
  {
    capabilities: {
      tools: {
        courseRecommender: {
          description: "Recommend courses based on the user's interests",
        },
        getDocument: {
          description:
            "Get a document by its unique ID from the Appwrite database",
        },
        listDocuments: {
          description: "List all documents from the companies collection",
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
