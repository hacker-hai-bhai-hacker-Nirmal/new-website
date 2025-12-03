# MCP Server Integration

This workspace is configured with Model Context Protocol (MCP) servers to provide GitHub Copilot with direct access to external services.

## Configured MCP Servers

### 1. GitHub Server (`@ama-mcp/github`)
**Provides:**
- Repository management (read files, commits, branches)
- Issues and Pull Requests access
- GitHub Actions monitoring and triggering
- Organization and team management

**Configuration:** `.vscode/mcp-settings.json` → `github`

### 2. Cloudflare Server (`@thelord/mcp-cloudflare`)
**Provides:**
- DNS record management
- Cloudflare Pages deployment info
- Zone and domain configuration
- Analytics and logs access

**Configuration:** `.vscode/mcp-settings.json` → `cloudflare`

## Setup Instructions

### 1. Install MCP Servers (Already Done)
```powershell
npm install -g @ama-mcp/github
npm install -g @thelord/mcp-cloudflare
```

### 2. Configure Environment Variables

**Option A: Interactive Setup (Recommended)**
```powershell
.\scripts\setup_mcp_env.ps1
```

**Option B: Interactive Setup with Persistence**
```powershell
.\scripts\setup_mcp_env.ps1 -Save
```

**Option C: Manual Setup**
```powershell
# GitHub token (create at https://github.com/settings/tokens)
# Required scopes: repo, workflow, read:org
$env:GITHUB_TOKEN = 'your_github_pat_here'

# Cloudflare API token (create at https://dash.cloudflare.com/profile/api-tokens)
# Required permissions: Pages:Read, Pages:Edit, DNS:Read, DNS:Edit
$env:CF_API_TOKEN = 'your_cloudflare_token_here'
$env:CLOUDFLARE_API_TOKEN = $env:CF_API_TOKEN

# Cloudflare Account ID (from dashboard)
$env:CF_ACCOUNT_ID = '2b0bdc88f0335d3e29ffb6ce68841a0e'
$env:CLOUDFLARE_ACCOUNT_ID = $env:CF_ACCOUNT_ID
```

### 3. Restart VS Code
Close and reopen VS Code to activate the MCP connections.

## Required Tokens

### GitHub Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
   - ✅ `read:org` (Read org and team membership)
4. Generate and copy the token
5. Set as `GITHUB_TOKEN` environment variable

### Cloudflare API Token
1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Use "Edit Cloudflare Workers" template or create custom with:
   - Account → Pages: Read, Edit
   - Zone → DNS: Read, Edit
   - Account → Account Analytics: Read (optional, for monitoring)
4. Generate and copy the token
5. Set as `CF_API_TOKEN` environment variable

### Cloudflare Account ID
1. Go to: https://dash.cloudflare.com
2. Select your account (top-left)
3. Go to "Account Home"
4. Copy the Account ID from the right sidebar
5. Set as `CF_ACCOUNT_ID` environment variable

## Security Best Practices

⚠️ **NEVER commit tokens to the repository!**

- ✅ Use environment variables (loaded at runtime)
- ✅ Add tokens to `.gitignore` if stored in files
- ✅ Rotate tokens regularly
- ✅ Use minimal required permissions
- ✅ Revoke tokens when no longer needed

The `.vscode/mcp-settings.json` uses `${env:VARIABLE}` syntax to safely reference environment variables.

## Verify Setup

```powershell
# Check MCP configuration
Get-Content .vscode\mcp-settings.json | ConvertFrom-Json | ConvertTo-Json -Depth 5

# Test GitHub MCP server
npx @ama-mcp/github --help

# Test Cloudflare MCP server
npx @thelord/mcp-cloudflare --help

# Verify environment variables are set
$env:GITHUB_TOKEN.Length
$env:CF_API_TOKEN.Length
$env:CF_ACCOUNT_ID
```

## What This Enables

With MCP servers connected, GitHub Copilot can:

### GitHub Automation
- ✅ Read repository structure and files
- ✅ Monitor GitHub Actions workflow status
- ✅ Create and manage Issues/PRs
- ✅ Trigger workflow runs
- ✅ Access commit history and branches

### Cloudflare Management
- ✅ Check Pages deployment status in real-time
- ✅ Read deployment logs automatically
- ✅ Manage DNS records
- ✅ Configure Pages environment variables
- ✅ Monitor analytics and errors

### Enhanced Development Experience
- **Automatic deployment monitoring** - Copilot can check if your Pages deploy succeeded
- **Real-time error detection** - Parse deployment logs and suggest fixes
- **GitHub Actions integration** - Monitor CI/CD pipelines without leaving the editor
- **DNS management** - Update records for custom domains
- **Contextual assistance** - Copilot has access to your actual project state in GitHub/Cloudflare

## Troubleshooting

### MCP servers not working?
1. Restart VS Code completely
2. Verify environment variables: `Get-ChildItem Env: | Where-Object Name -like '*TOKEN*'`
3. Check MCP config: `Get-Content .vscode\mcp-settings.json`
4. Test servers manually: `npx @ama-mcp/github --version`

### Token permission errors?
- Ensure GitHub token has `repo`, `workflow`, `read:org` scopes
- Ensure Cloudflare token has Pages and DNS permissions for the specific account

### "Package not found" errors?
```powershell
# Reinstall MCP servers
npm install -g @ama-mcp/github @thelord/mcp-cloudflare
```

## Additional MCP Servers

Want to add more integrations? Search npm for MCP servers:
```powershell
npm search mcp
```

Common useful servers:
- `@modelcontextprotocol/server-filesystem` - Enhanced file system access
- `@modelcontextprotocol/server-postgres` - Database access
- `@cloudflare/playwright-mcp` - Browser automation via Playwright

To add a server:
1. Install: `npm install -g <package-name>`
2. Add entry to `.vscode/mcp-settings.json`
3. Restart VS Code

## Documentation

- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [MCP SDK on npm](https://www.npmjs.com/package/@modelcontextprotocol/sdk)
- [GitHub MCP Server](https://www.npmjs.com/package/@ama-mcp/github)
- [Cloudflare MCP Server](https://www.npmjs.com/package/@thelord/mcp-cloudflare)
