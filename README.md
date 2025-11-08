# Atlas Office Planner

This repository contains a Vite + React implementation of an interactive office planning and booking experience inspired by the provided floor map. The application lets teammates explore the floor plan, review amenities, and reserve desks, rooms, or collaboration zones through an intuitive booking flow.

## Getting started

1. Install dependencies

   ```bash
   npm install
   ```

2. Launch the development server

   ```bash
   npm run dev
   ```

   The site will be available at [http://localhost:5173](http://localhost:5173).

3. Create a production build

   ```bash
   npm run build
   ```

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
