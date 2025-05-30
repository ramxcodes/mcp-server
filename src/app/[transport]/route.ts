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

    server.tool(
      "createDocument",
      "Create a new document in the Appwrite database",
      {
        company_name: z.string().describe("The name of the company"),
        company_id: z
          .string()
          .describe("The unique identifier for the company"),
        documentId: z
          .string()
          .optional()
          .describe(
            "Optional custom document ID (auto-generated if not provided)"
          ),
        collectionId: z
          .string()
          .optional()
          .describe("The collection ID (defaults to 'company_names')"),
      },
      async ({ company_name, company_id, documentId, collectionId }) => {
        return await appwriteTools.createDocument.handler({
          company_name,
          company_id,
          documentId,
          collectionId,
        });
      }
    );

    server.tool(
      "updateDocument",
      "Update an existing document in the Appwrite database",
      {
        documentId: z
          .string()
          .describe("The unique ID of the document to update"),
        company_name: z
          .string()
          .optional()
          .describe("The name of the company (optional)"),
        company_id: z
          .string()
          .optional()
          .describe("The unique identifier for the company (optional)"),
        collectionId: z
          .string()
          .optional()
          .describe("The collection ID (defaults to 'company_names')"),
      },
      async ({ documentId, company_name, company_id, collectionId }) => {
        return await appwriteTools.updateDocument.handler({
          documentId,
          company_name,
          company_id,
          collectionId,
        });
      }
    );

    server.tool(
      "deleteDocument",
      "Delete a document from the Appwrite database",
      {
        documentId: z
          .string()
          .describe("The unique ID of the document to delete"),
        collectionId: z
          .string()
          .optional()
          .describe("The collection ID (defaults to 'company_names')"),
      },
      async ({ documentId, collectionId }) => {
        return await appwriteTools.deleteDocument.handler({
          documentId,
          collectionId,
        });
      }
    );

    server.tool(
      "upsertDocument",
      "Create or update a document in the Appwrite database (upsert operation)",
      {
        documentId: z
          .string()
          .describe("The unique ID of the document to create or update"),
        company_name: z.string().describe("The name of the company"),
        company_id: z
          .string()
          .describe("The unique identifier for the company"),
        collectionId: z
          .string()
          .optional()
          .describe("The collection ID (defaults to 'company_names')"),
      },
      async ({ documentId, company_name, company_id, collectionId }) => {
        return await appwriteTools.upsertDocument.handler({
          documentId,
          company_name,
          company_id,
          collectionId,
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
        createDocument: {
          description: "Create a new document in the Appwrite database",
        },
        updateDocument: {
          description: "Update an existing document in the Appwrite database",
        },
        deleteDocument: {
          description: "Delete a document from the Appwrite database",
        },
        upsertDocument: {
          description:
            "Create or update a document in the Appwrite database (upsert operation)",
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
