# Task Manager Kanban

### This application has been created via Vite using the react-ts template flag and was downgraded to React 18.

## Startup Instructions

1. Install dependencies: `yarn install`
2. (Optional) Run dev server: `yarn dev` (starts at http://localhost:5173)
3. Build for production: `yarn build`
4. Preview build: `yarn preview` (starts at http://localhost:4173)

## Project Architecture Overview

- **/api**: Contains basic logic for interacting with API requests.
  - **_index.ts_**: Central configuration for API requests, including base URLs and headers.
- **/assets**: Contains resources like fonts and global styles.
  - **_/fonts_**: Font files used throughout the application.
  - **_/styles_**: CSS stylesheets for global styles, components, etc.
- **/components**: Reusable UI components, split into subdirectories for organizational purposes.
  - **_/layout_**: Components related to the overall structure.
  - **_/ui_**: Basic UI elements.
- **/config**: Configuration files for different aspects of the application.
  - **_columns.ts_**: Columns object configuration (Todo, In Progress, Done).
- **/providers**: Contains components that provide context or state to the application.
  - **_ReactQueryProvider.tsx_**: Sets up React Query with persister.
- **/services**: Serves to encapsulate and organize code related to interaction with external sources.
  - **_cloudinary.ts_**: Service for uploading files.
- **/store**: Provides state management logic.
  - **_index.ts_**: Centralized Zustand store configuration with persist middleware.
- **/types**: TypeScript interfaces and types for strict type-checking across the application.
  - **_board.ts_**: Currently contains **core entity types for the entire Kanban module** (and indirectly for Task & Modal modules).
- **/utils**: Utility functions for various operations.
  - **_board.ts_**: Collection of pure helper functions specifically for **Kanban board business logic**.

* You can find a brief description of the approach to modals in the comment (search keyword "Коментар")
