# MatriQ - Frontend

React and Next.js frontend application for MatriQ, a material sourcing platform for architects, interior designers, and construction engineers. MatriQ streamlines material discovery, technical specification verification, and the Request for Quote (RFQ) process into a single digital workspace.

## Project Links
- Backend Repository: https://github.com/shebnem-m/MatriQ-backend
- Live Application: https://matriq-frontend-tan.vercel.app

## Tech Stack
- Next.js (App Router)
- React
- Tailwind CSS
- Lucide React (for modern SVG iconography)
- Axios / Native Fetch
- JWT Authentication (httpOnly Cookies)

## Project Architecture and Folder Rules
To maintain consistency across all team members, the following architectural guidelines are strictly enforced:

1. App Router: All route definitions reside in the `app/` directory. Files in this directory must remain thin and delegate rendering logic to features.
2. Feature-Sliced Design: Business logic is organized under `src/features/{feature}/`. Each feature directory encapsulates its own components, hooks, type definitions, and API client calls.
3. Code Reusability: Generic presenter elements (buttons, inputs, tables, modals) are maintained inside `src/components/ui/` and must not be duplicated.
4. Centralized Network Requests: All external API interactions must utilize the shared configured client in `src/lib/apiClient.js` to ensure uniform credential and session context propagation.
5. Auth Guards: Access to protected routes is globally regulated utilizing the shared `<ProtectedRoute>` component.

## Route Documentation

### Public Routes
- `/` - Landing and system overview portal
- `/login` - Authentication gate
- `/register` - User registration workspace
- `/listings` - Material exploration, filtering, and paging
- `/listings/[id]` - Material technical breakdown and client reviews
- `/suppliers` - Register of verified production suppliers
- `/suppliers/[id]` - Supplier profile and associated catalog

### Private User Routes
- `/profile` - Client account and notification settings
- `/orders` - Personal transaction and order history
- `/orders/[id]` - Individual order details and processing status
- `/orders/checkout` - Quote request execution view

### Protected Supplier Routes
- `/listings/new` - Listing management and creation suite
- `/suppliers/dashboard` - Supplier transaction and order management workspace

### Admin Management Routes
- `/admin` - Base layout for platform management (restricted to ADMIN role)
- `/admin/users` - Role assignment and user account moderation
- `/admin/orders` - Platform transaction tracking and oversight
- `/admin/listings` - Catalog filtering and review deletion
- `/admin/suppliers` - Manufacturer authentication and approval workspace

## Environment Variables
Create a local configuration file named `.env.local` in the root of the project to bind the variables:

- NEXT_PUBLIC_API_URL - Base destination URL for the running Spring Boot service

## Installation and Development Setup

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn package manager

### Local Installation
1. Clone the repository:
   git clone https://github.com/shebnem-m/MatriQ-frontend.git

2. Navigate to the project directory:
   cd MatriQ-frontend

3. Install project dependencies:
   npm install

4. Configure local variables:
   Create a `.env.local` file in the root directory and configure the environment:
   NEXT_PUBLIC_API_URL=http://localhost:8080

5. Run the development server:
   npm run dev

6. Access the workspace locally at http://localhost:3000.

### Compilation and Build
To compile optimized production assets:

npm run build

This outputs optimized assets to the `.next` directory.

## Team Information
- Shabnam Muradova - Profile Page, Admin Panel Dashboard, Admin Users Management & Frontend Deployment  
  [GitHub](https://github.com/shebnem-m)
- Mohsin - Supplier Directory, Dashboard & Verification Workspaces  
  [GitHub](https://github.com/Anar5432)
- Yaqut Rasulbayli - Material Catalog, Review Integrations & Access Moderation  
  [GitHub](https://github.com/yagutrslbyl)
- Nihad Bagirzade - Application Shell, Order Tracking, Authentication (Register/Login) & Session Flows  
 [GitHub](https://github.com/TheGlitch26)
  
