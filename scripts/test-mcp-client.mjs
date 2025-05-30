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

  // List all available tools
  const tools = await client.listTools();
  console.log("Available tools:", tools);

  // Test courseRecommender tool
  try {
    console.log("\n--- Testing courseRecommender tool ---");
    const courseResult = await client.callTool("courseRecommender", {
      experienceLevel: "beginner",
    });
    console.log("Course recommendation result:", courseResult);
  } catch (error) {
    console.error("Error testing courseRecommender:", error);
  }

  // Test listDocuments tool
  try {
    console.log("\n--- Testing listDocuments tool ---");
    const listResult = await client.callTool("listDocuments", {});
    console.log("List documents result:", listResult);
  } catch (error) {
    console.error("Error testing listDocuments:", error);
  }

  // Test getDocument tool (this will likely fail without a valid document ID, but we can see the error)
  try {
    console.log("\n--- Testing getDocument tool ---");
    const getResult = await client.callTool("getDocument", {
      documentId: "test-document-id",
    });
    console.log("Get document result:", getResult);
  } catch (error) {
    console.error("Error testing getDocument:", error);
  }
}

main().catch(console.error);
