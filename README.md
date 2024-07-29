# Secure Keypad

This project is a web application that implements a secure keypad. Users can safely enter a 6-digit password using mouse clicks.

## Key Features

- Dialog opens when the password input field is focused
- Randomly arranged number buttons from 1 to 9
- Refresh, delete, and complete functions
- Send button activation upon entering a 6-digit password
- Password validation through Mock API

## Installation

```bash
pnpm install
```

## Running the Application

```bash
pnpm start
```

## Running Tests

```bash
pnpm test
```

## Technology Stack

- React
- TypeScript
- pnpm
- Shadcn UI, TailwindCSS
- MSW (Mock Service Worker)
- Jest, RTL (React Testing Library)

## Mock API Server

The Mock API server is implemented by modifying the handlers in the `server/handlers` directory. Using MSW (Mock Service Worker), API requests can be simulated without an actual backend.

## Design Components

UI is constructed using [Shadcn](https://ui.shadcn.com/) components located in the `component/ui` directory.
