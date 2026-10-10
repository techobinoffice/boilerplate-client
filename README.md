# Client Boilerplate

A starter for React apps built with Vite, TypeScript, Tailwind CSS, SCSS, React Router, React Query, Axios and React Hook Form. It ships with authentication and a protected admin area wired to the sibling [`api`](../api) boilerplate; everything else is the reusable architecture.

## Setup

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev
```

The app runs on `http://localhost:3000`, which is the origin the api expects in `CORS_ORIGIN` and `RESET_PASS_UI_LINK`. Start the api first (`yarn start` in `../api`) and set `SUPER_ADMIN_EMAIL` / `SUPER_ADMIN_PASSWORD` there to get an account that can open the Users page.

## Environment

- `VITE_API_URL` - api base url, e.g. `http://localhost:5000/api/v1`
- `VITE_BASE_URL` - api origin, for files served by the backend
- `VITE_FRONTEND_URL` - public url of this app

## Folder Structure

```
src
├── main.tsx                # BrowserRouter, QueryClientProvider, Toaster
├── App.tsx                 # Navbar / Footer shell for public pages
├── routes/
│   ├── pages.tsx           # imports and re-exports every page
│   └── index.tsx           # route table
├── config/                 # env variables, roles
├── lib/index.ts            # Axios client, token header, refresh on 401
├── services/
│   ├── api.ts              # every endpoint
│   ├── queries.ts          # useQuery hooks
│   └── mutations.ts        # useMutation hooks with toasts and invalidation
├── types/                  # ApiResponse, Meta and one file per module
├── utils/                  # auth storage, logout, formatters, toastApiError
├── styles/                 # SCSS colors, mixins, typography, global
├── components/
│   ├── layout/             # protected layout and RoleGuard
│   ├── Sidebar/            # menuConfig.tsx drives the sidebar and page search
│   ├── Header/             # page search and user dropdown
│   ├── modal/              # confirm modal and form modals
│   └── ...                 # pagination, deleteAction, clickOutside, navbar, footer
└── pages/                  # one folder per page, optional .scss next to it
```

## Pages

- Public, inside the Navbar / Footer shell: `/`, `/login`, `/register`, `/forgot-password`, `/reset-password`
- Protected, inside the sidebar layout: `/dashboard`, `/settings`, `/users` (admin and super admin)

## Authentication

- Login stores `{ token, user }` in `localStorage` under `user`. The layout redirects to `/login` when it is missing.
- Every request sends the access token in the `Authorization` header (the raw token, without `Bearer`).
- The refresh token lives in an httpOnly cookie set by the api. On a `401` the client calls `POST /auth/refresh-token`, saves the new access token and repeats the request. If the refresh fails, the user is logged out.
- The api has no logout endpoint, so logging out only clears `localStorage`.

## Adding a Module

1. `src/types/<name>.ts` - types
2. `src/services/api.ts` - endpoint functions returning `ApiResponse<T, M>`
3. `src/services/queries.ts` / `mutations.ts` - hooks, invalidate the list key in `onSettled`
4. `src/pages/<name>/index.tsx` - the page
5. `src/routes/pages.tsx` and `src/routes/index.tsx` - register the route under `DefaultLayout` (wrap it in `RoleGuard` to restrict it)
6. `src/components/Sidebar/menuConfig.tsx` - add the menu item, with `roles` if it is restricted

A new public page also needs its path in `pathsWithNavbar` in `src/App.tsx`.

## Styling

Tailwind is the default. Shared SCSS variables and mixins are in `src/styles`, use them with `@use "../../styles/index" as *;` in a `.scss` file next to the component. Dark variants are opt in: they apply when a parent has the `dark` class.

## Scripts

- `npm run dev` - dev server on port 3000
- `npm run build` - type check and production build
- `npm run preview` - serve the build
- `npm run lint`
