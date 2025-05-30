import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";
import { appwriteTools } from "../../lib/tools/appwrite";

const handler = createMcpHandler(
  (server) => {
    // Creator Info Tool
    server.tool(
      "creatorInfo",
      "Get detailed information about Ramkrishna Swarnkar - Full Stack Developer and Open Source Contributor",
      {},
      async () => ({
        content: [
          {
            type: "text" as const,
            text: `# Ramkrishna Swarnkar
            🚀 Full Stack Web Developer & Open Source Contributor

            ## About Me
            I'm a passionate Full Stack web developer and Open Source Contributor, with a focus on JavaScript, React, and UI/UX design. Enthusiastic about Three.js, driven by a keen eye for design.

            ## 🛠️ Technical Skills
            **Frontend:** React.js, Next.js, Three.js, Tailwind CSS, JavaScript, TypeScript
            **Backend:** Express.js, Node.js, Bun
            **Databases:** MongoDB, PostgreSQL, Vector DB
            **ORMs:** Prisma, Drizzle  
            **Cloud & Deployment:** Vercel, AWS
            **Other:** UI/UX Design, Three.js 3D Development

            ## 🌐 Connect With Me
            **Portfolio:** https://ramx.in
            **Resume:** https://www.ramx.in/resume
            **GitHub:** https://github.com/ramxcodes
            **LinkedIn:** https://www.linkedin.com/in/ramxcodes/
            **Twitter/X:** https://x.com/ramxcodes
            **Email:** ramxcodes@gmail.com

            ## 💼 Work Experience

            ### Expelee (Aug 2023 – Present) | Remote — Dubai, UAE

            **Full Stack Developer in Next.js & MERN (Mar 2025 – Present)**
            • **Riskmitra:** Built full-stack product with Next.js, Tailwind CSS, Framer Motion, shadcn, wallet integration, and GitBook integration
            • **Core AI:** Designed and developed with same stack as Riskmitra, focusing on scalability and modular UI design
            • **GPU AI:** Integrated Three.js for interactive 3D elements alongside full-stack features

            **Full-stack Developer — MERN (Jan 2024 – Mar 2025)**
            • **Altranium:** Developed immersive gaming platform using Three.js, MERN, Tailwind, and Framer Motion
            • **Pars Network:** Engineered landing experience with MERN, Tailwind CSS, and GSAP for advanced animations

            **Frontend Developer & Designer (Internship) (Aug 2023 – Dec 2023)**
            • **TEQ Network:** Designed and developed landing page using MERN, Tailwind CSS, and Web3 wallet integration

            ### Flameloop (Jun 2023 – Jul 2023) | Indore, Madhya Pradesh, India
            **Junior Frontend Developer & Graphic Designer (Internship)**
            • Worked on visual storytelling, video editing, and graphic design projects
            • Created branding materials and engaging visual content for social media

            ## 🚀 Notable Projects

            ### Moonstone 2K25 Website (Mar 2025)
            **Tech Stack:** Next.js, Three.js, R3F, Tailwind CSS, Framer Motion, Matter.js
            • Designed and developed the official website for Moonstone 2K25 — the annual fest of Medi-Caps University
            • Used R3F and Three.js to craft interactive 3D visuals and Matter.js for physics-based effects
            • Integrated Framer Motion and Tailwind CSS for smooth, dynamic transitions and responsive layouts

            ### Notes Buddy (Jan 2025)
            **Tech Stack:** Next.js, Tailwind CSS, Razorpay, Aceternity UI, Shadcn UI, NextAuth
            • Built comprehensive educational platform with interactive quizzes, flashcards, condensed notes, AI chatbot, and online code compiler
            • **Achievements:** 190K+ note views, 2,500+ hours of study time, 1,600 signup, and 99 premium purchases in under 3 months
            • Implemented piracy and account sharing detection systems
            • Pitched by 2 universities to be official part of their system
            • Open-sourced project with 10+ contributors and 15+ pull requests merged

            ### Syncify (Nov 2024)
            **Tech Stack:** React, TypeScript, Tailwind CSS, Shadcn UI, Clerk, Node.js, Express.js, MongoDB
            • Developed full-stack music streaming app with real-time chat, activity feeds, playlist collaboration, and custom audio player
            • Achieved 99% playback reliability and handled 100+ API requests daily through scalable Express.js backend
            • Built admin dashboard with real-time analytics and automated playlist curation

            ## 🎯 Current Focus
            Currently expanding expertise in 3D web development with Three.js while building scalable full-stack applications. Always open to collaborating on innovative projects and contributing to open source initiatives.

            ---
            *"Driven by code, inspired by design, motivated by impact."*`,
          },
        ],
      })
    );

    // Appwrite Get Document Tool
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

    // Appwrite List Documents Tool
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

    // Appwrite Create Document Tool
    server.tool(
      "createDocument",
      "Create a new document in the Appwrite database",
      {
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
      async ({ company_name, company_id, documentId, collectionId }) => {
        return await appwriteTools.createDocument.handler({
          company_name,
          company_id,
          documentId,
          collectionId,
        });
      }
    );

    // Appwrite Update Document Tool
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
          .number()
          .optional()
          .describe("The unique identifier for the company (optional integer)"),
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

    // Appwrite Delete Document Tool
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

    // Appwrite Upsert Document Tool
    server.tool(
      "upsertDocument",
      "Create or update a document in the Appwrite database (upsert operation)",
      {
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
        creatorInfo: {
          description:
            "Get detailed information about Ramkrishna Swarnkar - Full Stack Developer and Open Source Contributor (Creator of this tool).",
        },
        getDocument: {
          description:
            "Get a document by its unique ID from the Appwrite database",
        },
        listDocuments: {
          description: "List all documents from the companies collection",
        },
        createDocument: {
          description: "Create a new document in the Appwrite database.",
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
    sseEndpoint: "/sse",
    streamableHttpEndpoint: "/mcp",
    verboseLogs: true,
    maxDuration: 60,
  }
);

export { handler as GET, handler as POST, handler as DELETE };
