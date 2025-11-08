# Atlas Office Planner

This repository contains a Vite + React implementation of an interactive office planning and booking experience inspired by the provided floor map. The application lets teammates explore the floor plan, review amenities, and reserve desks, rooms, or collaboration zones through an intuitive booking flow.

## Requirements

Make sure the following tools are installed before working with the project:

- **Node.js 18** or newer. Install it from [nodejs.org](https://nodejs.org/) or via a version manager like
  [nvm](https://github.com/nvm-sh/nvm).
- **npm 9** or newer (bundled with the Node.js download). You can use an alternative package manager such as Yarn or pnpm if
  you prefer, but the documented commands assume npm.
- Git for cloning the repository.

## Getting started

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-org>/LinkBeam---test.git
   cd LinkBeam---test/office-planner
   ```

2. **Install project dependencies**

   ```bash
   npm install
   ```

   > If you are working in a restricted or offline environment, make sure you have access to the npm registry or a compatible
   > proxy/cache so that dependencies such as `react`, `vite`, and the TypeScript type packages can be downloaded.

3. **Launch the development server**

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173). Any code changes will hot-reload automatically.

4. **Create a production build** (optional)

   ```bash
   npm run build
   ```

   The optimized assets will be emitted into the `dist/` folder. You can preview the production build locally with

   ```bash
   npm run preview
   ```

   which serves the files from `dist/` on [http://localhost:4173](http://localhost:4173).

## Features

- **Interactive floor map** – Overlay zones, desk neighborhoods, and rooms onto the supplied plan for quick navigation.
- **Powerful filtering** – Search by name, filter by space type, or jump to specific office zones.
- **Integrated booking flow** – Reserve a space for a selected day and time slot, complete with conflict detection.
- **Reservation timeline** – Review and cancel existing bookings directly from the sidebar.
- **Accessible design system** – Responsive layout, high-contrast callouts, and semantic markup for clarity.

## Project structure

```
office-planner/
├── public/            # Static assets such as the simplified floor plan SVG
├── src/
│   ├── components/    # Reusable UI components (map, sidebar, filters, etc.)
│   ├── context/       # Booking state management with React context + reducer
│   ├── data/          # Floor space definitions and booking time slots
│   ├── styles/        # Component-level and global styling
│   └── main.tsx       # Application bootstrap
├── index.html         # Vite entry document
├── package.json       # Dependencies and scripts
└── vite.config.ts     # Vite configuration
```

## Tech stack

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
