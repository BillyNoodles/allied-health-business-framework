# Allied Health Business Assessment Tool - MVP Documentation

## Overview

The Allied Health Business Assessment Tool is a comprehensive solution for physiotherapy practices to analyze business operations, identify improvement opportunities, and enhance practice performance. This MVP focuses specifically on physiotherapy practices and provides a foundation for future expansion to other allied health disciplines.

## Features

### User Authentication and Profile Management
- Secure user registration and login
- Practice profile creation and management
- Role-based access control

### Assessment Modules
- Financial Health assessment
- Compliance & Risk evaluation
- Patient Care & Outcomes measurement
- Operations & Workflow analysis
- Technology & Automation assessment
- Facilities Management evaluation
- Marketing & Growth strategies
- Geographic Considerations analysis

### Results and Reporting
- Business Health Score calculation
- Detailed breakdown by category
- Comparison against industry benchmarks
- Prioritized recommendations
- Interconnectedness analysis

## Technology Stack

### Frontend
- Next.js with TypeScript
- Radix UI components
- TailwindCSS for styling
- Chart.js and D3.js for data visualization

### Backend
- Supabase for authentication, database, and storage
- PostgreSQL database with Row Level Security

### Deployment
- Docker containerization for private deployment

## Architecture

The application follows a modern web architecture:

1. **Client Layer**: Next.js frontend with React components
2. **API Layer**: Next.js API routes and Supabase client
3. **Data Layer**: PostgreSQL database managed by Supabase

## Database Schema

The database includes the following key tables:
- users
- practice_profiles
- assessment_modules
- assessment_questions
- assessment_responses
- recommendations
- business_area_interconnectedness

## Deployment

The application is containerized using Docker for private deployment. See the `docker-deployment-guide.md` for detailed instructions on:
- Building and running the container
- Configuring environment variables
- Setting up the database
- Sharing the application while maintaining privacy

## Future Development

Potential areas for future development include:
- Expansion to other allied health disciplines
- Advanced analytics and reporting
- Integration with practice management systems
- Mobile application
- Collaborative assessment features
- Historical trend analysis

## Support

For support or questions about the application, please contact the development team.
# SSH test
