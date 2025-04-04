# Deployment Configuration for Allied Health Business Assessment Tool

## Environment Variables

For production deployment, the following environment variables need to be set:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-production-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
```

## Build Configuration

The application is built using Next.js and can be deployed to various platforms. For this MVP, we'll use the built-in Next.js deployment capabilities.

## Deployment Steps

1. Install dependencies
2. Build the application
3. Deploy to production environment

## Post-Deployment Verification

After deployment, verify:
- Authentication flow works correctly
- Assessment modules load properly
- Data is saved to the database
- Results are displayed correctly
