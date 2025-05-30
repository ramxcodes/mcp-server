import { Client, Databases } from "node-appwrite";
import { z } from "zod";

const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY;
const DATABASE_ID = process.env.DATABASE_ID;

console.log("Appwrite Environment Variables:");
console.log("APPWRITE_ENDPOINT:", APPWRITE_ENDPOINT);
console.log("APPWRITE_PROJECT_ID:", APPWRITE_PROJECT_ID);
console.log("APPWRITE_API_KEY:", APPWRITE_API_KEY ? "***SET***" : "NOT SET");
console.log("DATABASE_ID:", DATABASE_ID);

const client = new Client();

if (APPWRITE_ENDPOINT && APPWRITE_PROJECT_ID && APPWRITE_API_KEY) {
  client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID)
    .setKey(APPWRITE_API_KEY);
} else {
  console.error("Missing required Appwrite environment variables");
}

const databases = new Databases(client);

export const appwriteTools = {
  getDocument: {
    name: "getDocument",
    description: "Get a document by its unique ID from the Appwrite database",
    schema: {
      documentId: z
        .string()
        .describe("The unique ID of the document to retrieve"),
      collectionId: z
        .string()
        .optional()
        .describe("The collection ID (defaults to 'company_names')"),
    },
    handler: async ({
      documentId,
      collectionId = "company_names",
    }: {
      documentId: string;
      collectionId?: string;
    }) => {
      try {
        if (!DATABASE_ID) {
          throw new Error("DATABASE_ID environment variable is not set");
        }

        console.log(
          `Fetching document with ID: ${documentId} from collection: ${collectionId}`
        );

        const document = await databases.getDocument(
          DATABASE_ID,
          collectionId,
          documentId
        );

        console.log("Document retrieved successfully:", document);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: true,
                  document: {
                    id: document.$id,
                    createdAt: document.$createdAt,
                    updatedAt: document.$updatedAt,
                    company_name: document.company_name,
                    company_id: document.company_id,
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        console.error("Error fetching document:", error);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: false,
                  error:
                    error instanceof Error
                      ? error.message
                      : "Unknown error occurred",
                },
                null,
                2
              ),
            },
          ],
        };
      }
    },
  },

  listDocuments: {
    name: "listDocuments",
    description: "List all documents from the companies collection",
    schema: {
      collectionId: z
        .string()
        .optional()
        .describe("The collection ID (defaults to 'company_names')"),
      limit: z
        .number()
        .optional()
        .describe("Maximum number of documents to return (defaults to 25)"),
    },
    handler: async ({
      collectionId = "company_names",
      limit = 25,
    }: {
      collectionId?: string;
      limit?: number;
    }) => {
      try {
        if (!DATABASE_ID) {
          throw new Error("DATABASE_ID environment variable is not set");
        }

        console.log(
          `Listing documents from collection: ${collectionId} with limit: ${limit}`
        );

        const documents = await databases.listDocuments(
          DATABASE_ID,
          collectionId,
          []
        );

        console.log(`Retrieved ${documents.documents.length} documents`);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: true,
                  total: documents.total,
                  documents: documents.documents.map((doc) => ({
                    id: doc.$id,
                    createdAt: doc.$createdAt,
                    updatedAt: doc.$updatedAt,
                    company_name: doc.company_name,
                    company_id: doc.company_id,
                  })),
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        console.error("Error listing documents:", error);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: false,
                  error:
                    error instanceof Error
                      ? error.message
                      : "Unknown error occurred",
                },
                null,
                2
              ),
            },
          ],
        };
      }
    },
  },
};
