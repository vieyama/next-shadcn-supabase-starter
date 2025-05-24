# Next.js ShadCN Supabase Starter

A modern, full-stack starter template for building web applications with Next.js, ShadCN UI, and Supabase. This boilerplate provides authentication, user profile management, and a clean, extendable codebase for rapid development.

## Features

- **Next.js 14+**: App Router, SSR/SSG, file-based routing
- **ShadCN UI**: Beautiful, accessible, and customizable UI components
- **Supabase**: Authentication, database, and storage integration
- **TypeScript**: Type-safe codebase
- **Zod**: Schema validation for forms
- **React Hook Form**: Flexible form management
- **ESLint & Prettier**: Code quality and formatting
- **Authentication Flows**: Register, login, forgot/reset password
- **User Profile**: Update profile, change password, upload avatar
- **Responsive Layout**: Dashboard and public pages

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/vieyama/next-shadcn-supabase-starter.git
cd next-shadcn-supabase-starter
```

### 2. Install Dependencies

```sh
yarn install
# or
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your Supabase project credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_APPS_URL=http://localhost:3000
```

### 4. Run the Development Server

```sh
yarn dev
# or
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

- `src/app/` — Next.js app directory (routing, pages)
- `src/components/ui/` — ShadCN UI components
- `src/features/auth/` — Authentication views and logic
- `src/features/profile/` — User profile management
- `src/utils/supabase/` — Supabase client/server utilities
- `src/lib/` — Shared utilities

## Authentication Flows

- **Register**: `/auth/register`
- **Login**: `/auth/login`
- **Forgot Password**: `/auth/forgot-password`
- **Reset Password**: `/auth/reset-password?code=...`

## Customization

- Add new pages in `src/app/`
- Extend UI with ShadCN components in `src/components/ui/`
- Add new features in `src/features/`

## Linting & Formatting

```sh
yarn lint
# or
npm run lint
```

## Deployment

Deploy to Vercel, Netlify, or any platform supporting Next.js.

## Credits

- [Next.js](https://nextjs.org/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/)

---

Feel free to use, modify, and contribute to this starter!
