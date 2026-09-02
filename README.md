# Shopping Cart Application

A modern, responsive e-commerce shopping cart application built with React, TypeScript, and Vite. This project demonstrates core frontend development skills including state management, API integration, data validation, and responsive UI design without over-engineering.

## Project Overview

This application serves as an internship assignment demonstrating the ability to build a complete, production-quality frontend application. It features a product listing with search and filtering, a persistent shopping cart, and a multi-step checkout flow.

## Technologies Used

* **React 19** - UI Library
* **TypeScript** - Static Typing
* **Vite** - Build Tool & Development Server
* **Tailwind CSS 4** - Utility-first CSS framework for styling
* **Zustand** - Global state management (for cart)
* **TanStack Query** - Data fetching, caching, and state management (for products)
* **Zod** - Schema validation for API responses and checkout forms
* **localStorage** - For cart state persistence
* **React Router DOM** - Application routing
* **Lucide React** - Iconography

## Setup Instructions

1. Ensure you have Node.js and `pnpm` installed on your machine.
2. Clone this repository or download the source code.
3. Navigate to the project directory.

## Commands

* Install dependencies:
  ```bash
  pnpm install
  ```
* Start development server:
  ```bash
  pnpm dev
  ```
* Build for production:
  ```bash
  pnpm build
  ```
* Preview production build locally:
  ```bash
  pnpm preview
  ```

## API Used

The application uses the public [DummyJSON Products API](https://dummyjson.com/products) to fetch mock product data. This API provides realistic product information including titles, prices, descriptions, images, and categories.

## Features Completed

- [x] **Project Setup**: Vite + React + TypeScript configuration.
- [x] **Product Listing**: Responsive grid displaying products fetched from DummyJSON.
- [x] **Search & Filtering**: Custom hook for filtering products by title, category, and price range.
- [x] **Cart State**: Zustand store for adding, removing, and updating product quantities (limited to 1-5).
- [x] **Cart Persistence**: Cart state persists across page reloads using localStorage.
- [x] **Cart Calculations**: Centralized logic for subtotal, 5% tax, and 10% discount (on orders over $100).
- [x] **Minimum Checkout**: Enforced $10 minimum subtotal before checkout is allowed.
- [x] **Multi-step Checkout**: A 3-step checkout flow (Review -> Shipping -> Payment).
- [x] **Form Validation**: Strict validation of shipping details using Zod.
- [x] **Responsive UI**: Optimized layout for Mobile, Tablet, and Desktop.
- [x] **Error Handling**: Graceful loading, empty, and error states across the application.

## Known Limitations

* **Payment Gateway**: There is no actual payment processing integrated. The "Place Order" button simulates a successful transaction without processing real payments.
* **Backend Validation**: Since there is no custom backend, inventory limits and price verification are only handled on the client side.

## Architecture Explanation

* **Product Fetching**: Data fetching is entirely separated from global state. `useProducts.ts` leverages TanStack Query to fetch, cache, and manage loading/error states for products.
* **Validation**: The raw API response is parsed through a Zod schema (`productSchema.ts`) ensuring runtime type safety before the data enters the application. Shipping forms are also validated using Zod schemas (`shippingSchema.ts`).
* **State Management**: 
  - **Zustand** is exclusively used for user-specific, mutable state (the Shopping Cart). It uses the `persist` middleware to automatically sync cart data with `localStorage`.
  - **TanStack Query** is exclusively used for server state (Product Data).
  - **React State** (`useState`) is used for localized component state like form inputs and checkout steps.
* **Calculations**: All cart math (subtotal, tax, discount) is extracted into pure functions in `src/utils/cartCalculations.ts` to ensure consistency and testability.
* **Component Separation**: UI elements are broken down into logical, reusable components (e.g., `ProductCard`, `CartSummary`, `EmptyState`) to keep the codebase maintainable and readable.
