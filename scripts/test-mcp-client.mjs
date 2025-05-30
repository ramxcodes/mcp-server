import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const origin = "http://localhost:3000";

async function main() {
  const transport = new StreamableHTTPClientTransport(new URL(`${origin}/mcp`));

  const client = new Client(
    {
      name: "example-client",
      version: "1.0.0",
    },
    {
      capabilities: {
        prompts: {},
        resources: {},
        tools: {},
      },
    }
  );

  await client.connect(transport);

  console.log("Connected", client.getServerCapabilities());

  const tools = await client.listTools();
  console.log("Available tools:", tools);

  try {
    console.log("\n--- Testing courseRecommender tool ---");
    const courseResult = await client.callTool("courseRecommender", {
      experienceLevel: "beginner",
    });
    console.log("Course recommendation result:", courseResult);
  } catch (error) {
    console.error("Error testing courseRecommender:", error);
  }

  try {
    console.log("\n--- Testing createDocument tool ---");
    const createResult = await client.callTool("createDocument", {
      company_name: "Test Company",
      company_id: "TC001",
      documentId: "test-doc-001",
    });
    console.log("Create document result:", createResult);
  } catch (error) {
    console.error("Error testing createDocument:", error);
  }

  try {
    console.log("\n--- Testing listDocuments tool ---");
    const listResult = await client.callTool("listDocuments", {});
    console.log("List documents result:", listResult);
  } catch (error) {
    console.error("Error testing listDocuments:", error);
  }

  try {
    console.log("\n--- Testing getDocument tool ---");
    const getResult = await client.callTool("getDocument", {
      documentId: "test-doc-001",
    });
    console.log("Get document result:", getResult);
  } catch (error) {
    console.error("Error testing getDocument:", error);
  }

  try {
    console.log("\n--- Testing updateDocument tool ---");
    const updateResult = await client.callTool("updateDocument", {
      documentId: "test-doc-001",
      company_name: "Updated Test Company",
    });
    console.log("Update document result:", updateResult);
  } catch (error) {
    console.error("Error testing updateDocument:", error);
  }

  try {
    console.log("\n--- Testing upsertDocument tool ---");
    const upsertResult = await client.callTool("upsertDocument", {
      documentId: "test-doc-002",
      company_name: "Upsert Test Company",
      company_id: "UTC002",
    });
    console.log("Upsert document result:", upsertResult);
  } catch (error) {
    console.error("Error testing upsertDocument:", error);
  }

  try {
    console.log("\n--- Testing deleteDocument tool ---");
    const deleteResult = await client.callTool("deleteDocument", {
      documentId: "test-doc-001",
    });
    console.log("Delete document result:", deleteResult);
  } catch (error) {
    console.error("Error testing deleteDocument:", error);
  }

  console.log("\n--- All tests completed ---");
}

main().catch(console.error);
