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
- **User Profile**: Update profile, change password, upload avatar (with Supabase Storage)
- **Responsive Layout**: Dashboard and public pages

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/vieyama/next-shadcn-supabase-starter.git

or

npx degit vieyama/next-shadcn-supabase-starter my-app

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

## User Avatars with Supabase Storage

This starter supports uploading and updating user avatars using Supabase Storage:

- Avatar images are uploaded to your Supabase Storage bucket.
- The avatar URL is saved to the user's profile and displayed in the UI.
- You can customize the upload logic in `src/features/profile/avatar-upload.tsx`.

### How it works

- When a user selects a new avatar, the file is uploaded to Supabase Storage.
- The public URL is saved to the user's profile in your database.
- The avatar is displayed using the URL from Supabase Storage.

See the `AvatarUpload` component for implementation details and customization options.

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

## Code Quality: Prettier & Husky

This project uses **Prettier** for code formatting and **Husky** with `lint-staged` to enforce code quality before pushing to GitHub.

- All staged files are automatically formatted and linted before each push.
- You can manually run formatting and linting:

```sh
yarn format      # Format all files with Prettier
yarn lint        # Run ESLint on the codebase
```

### How it works

- Husky sets up a `pre-push` git hook.
- `lint-staged` runs Prettier (and optionally ESLint) on staged files.
- If any issues are found, the push will be blocked until they are fixed.

You can customize the rules in `eslint.config.mjs` and the hook in `.husky/pre-push`.

## Deployment

Deploy to Vercel, Netlify, or any platform supporting Next.js.

## Credits

- [Next.js](https://nextjs.org/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/)

---

Feel free to use, modify, and contribute to this starter!
