# HireTrack AI

A modern, AI-powered Applicant Tracking System (ATS) and recruitment platform built with Next.js 16, TypeScript, Prisma, and Neon PostgreSQL.

## Features

- 🎯 **Dashboard** - Real-time recruitment metrics and hiring pipeline visualization
- 📋 **Job Management** - Create, manage, and track job postings
- 👥 **Candidate Tracking** - Track candidates through hiring stages (Applied → Screening → Interview → Offer → Hired)
- 🔐 **Authentication** - Secure authentication with NextAuth.js
- 🌓 **Dark Mode** - Full light/dark theme support
- 📱 **Responsive** - Mobile-first design that works on all devices

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [Neon PostgreSQL](https://neon.tech/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Auth:** [NextAuth.js v5](https://next-auth.js.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Password Hashing:** bcryptjs

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (Neon recommended)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd hiretrack-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

4. Run database migrations:
```bash
npx prisma migrate dev
npx prisma generate
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
hiretrack-ai/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   └── jobs/            # Job & candidate endpoints
│   ├── dashboard/           # Dashboard page
│   ├── jobs/                # Job management pages
│   ├── login/               # Login page
│   └── types/               # TypeScript type definitions
├── components/              # Reusable React components
│   ├── dashboard/           # Dashboard-specific components
│   └── logout-button.tsx    # Logout component
├── lib/                     # Utility functions
│   └── prisma.ts            # Prisma client instance
├── prisma/                  # Prisma schema and migrations
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
└── public/                  # Static assets

```

## Database Schema

Key models:
- **User** - Recruiters and HR staff
- **Job** - Job postings with status (DRAFT, OPEN, CLOSED)
- **Candidate** - Candidate profiles with resume data
- **Application** - Links candidates to jobs with status tracking
- **Interview** - Interview scheduling and feedback
- **ResumeAnalysis** - AI-powered resume analysis results

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Development Workflow

1. Make changes to the code
2. Run `npm run lint` to check for issues
3. Run `npm run build` to verify production build
4. Test locally before committing

## Contributing

This is a private project. For questions or issues, contact the development team.

## License

Proprietary - All rights reserved
