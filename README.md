## Project Description

- Software Requirements App is an AI-powered application that takes natural language input from users describing the software they want to build. It uses Deepseek R1 from Huggingface to intelligently extract and display relevant software requirements in a clean, user-friendly table.

## How To Run

#### 1) Clone this repo from `Github`.

#### 2) Using the command line navigate to the root of the project folder where the package.json is located and run `npm install`.

#### 3) Create a `.env.local` file.

#### 4) Include each of these keys:

- `DATABASE_URL=your-sqlite-db`.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key-created-on-signup`.
- `CLERK_SECRET_KEY=your-clerk-secret-key`.
- `NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL= a-url-you-want-to-redirect-to-after-sign-in`.
- `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL= a-url-you-want-to-redirect-to-after-sign-up`.
- `API_KEY=your-huggingface-api-key-for-using-deepseek-r1`.

#### 5) Run the App With `npm run dev`.

## Tech Stack

### Frontend

- Next.js (App Router)
- Tailwind CSS
- Shadcn UI
- Redux Toolkit (state managment)

### Backend

- Next.js API Routes
- Clerk (Authentication)

### Database

- Prisma (ORM)
- PostgreSQL (serverless with Neon)

## Try Live

[Software Requirements App](#)
