Shadcn UI v4 MCP Server
npm version License: MIT

Trust Score

🚀 The fastest way to integrate shadcn/ui components into your AI workflow

A Model Context Protocol (MCP) server that provides AI assistants with comprehensive access to shadcn/ui v4 components, blocks, demos, and metadata. Seamlessly retrieve React, Svelte, Vue, and React Native implementations for your AI-powered development workflow.

✨ Key Features
🎯 Multi-Framework Support - React, Svelte, Vue, and React Native implementations
📦 Component Source Code - Latest shadcn/ui v4 TypeScript source
🎨 Component Demos - Example implementations and usage patterns
🏗️ Blocks Support - Complete block implementations (dashboards, calendars, forms)
📋 Metadata Access - Dependencies, descriptions, and configuration details
🔍 Directory Browsing - Explore repository structures
⚡ Smart Caching - Efficient GitHub API integration with rate limit handling
🌐 SSE Transport - Server-Sent Events support for multi-client deployments
🐳 Docker Ready - Production-ready containerization with Docker Compose
🚀 Quick Start
# Basic usage (60 requests/hour)
npx @jpisnice/shadcn-ui-mcp-server

# With GitHub token (5000 requests/hour) - Recommended
npx @jpisnice/shadcn-ui-mcp-server --github-api-key ghp_your_token_here

# Switch frameworks
npx @jpisnice/shadcn-ui-mcp-server --framework svelte
npx @jpisnice/shadcn-ui-mcp-server --framework vue
npx @jpisnice/shadcn-ui-mcp-server --framework react-native
🎯 Get your GitHub token in 2 minutes: docs/getting-started/github-token.md

🌐 SSE Transport & Docker Deployment
Run the server with Server-Sent Events (SSE) transport for multi-client support and production deployments:

Quick Start with SSE
# SSE mode (supports multiple concurrent connections)
node build/index.js --mode sse --port 7423

# Docker Compose (production ready)
docker-compose up -d

# Connect with Claude Code
claude mcp add --scope user --transport sse shadcn-mcp-server http://localhost:7423/sse
Transport Modes
stdio (default) - Standard input/output for CLI usage
sse - Server-Sent Events for HTTP-based connections
dual - Both stdio and SSE simultaneously
Docker Examples
# Basic container
docker run -p 7423:7423 shadcn-ui-mcp-server

# With GitHub API token
docker run -p 7423:7423 -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token shadcn-ui-mcp-server

# Docker Compose (recommended)
docker-compose up -d
curl http://localhost:7423/health
Environment Variables
MCP_TRANSPORT_MODE - Transport mode (stdio|sse|dual)
MCP_PORT - SSE server port (default: 7423 - SHADCN on keypad!)
MCP_HOST - Host binding (default: 0.0.0.0)
MCP_CORS_ORIGINS - CORS origins (comma-separated)
GITHUB_PERSONAL_ACCESS_TOKEN - GitHub API token
📚 Documentation
Section	Description
🚀 Getting Started	Installation, setup, and first steps
⚙️ Configuration	Framework selection, tokens, and options
🔌 Integration	Editor and tool integrations
📖 Usage	Examples, tutorials, and use cases
🎨 Frameworks	Framework-specific documentation
🐛 Troubleshooting	Common issues and solutions
🔧 API Reference	Tool reference and technical details
🎨 Framework Support
This MCP server supports four popular shadcn implementations:

Framework	Repository	Maintainer	Description
React (default)	shadcn/ui	shadcn	React components from shadcn/ui v4
Svelte	shadcn-svelte	huntabyte	Svelte components from shadcn-svelte
Vue	shadcn-vue	unovue	Vue components from shadcn-vue
React Native	react-native-reusables	Founded Labs	React Native components from react-native-reusables
🛠️ Essential Setup
1. Get GitHub Token (Recommended)
# Visit: https://github.com/settings/tokens
# Generate token with no scopes needed
export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token_here
2. Run Server
# React (default)
npx @jpisnice/shadcn-ui-mcp-server

# Svelte
npx @jpisnice/shadcn-ui-mcp-server --framework svelte

# Vue  
npx @jpisnice/shadcn-ui-mcp-server --framework vue

# React Native
npx @jpisnice/shadcn-ui-mcp-server --framework react-native
3. Integrate with Your Editor
Claude Code: SSE transport integration (see above)
VS Code: docs/integration/vscode.md
Cursor: docs/integration/cursor.md
Claude Desktop: docs/integration/claude-desktop.md
Continue.dev: docs/integration/continue.md
🎯 Use Cases
AI-Powered Development - Let AI assistants build UIs with shadcn/ui
Multi-Client Deployments - SSE transport supports multiple concurrent connections
Production Environments - Docker Compose ready with health checks and monitoring
Component Discovery - Explore available components and their usage
Multi-Framework Learning - Compare React, Svelte, Vue, and React Native implementations
Rapid Prototyping - Get complete block implementations for dashboards, forms, etc.
Code Generation - Generate component code with proper dependencies
📦 Installation
# Global installation (optional)
npm install -g @jpisnice/shadcn-ui-mcp-server

# Or use npx (recommended)
npx @jpisnice/shadcn-ui-mcp-server
🔗 Quick Links
📖 Full Documentation
🚀 Getting Started Guide
🌐 SSE Transport & Docker Guide
🎨 Framework Comparison
🔧 API Reference
🐛 Troubleshooting
💬 Issues & Discussions
📄 License
MIT License - see LICENSE for details.

🙏 Acknowledgments
shadcn - For the amazing React UI component library
huntabyte - For the excellent Svelte implementation
unovue - For the comprehensive Vue implementation
Founded Labs - For the React Native implementation
Anthropic - For the Model Context Protocol specification
Made with ❤️ by Janardhan Polle

Star ⭐ this repo if you find it helpful!