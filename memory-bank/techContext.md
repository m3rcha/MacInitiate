# MacInitiate - Technical Context

## Technology Stack

### Core Framework
- **Next.js 14+ (App Router):** Modern React framework with server-side rendering capabilities
- **TypeScript:** Type safety for all data structures and component interfaces
- **React 18+:** UI library with concurrent features and hooks

### Styling & UI
- **Tailwind CSS:** Utility-first CSS framework with dark-mode priority
- **Lucide React:** Modern icon library for consistent iconography
- **Framer Motion:** Smooth animations and micro-interactions
- **Radix UI:** Accessible component primitives (dropdowns, toggles, modals)

### Data & State
- **Static JSON/TS Objects:** No external database, all data shipped with app
- **React Context + useReducer:** Global state management for selections
- **Zustand (optional):** Lightweight state management if complexity grows
- **Immer:** Immutable state updates for complex selections

### Build & Deployment
- **Vercel:** Primary deployment platform (Next.js optimized)
- **GitHub Actions:** CI/CD for automated testing and deployment
- **ESLint + Prettier:** Code quality and formatting standards
- **TypeScript Compiler:** Strict type checking and optimization

## Development Setup

### Prerequisites
```bash
# Required tools
- Node.js 18+ 
- npm or yarn
- Git
- Homebrew (for local testing)
```

### Project Structure
```
macinitiate/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Landing page
│   │   └── setup/             # Main setup flow
│   │       ├── page.tsx       # Setup wizard
│   │       └── loading.tsx    # Loading states
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base UI primitives
│   │   ├── AppSelector.tsx   # App selection interface
│   │   ├── TweakSelector.tsx # System tweaks interface
│   │   └── ScriptGenerator.tsx # Script preview/export
│   ├── data/                 # Static data definitions
│   │   ├── apps.ts          # App catalog
│   │   ├── tweaks.ts        # System tweaks
│   │   └── categories.ts    # Category definitions
│   ├── lib/                 # Utility functions
│   │   ├── script-generator.ts # Shell script builder
│   │   ├── validation.ts    # Input validation
│   │   └── storage.ts       # Local persistence
│   └── types/               # TypeScript type definitions
│       ├── apps.ts
│       ├── tweaks.ts
│       └── common.ts
├── public/                  # Static assets
├── scripts/                # Build/deployment scripts
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Technical Constraints

### Performance Requirements
- **Initial Load:** < 2 seconds on 3G connection
- **Search Response:** < 100ms for 200+ apps
- **Script Generation:** < 500ms for complex selections
- **Bundle Size:** < 500KB gzipped (excluding images)

### Browser Compatibility
- **Primary:** Safari 17+, Chrome 120+, Firefox 120+
- **Secondary:** Edge 120+ (Windows compatibility testing)
- **Mobile:** Responsive design for tablet usage (not primary use case)

### Data Limitations
- **App Catalog:** 200-500 curated apps (static)
- **System Tweaks:** 100-200 preferences (static)
- **Configuration Size:** < 50KB per user setup
- **Local Storage:** 5MB limit for saved configurations

## Dependency Management

### Core Dependencies
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "lucide-react": "^0.294.0",
    "framer-motion": "^10.16.0",
    "@radix-ui/react-*": "^1.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

### External API Dependencies
- **None:** Zero external API calls for core functionality
- **Optional:** GitHub API for community-contributed configs
- **Analytics:** Plausible/Vercel Analytics (privacy-focused)

## Security Considerations

### Client-Side Security
- **XSS Prevention:** React's built-in JSX escaping
- **Script Validation:** Sanitize generated shell commands
- **Content Security Policy:** Restrict external resource loading
- **Input Validation:** Zod schemas for all user inputs

### Generated Script Security
```typescript
// Example security validation
const validateCommand = (command: string): boolean => {
  const dangerousPatterns = [
    /rm\s+-rf/,           // Dangerous deletion
    />\s*\/dev\/null/,    // Data destruction
    /curl.*\|.*sh/,       // Remote script execution
    /sudo.*passwd/,       // Password changes
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(command));
};
```

## Tool Usage Patterns

### Development Workflow
1. **Local Development:** `npm run dev` with hot reload
2. **Type Checking:** `npm run type-check` on file changes
3. **Linting:** `npm run lint` with pre-commit hooks
4. **Testing:** Jest + React Testing Library for components
5. **Building:** `npm run build` with optimization analysis

### Code Quality Standards
- **TypeScript Strict Mode:** All files must pass strict compilation
- **Component Patterns:** Functional components with hooks only
- **CSS Organization:** Tailwind utilities with component-specific variants
- **Error Boundaries:** Graceful error handling for all major components

### Performance Optimization
- **Code Splitting:** Dynamic imports for heavy components
- **Image Optimization:** Next.js Image component for all assets
- **Bundle Analysis:** Webpack Bundle Analyzer for size monitoring
- **Caching Strategy:** Service Worker for offline capability
