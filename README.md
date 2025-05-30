# MCP Server with Appwrite Integration

This is a Model Context Protocol (MCP) server built with Next.js, TypeScript, and Bun, featuring integration with Appwrite database.

## Features

- **HTTP-based MCP Server** using `@vercel/mcp-adapter`
- **Appwrite Database Integration** for document management
- **Modular Tool Architecture** for easy extension
- **TypeScript Support** with proper type safety

## Available Tools

### 1. courseRecommender
Recommends courses based on user experience level.

**Parameters:**
- `experienceLevel`: "beginner" | "intermediate"

### 2. getDocument
Retrieves a specific document from the Appwrite database by its unique ID.

**Parameters:**
- `documentId`: string (required) - The unique ID of the document
- `collectionId`: string (optional) - Defaults to "company_names"

### 3. listDocuments
Lists all documents from the companies collection in the Appwrite database.

**Parameters:**
- `collectionId`: string (optional) - Defaults to "company_names"
- `limit`: number (optional) - Defaults to 25

## Environment Setup

Create a `.env.local` file with the following variables:

```env
# Appwrite Configuration
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_project_id_here
APPWRITE_API_KEY=your_api_key_here
DATABASE_ID=your_database_id_here

# Optional: Redis URL for MCP server
REDIS_URL=
```

### Appwrite Setup

1. Create an Appwrite account and project
2. Create a database (e.g., "ramx-mcp-db")
3. Create a collection with ID "company_names" 
4. Add the following attributes to the collection:
   - `company_name` (string)
   - `company_id` (string)
5. Generate an API key with the following scopes:
   - `documents.read`
   - `documents.write` (if you plan to add write operations)

## Installation

```bash
# Install dependencies
bun install

# Run development server
bun run dev
```

## Testing

Test the MCP server using the provided test client:

```bash
# Run the test client
bun run scripts/test-mcp-client.mjs
```

## MCP Endpoint

The MCP server is available at: `http://localhost:3000/mcp`

## File Structure

```
src/
├── app/
│   ├── [transport]/
│   │   └── route.ts          # MCP server routes
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── lib/
│   └── tools/
│       ├── appwrite.ts       # Appwrite database tools
│       └── index.ts          # Tools aggregation
└── scripts/
    └── test-mcp-client.mjs   # Test client for MCP server
```

## Architecture

- **Modular Design**: Tools are organized in separate modules for easy maintenance
- **Type Safety**: Full TypeScript support with proper type definitions
- **Error Handling**: Comprehensive error handling with detailed logging
- **Environment Logging**: Environment variables are logged for debugging (API keys are masked)

## Adding New Tools

1. Create a new tool file in `src/lib/tools/`
2. Export your tools following the existing pattern
3. Import and register your tools in `src/app/[transport]/route.ts`
4. Update the capabilities configuration

## License

This project is open source and available under the MIT License.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
