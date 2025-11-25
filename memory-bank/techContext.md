# MacInitiate - Technical Context

## Technology Stack (Developer-First Optimized)

### Core Framework
- **Next.js 16+ (App Router):** Modern React framework with enhanced performance
- **TypeScript:** Strict type safety for all data structures and component interfaces
- **React 19+:** Latest UI library with concurrent features and improved hooks

### Developer Experience & UI
- **Tailwind CSS:** Utility-first CSS with dark-mode priority and developer-focused design system
- **Lucide React:** Modern icon library for consistent developer tool iconography
- **Framer Motion:** Smooth animations for micro-interactions and template transitions
- **Radix UI:** Accessible component primitives (dropdowns, toggles, modals)
- **React Hook Form:** Form handling for template creation and team management

### Data & State Management
- **Static JSON/TS Objects:** Zero external database, all data shipped with app for reliability
- **React Context + useReducer:** Global state management for selections
- **Zustand:** Lightweight state management for complex social features
- **Immer:** Immutable state updates for complex selections and team configurations
- **React Query:** Server state management for user profiles and team data

### Social & Team Features
- **NextAuth.js:** Authentication for GitHub OAuth and team management
- **Prisma:** Type-safe database for user profiles, templates, and team configurations
- **Supabase:** Backend-as-a-Service for real-time collaboration features
- **Resend:** Email service for team invitations and setup sharing

### Build & Deployment
- **Vercel:** Primary deployment platform (Next.js optimized with Edge Functions)
- **GitHub Actions:** CI/CD for automated testing and deployment
- **Playwright:** End-to-end testing for script generation and template flows
- **ESLint + Prettier:** Code quality and formatting standards
- **TypeScript Compiler:** Strict type checking and optimization

### Analytics & Growth
- **PostHog:** Product analytics for template usage and conversion tracking
- **Plausible:** Privacy-focused web analytics
- **Vercel Analytics:** Performance monitoring and error tracking

## Development Setup

### Prerequisites
```bash
# Required tools
- Node.js 18+ 
- npm or yarn
- Git
- Homebrew (for local testing)
```

### Enhanced Project Structure
```
macinitiate/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Developer-focused landing page
│   │   ├── setup/             # Main setup flow
│   │   │   ├── page.tsx       # Template-first wizard
│   │   │   ├── templates/     # Template selection page
│   │   │   └── share/         # Setup sharing page
│   │   ├── dashboard/         # User dashboard (Pro feature)
│   │   ├── teams/             # Team management (Team feature)
│   │   └── api/               # API routes for social features
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base UI primitives
│   │   ├── templates/        # Template selection and creation
│   │   ├── social/           # Sharing and profile components
│   │   ├── teams/            # Team management components
│   │   ├── AppSelector.tsx   # Enhanced app selection
│   │   ├── TweakSelector.tsx # Developer-optimized tweaks
│   │   └── ScriptGenerator.tsx # Multi-source script generation
│   ├── data/                 # Static data definitions
│   │   ├── apps.ts          # Developer-curated app catalog
│   │   ├── tweaks.ts        # Developer-optimized system tweaks
│   │   ├── templates.ts     # Role-based templates
│   │   └── categories.ts    # Developer-focused categories
│   ├── lib/                 # Utility functions
│   │   ├── script-generator.ts # Enhanced shell script builder
│   │   ├── template-engine.ts  # Template processing logic
│   │   ├── team-management.ts  # Team configuration logic
│   │   ├── social-sharing.ts   # Viral sharing features
│   │   └── validation.ts    # Input validation
│   ├── hooks/               # Custom React hooks
│   │   ├── useTemplates.ts  # Template selection logic
│   │   ├── useTeamConfig.ts # Team configuration state
│   │   └── useAnalytics.ts  # Conversion tracking
│   └── types/               # TypeScript type definitions
│       ├── apps.ts
│       ├── tweaks.ts
│       ├── templates.ts
│       ├── teams.ts
│       └── social.ts
├── prisma/                  # Database schema for social features
├── public/                  # Static assets
├── scripts/                # Build/deployment scripts
├── package.json
└── next.config.js
```

## Technical Constraints (Updated for Scale)

### Performance Requirements
- **Initial Load:** < 2 seconds on 3G connection
- **Template Selection:** < 50ms for role-based filtering
- **Script Generation:** < 300ms for complex team configurations
- **Bundle Size:** < 750KB gzipped (including social features)
- **Concurrent Users:** 10,000+ simultaneous setup generations

### Browser Compatibility
- **Primary:** Safari 17+, Chrome 120+, Firefox 120+ (latest macOS)
- **Secondary:** Edge 120+ (Windows cross-platform testing)
- **Mobile:** Tablet-optimized for team setup management

### Data Limitations (Scalable)
- **App Catalog:** 500+ curated developer tools (static)
- **System Tweaks:** 200+ developer-optimized preferences (static)
- **User Templates:** Unlimited (database-stored)
- **Team Configurations**: 1000+ teams (database-stored)
- **Configuration Size**: < 100KB per complex team setup

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
