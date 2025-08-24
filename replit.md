# Overview

Chess Nexus is a strategic business simulation game that combines chess-inspired gameplay with AI-powered decision-making scenarios. The application gamifies business strategy learning by presenting users with complex market scenarios where they make critical decisions and receive performance feedback. The platform uses a chess metaphor to teach strategic thinking, with each move representing business decisions that have real-world implications.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built with **React 18** and **TypeScript**, utilizing a modern component-based architecture. The application uses **Vite** as the build tool for fast development and optimized production builds. The UI is constructed with **shadcn/ui** components built on top of **Radix UI** primitives, providing accessible and customizable interface elements.

The application follows a **single-page application (SPA)** pattern with client-side routing using **React Router**. State management is handled through **TanStack Query** for server state and React's built-in state management for local component state.

The styling system uses **Tailwind CSS** with a custom design system implementing a futuristic strategic theme. CSS variables define a consistent color palette using HSL values, with a dark theme featuring strategic cyan as the primary brand color.

## Backend Architecture
The backend is built with **Express.js** and **TypeScript**, following a RESTful API design pattern. The server architecture separates concerns through distinct modules:

- **Routes module** handles API endpoint definitions and HTTP request routing
- **Storage interface** abstracts data persistence operations through a clean interface pattern
- **Memory storage implementation** provides in-memory data storage for development and testing

The server includes middleware for request logging, JSON parsing, and error handling. Development mode integrates with Vite for hot module replacement and development tooling.

## Data Storage Solutions
The application is designed with **database abstraction** through the storage interface pattern. Currently implements **in-memory storage** for development, but is architected to support **PostgreSQL** through **Drizzle ORM**.

The data layer includes:
- **User management** with username/password authentication schema
- **Drizzle schema definitions** for type-safe database operations
- **Database migration support** through Drizzle Kit
- **Environment-based configuration** for database connections

## Authentication and Authorization
The application includes a basic user system with:
- **User registration and login** capabilities through the storage interface
- **Session management** infrastructure using connect-pg-simple for PostgreSQL session storage
- **Type-safe user operations** with Zod schema validation

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless** - Serverless PostgreSQL database client
- **drizzle-orm** and **drizzle-zod** - Type-safe ORM with schema validation
- **@tanstack/react-query** - Server state management and caching

### UI and Design System
- **@radix-ui/** components - Accessible UI primitives (accordion, dialog, dropdown, etc.)
- **tailwindcss** - Utility-first CSS framework
- **class-variance-authority** - Component variant management
- **lucide-react** - Icon library

### Development and Build Tools
- **vite** - Build tool and development server
- **esbuild** - JavaScript bundler for production builds
- **@replit/vite-plugin** suite - Replit-specific development tooling
- **tsx** - TypeScript execution environment

### Form and Validation
- **react-hook-form** and **@hookform/resolvers** - Form management
- **zod** - Runtime type validation

### Database and Session Management
- **connect-pg-simple** - PostgreSQL session store for Express
- **drizzle-kit** - Database migration and management tools

The architecture supports both development and production environments with appropriate tooling and optimizations for each context.