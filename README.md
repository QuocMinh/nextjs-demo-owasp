# Brute Force Attack Demo with Next.js

This project demonstrates a simple login page vulnerable to brute force attacks, built with Next.js, TypeScript, and TailwindCSS.

## Features

- Login form with username and password fields, styled using TailwindCSS
- Login handled via Next.js API route (`src/app/api/login/route.ts`)
- Hardcoded credentials: Username: `admin`, Password: `Admin12345`
- On successful login, a cookie `isLoggedIn` is set and user is redirected to the Home page (`/home`)
- Middleware (`src/middleware.ts`) protects the `/home` route, redirecting unauthorized users to a custom 403 page
- Custom 403 Forbidden page (`src/app/403/page.tsx`) for unauthorized access
- On failed login, an error message is displayed above the form

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the demo.

## File Structure

- `src/app/page.tsx`: Login page
- `src/app/api/login/route.ts`: API route for login logic
- `src/app/home/page.tsx`: Home page after successful login
- `src/app/403/page.tsx`: 403 Forbidden page
- `src/middleware.ts`: Middleware to protect `/home` route

## Note

This demo is intentionally simple and does not implement security best practices. Do not use this code in production.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
