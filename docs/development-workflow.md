# Development Workflow

## Local Development Setup

### Prerequisites
- Docker Desktop
- Node.js 18+
- pnpm 10+
- Supabase CLI (v2.20.5 or later)

### Services
The development environment consists of the following services:
- Next.js application (port 3000)
- Supabase Services:
  - Studio UI (port 54323)
  - API Gateway/Kong (port 54321)
  - Database (port 54322)
  - Inbucket/Mail (port 54324)
  - Analytics (port 54327)
  - Storage API (internal)
  - Auth (internal)
  - Edge Functions (internal)

### Getting Started

1. Start the Supabase services:
```bash
# First, ensure no conflicting services are running
supabase stop

# Start Supabase services
supabase start

# Verify services are running
docker ps | grep supabase
```

2. Start the Next.js development server:
```bash
pnpm dev
```

The application will be available at:
- Next.js App: http://localhost:3000
- Supabase Studio: http://localhost:54323
- API Endpoint: http://localhost:54321

### Hot-Reload Configuration
- Next.js hot-reload is enabled by default for the application
- Changes to React components and pages will automatically trigger a rebuild
- API routes will also hot-reload when modified
- Database changes through Supabase Studio are immediately reflected

### Debugging
- Chrome DevTools for client-side debugging
- VS Code debugger configuration for server-side debugging
- Supabase Studio for database debugging (http://localhost:54323)
- Database logs available through Supabase Dashboard
- API Gateway logs through Kong admin interface

### Build and Deployment
Development build:
```bash
pnpm build
```

Preview build:
```bash
pnpm preview
```

### Common Issues and Solutions

1. Port Conflicts
   - Always use `supabase stop` to stop services properly
   - Never use `docker stop` directly on Supabase containers
   - Check for conflicts:
     ```bash
     # List all running Supabase containers
     docker ps | grep supabase
     
     # Check specific port usage
     lsof -i :54321-54327
     ```

2. Database Connection Issues
   - Verify Supabase services are running: `supabase status`
   - Check connection string in environment variables
   - Ensure database port (54322) is accessible
   - Verify volume persistence:
     ```bash
     docker volume ls --filter label=com.supabase.cli.project=allied-health-assessment
     ```

3. Service Management
   - Always use Supabase CLI commands for service management
   - Never mix docker-compose and Supabase CLI management
   - Keep track of database volumes and backups
   - Monitor service health through Supabase Studio

### Best Practices
1. Always use TypeScript for new files
2. Keep hot-reload enabled during development
3. Use Supabase Studio for database management
4. Follow the established project structure
5. Use environment variables for configuration
6. Always use Supabase CLI for service management
7. Regularly check service health and logs
8. Maintain proper backup procedures 

