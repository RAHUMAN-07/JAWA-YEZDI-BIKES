# Jawa Yezdi Motorcycles — Interactive Showcase & 3D Configurator

A premium, interactive web application showcasing the legendary **Jawa** and **Yezdi** motorcycle fleets. Rebuilt with a modern **White, Red, and Blue color theme**, a custom geometric brand shield logo, and advanced features like a 3D configurator, spec comparison engine, and a scroll-triggered picture-in-picture video player.

---

## 🚀 Key Features

*   **Interactive Hero Slideshow**: Seamlessly browse the Jawa & Yezdi fleets with key specs (Power, Torque, Displacement) and custom animations.
*   **3D-Like Bike Configurator**: Customize your dream motorcycle in a virtual garage sandbox. Select custom paint colors (Classic Chrome, Crimson Red, Royal Blue, Stealth Matte), seat styles (Classic Tan Leather, Stealth Black, Dual Comfort), exhaust layouts, and wheel trims. Configurations are saved directly to your personalized garage.
*   **Comparison Dashboard**: Select up to three motorcycles simultaneously to run a side-by-side spec sheet comparison (power, weight, chassis, pricing, and torque).
*   **Heritage Timeline**: Explore the 90+ year historic timeline of Jawa Yezdi since its European establishment in 1929.
*   **Test Ride Booking**: Book test rides with real-time slot selection, seamlessly integrated with Firebase Database backend services.
*   **Rider Community Dashboard**: Navigate local riding clubs, group rides, maps, difficulty metrics, and community statistics.
*   **Scroll-Triggered YouTube Player**: A floating picture-in-picture (PIP) brand film widget that slides into view upon scrolling. It features an interactive **"Tap for Full Sound"** sound control overlay to bypass browser autoplay policies.
*   **Custom Brand Logo Badge**: A premium, geometric SVG shield outline enclosing intertwined 'J' and 'Y' characters in Jawa Red and Yezdi Blue.

---

## 🛠️ Technology Stack

*   **Core Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite 8](https://vite.dev/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using `@tailwindcss/vite` plugin for native compilation)
*   **Animations**: [Framer Motion 12](https://www.framer.com/motion/) for premium page transitions, scroll reveal physics, and slider animations
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Database**: [Firebase Web SDK](https://firebase.google.com/) (real-time storage for custom bike configurations and test ride bookings)

---

## 🎨 Theme & Styling System

The application is styled with a premium **White, Red, and Blue mixing** theme:
*   **Base background**: Pure white `#ffffff` and slate-50 accents.
*   **Primary Brand Red**: `#dc2626` (representing Jawa's timeless roadster heritage).
*   **Primary Brand Blue**: `#2563eb` (representing Yezdi's modern adventurous attitude).
*   **Dual-tone Gradients**: Buttons, active indicators, and glow backdrops feature a smooth gradient blending from Red directly to Blue (`bg-gradient-to-r from-red-600 to-blue-600`).

---

## 📦 Directory Structure

```
JAWA-YEZDI-BIKES-main/
├── src/
│   ├── components/
│   │   ├── BrandLogo.tsx             # Custom SVG shield badge logo
│   │   ├── FloatingVideoPlayer.tsx   # Scroll-triggered YouTube player
│   │   ├── Navbar.tsx                # Responsive glassmorphism navigation
│   │   ├── Hero.tsx                  # Landing showcase slider
│   │   ├── OfficialFeatures.tsx      # Video sections & comparison summaries
│   │   ├── Fleet.tsx                 # Model grid & filter dashboard
│   │   ├── CompareModal.tsx          # Multi-bike specifications compare overlay
│   │   ├── Configurator.tsx          # 3D Customizer garage sandpit
│   │   ├── BookingForm.tsx           # Test-ride registration page
│   │   ├── Heritage.tsx              # Interactive timeline
│   │   ├── Community.tsx             # Riders kommuniti hub
│   │   ├── Garage.tsx                # User dashboard (bookings & custom builds)
│   │   └── IntroAnimation.tsx        # Light-themed entry screen
│   ├── App.tsx                       # Main application state wrapper
│   ├── index.css                     # Global styles, variables, & animations
│   ├── main.tsx                      # Entry point
│   └── firebase.ts                   # Backend Firebase services config
├── public/                           # Static assets and images
├── package.json                      # Dependency scripts
└── tsconfig.json                     # TypeScript configurations
```

---

## 💻 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd JAWA-YEZDI-BIKES-main
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory (optional, if you want to connect your custom Firebase instance):
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### Running Locally

To start the Vite local development server:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser to view the application.

### Building for Production

To run the TypeScript checker compiler and bundle the project for distribution:
```bash
npm run build
```
The optimized static build assets will be generated in the `dist/` directory, ready to deploy.
