import { Client, Databases } from "node-appwrite";
import { z } from "zod";

const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID;
const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY;
const DATABASE_ID = process.env.DATABASE_ID;

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
  // Appwrite Get Document Tool
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

  // Appwrite List Documents Tool
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

  // Appwrite Create Document Tool
  createDocument: {
    name: "createDocument",
    description: "Create a new document in the Appwrite database",
    schema: {
      company_name: z.string().describe("The name of the company"),
      company_id: z
        .number()
        .describe("The unique identifier for the company (integer)"),
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
    handler: async ({
      company_name,
      company_id,
      documentId,
      collectionId = "company_names",
    }: {
      company_name: string;
      company_id: number;
      documentId?: string;
      collectionId?: string;
    }) => {
      try {
        if (!DATABASE_ID) {
          throw new Error("DATABASE_ID environment variable is not set");
        }

        console.log(
          `Creating document in collection: ${collectionId} with data:`,
          { company_name, company_id }
        );

        const document = await databases.createDocument(
          DATABASE_ID,
          collectionId,
          documentId || "unique()", // Use provided ID or auto-generate
          {
            company_name,
            company_id,
          }
        );

        console.log("Document created successfully:", document);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: true,
                  message: "Document created successfully",
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
        console.error("Error creating document:", error);

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

  // Appwrite Update Document Tool
  updateDocument: {
    name: "updateDocument",
    description: "Update an existing document in the Appwrite database",
    schema: {
      documentId: z
        .string()
        .describe("The unique ID of the document to update"),
      company_name: z
        .string()
        .optional()
        .describe("The name of the company (optional)"),
      company_id: z
        .number()
        .optional()
        .describe("The unique identifier for the company (optional integer)"),
      collectionId: z
        .string()
        .optional()
        .describe("The collection ID (defaults to 'company_names')"),
    },
    handler: async ({
      documentId,
      company_name,
      company_id,
      collectionId = "company_names",
    }: {
      documentId: string;
      company_name?: string;
      company_id?: number;
      collectionId?: string;
    }) => {
      try {
        if (!DATABASE_ID) {
          throw new Error("DATABASE_ID environment variable is not set");
        }

        const updateData: Record<string, string | number> = {};
        if (company_name !== undefined) updateData.company_name = company_name;
        if (company_id !== undefined) updateData.company_id = company_id;

        if (Object.keys(updateData).length === 0) {
          throw new Error("At least one field must be provided for update");
        }

        console.log(
          `Updating document with ID: ${documentId} in collection: ${collectionId} with data:`,
          updateData
        );

        const document = await databases.updateDocument(
          DATABASE_ID,
          collectionId,
          documentId,
          updateData
        );

        console.log("Document updated successfully:", document);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: true,
                  message: "Document updated successfully",
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
        console.error("Error updating document:", error);

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

  // Appwrite Delete Document Tool
  deleteDocument: {
    name: "deleteDocument",
    description: "Delete a document from the Appwrite database",
    schema: {
      documentId: z
        .string()
        .describe("The unique ID of the document to delete"),
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
          `Deleting document with ID: ${documentId} from collection: ${collectionId}`
        );

        await databases.deleteDocument(DATABASE_ID, collectionId, documentId);

        console.log("Document deleted successfully");

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: true,
                  message: "Document deleted successfully",
                  deletedDocumentId: documentId,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        console.error("Error deleting document:", error);

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

  // Appwrite Upsert Document Tool
  upsertDocument: {
    name: "upsertDocument",
    description:
      "Create or update a document in the Appwrite database (upsert operation)",
    schema: {
      documentId: z
        .string()
        .describe("The unique ID of the document to create or update"),
      company_name: z.string().describe("The name of the company"),
      company_id: z
        .number()
        .describe("The unique identifier for the company (integer)"),
      collectionId: z
        .string()
        .optional()
        .describe("The collection ID (defaults to 'company_names')"),
    },
    handler: async ({
      documentId,
      company_name,
      company_id,
      collectionId = "company_names",
    }: {
      documentId: string;
      company_name: string;
      company_id: number;
      collectionId?: string;
    }) => {
      try {
        if (!DATABASE_ID) {
          throw new Error("DATABASE_ID environment variable is not set");
        }

        console.log(
          `Attempting upsert for document with ID: ${documentId} in collection: ${collectionId}`
        );

        let document;
        let operation = "";

        try {
          await databases.getDocument(DATABASE_ID, collectionId, documentId);

          document = await databases.updateDocument(
            DATABASE_ID,
            collectionId,
            documentId,
            {
              company_name,
              company_id,
            }
          );
          operation = "updated";
          console.log("Document updated successfully:", document);
        } catch {
          document = await databases.createDocument(
            DATABASE_ID,
            collectionId,
            documentId,
            {
              company_name,
              company_id,
            }
          );
          operation = "created";
          console.log("Document created successfully:", document);
        }

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: true,
                  message: `Document ${operation} successfully`,
                  operation,
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
        console.error("Error during upsert operation:", error);

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
