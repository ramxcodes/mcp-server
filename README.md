# AppWrite MCP Server

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)](https://tailwindcss.com/)
[![Appwrite](https://img.shields.io/badge/Appwrite-17.0.0-ff385d)](https://appwrite.io/)

A powerful **Model Context Protocol (MCP) Server** that provides seamless integration with Appwrite database operations. This project combines a beautiful, modern web interface with a robust MCP server for database interactions, built with Next.js 15, React 19, and the latest web technologies.

## 🌟 Features

- **🔥 MCP Server Integration**: Full Model Context Protocol server implementation
- **🗄️ Database Operations**: Complete CRUD operations for Appwrite databases
- **⚡ Lightning Fast**: Optimized for speed with Next.js 15 and Turbo
- **🔒 Secure**: Built with security best practices and type-safe operations
- **🎨 Beautiful UI**: Modern, responsive interface with Tailwind CSS and Framer Motion
- **📱 Responsive Design**: Fully responsive across all devices
- **🌙 Modern Stack**: Next.js 15, React 19, TypeScript, and latest dependencies

### Available MCP Tools

The server provides 7 powerful database tools:

1. **`creatorInfo`** - Get detailed information about the creator
2. **`getDocument`** - Retrieve a document by its unique ID
3. **`listDocuments`** - List all documents from a collection
4. **`createDocument`** - Create new documents in the database
5. **`updateDocument`** - Update existing documents
6. **`deleteDocument`** - Delete documents from the database
7. **`clearCollection`** - Clear all documents from a collection

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- An Appwrite account and project
- Appwrite database and collection setup

### 1. Clone the Repository

```bash
git clone https://github.com/ramxcodes/mcp-server.git
cd mcp-server
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using bun (recommended):
```bash
bun install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
APPWRITE_ENDPOINT=https://YOURID.cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=YOUR-PROJECT-ID
APPWRITE_API_KEY=YOUR-API-KEY
DATABASE_ID=YOUR-DB-ID
```

Replace the placeholder values with your actual Appwrite credentials:

- **APPWRITE_ENDPOINT**: Your Appwrite instance endpoint
- **APPWRITE_PROJECT_ID**: Your Appwrite project ID
- **APPWRITE_API_KEY**: Your Appwrite API key (with database permissions)
- **DATABASE_ID**: Your Appwrite database ID

### 4. Run the Development Server

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📖 Usage

### Web Interface

The web application provides:

- **Hero Section**: Overview of the MCP server capabilities
- **Code Showcase**: Interactive examples and documentation
- **MCP Demo**: Live demonstration of the server functionality
- **Video Showcase**: Visual guides and tutorials
- **Documentation Links**: Quick access to resources

### MCP Server Endpoint

The MCP server is available at:
```
https://your-domain.com/mcp
```

You can use this endpoint with any MCP-compatible client to interact with your Appwrite database.

### Example MCP Usage

```javascript
// Connect to the MCP server
mcp.connect('https://your-domain.com/mcp')

// List all documents
await mcp.listDocuments({ collectionId: 'company_names' })

// Create a new document
await mcp.createDocument({
  company_name: 'Example Corp',
  company_id: 12345
})

// Get a specific document
await mcp.getDocument({ documentId: 'doc_id_here' })
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.3.3** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **Radix UI** - Accessible components
- **Shadcn/ui** - UI component library

### Backend & Database
- **Appwrite 17.0.0** - Backend-as-a-Service
- **@vercel/mcp-adapter** - MCP server implementation
- **Zod** - Schema validation

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Bun** - Package manager and runtime

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── [transport]/
│   │   │   └── route.ts          # MCP server endpoint
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Homepage
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── ui/                   # Shadcn UI components
│   │   ├── magicui/              # Additional UI components
│   │   ├── hero-section.tsx      # Hero section component
│   │   ├── code-showcase.tsx     # Code examples component
│   │   ├── mcp-demo.tsx          # MCP demo component
│   │   └── ...                   # Other components
│   ├── lib/
│   │   └── tools/
│   │       └── appwrite.ts       # Appwrite tools and handlers
│   └── hooks/                    # Custom React hooks
├── public/                       # Static assets
├── .env                         # Environment variables
├── next.config.ts               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## 🔧 Configuration

### Appwrite Setup

1. Create an Appwrite project
2. Create a database
3. Create a collection (e.g., 'company_names')
4. Set up the following attributes in your collection:
   - `company_name` (string)
   - `company_id` (integer)
5. Generate an API key with database permissions
6. Update your `.env` file with the credentials

### MCP Client Configuration

To use this server with an MCP client, configure it with:

```json
{
  "server_url": "https://your-domain.com/mcp",
  "capabilities": [
    "database_operations",
    "document_management"
  ]
}
```

## 📝 Available Scripts

- `dev` - Start development server with Turbo
- `build` - Build the application for production
- `start` - Start the production server
- `lint` - Run ESLint for code quality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io/) for the excellent backend services
- [Vercel](https://vercel.com/) for the MCP adapter
- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for accessible components

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the documentation
- Contact the maintainer

---

**Built with ❤️ by [Ramkrishna Swarnkar](https://ramx.in)**

Portfolio: [https://ramx.in](https://ramx.in) | GitHub: [@ramxcodes](https://github.com/ramxcodes)
