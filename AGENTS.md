## Commands

- Use `npm` scripts in this repo: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`.
- `npm run dev` and `npm run preview` both bind to `0.0.0.0:3000`. The api boilerplate allows this origin in `CORS_ORIGIN`.
- `npm run build` runs `tsc && vite build`.
- There is no test script, CI workflow or formatter config here.

## Architecture

- This is a single-package Vite + React + TypeScript app.
- App bootstrap is `src/main.tsx`: `BrowserRouter`, `QueryClientProvider`, `react-hot-toast`, and React Query Devtools only in development.
- Routing is centralized in `src/routes/index.tsx` and `src/routes/pages.tsx`.
- Authenticated pages are nested under `src/components/layout/index.tsx`; that layout redirects to `/login` when `localStorage.user` is missing. Role restricted routes are wrapped in `src/components/layout/roleGuard.tsx`.
- Public routes are outside that layout. `src/App.tsx` separately decides whether to show the shared `Navbar` and `Footer` via the `pathsWithNavbar` whitelist. If you add a new public page, update both the route table and that whitelist or the shell will be wrong.
- The sidebar and the header page search are both generated from `src/components/Sidebar/menuConfig.tsx`.

## Data Layer

- Keep API work in the existing service stack instead of ad hoc fetches.
- `src/lib/index.ts` owns the shared Axios client, injects `Authorization` from `localStorage.user`, and auto-refreshes tokens through `/auth/refresh-token` on `401`.
- `src/services/api.ts` is the central endpoint file.
- `src/services/queries.ts` and `src/services/mutations.ts` wrap that API with React Query hooks and existing invalidation patterns.
- Responses follow `ApiResponse<T, M>` in `src/types/index.ts`; list endpoints return `meta: { page, limit, total }`.
- Roles are `super_admin`, `admin`, `user` (`src/config/roles.ts`) and must match the api enum.

## Runtime And Styling

- The app expects Vite env vars: `VITE_API_URL`, `VITE_BASE_URL`, `VITE_FRONTEND_URL`.
- Tailwind is enabled through `src/index.css`, and some UI styling lives in per-component/page `.scss` files next to the TSX files. Check both before changing UI.
