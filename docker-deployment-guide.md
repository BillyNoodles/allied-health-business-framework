# Docker Deployment Guide for Allied Health Business Assessment Tool

This guide provides instructions for deploying the Allied Health Business Assessment Tool using Docker for a private, controlled deployment.

## Prerequisites

- Docker installed on your machine
- Docker Compose installed on your machine
- Supabase account (for database and authentication)

## Configuration

Before running the application, you need to configure your Supabase credentials:

1. Create a `.env.local` file in the project root with the following content:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Replace `your-project.supabase.co` and `your-anon-key` with your actual Supabase project URL and anonymous key.

## Building and Running the Container

### Option 1: Using Docker Compose (Recommended)

1. Open a terminal in the project directory
2. Run the following command:

```bash
docker-compose up -d
```

This will build the Docker image and start the container in detached mode.

3. Access the application at http://localhost:3000

To stop the container:

```bash
docker-compose down
```

### Option 2: Using Docker Directly

1. Build the Docker image:

```bash
docker build -t allied-health-assessment .
```

2. Run the container:

```bash
docker run -p 3000:3000 --env-file .env.local -d allied-health-assessment
```

3. Access the application at http://localhost:3000

To stop the container:

```bash
docker stop $(docker ps -q --filter ancestor=allied-health-assessment)
```

## Database Setup

The application requires a Supabase database with the correct schema. To set up the database:

1. Create a new project in Supabase
2. Run the SQL script from `migrations/0001_initial.sql` in the Supabase SQL editor
3. Update your `.env.local` file with the new project credentials

## Sharing the Application

To share the application with others while maintaining privacy:

1. Build the Docker image
2. Save the image to a file:

```bash
docker save allied-health-assessment > allied-health-assessment.tar
```

3. Share the tar file along with the deployment instructions
4. Recipients can load the image:

```bash
docker load < allied-health-assessment.tar
```

5. They can then run the container using the instructions above

## Troubleshooting

- If you encounter connection issues with Supabase, verify your environment variables are correctly set
- If the application doesn't start, check the Docker logs:

```bash
docker logs $(docker ps -q --filter ancestor=allied-health-assessment)
```

- For database issues, verify the SQL migrations have been applied correctly in Supabase
