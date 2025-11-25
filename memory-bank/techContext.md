# MacInitiate Technical Context

## Technology Stack

### Frontend Framework
- **Next.js 14+**: React framework with App Router
- **React 18+**: UI library with hooks and modern patterns
- **TypeScript**: Type safety and better developer experience

### UI/UX Libraries
- **TailwindCSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **shadcn/ui**: High-quality component library
- **Framer Motion**: Smooth animations and transitions

### Development Tools
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting standards
- **Husky**: Git hooks for code quality
- **TypeScript**: Static type checking

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Modern browser with ES6+ support

### Project Structure
```
macinitiate/
├── src/
│   ├── app/                  # Next.js App Router
│   ├── components/           # React components
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   └── data/                # Static data and catalogs
├── public/                  # Static assets
├── memory-bank/            # Project documentation
└── package.json            # Dependencies and scripts
```

## Technical Constraints

### Browser Compatibility
- Modern browsers only (ES6+, Blob API supported)
- No IE support required
- Mobile responsive design optional but recommended

### Script Generation Limitations
- Client-side only (no server-side processing)
- File size limitations for generated scripts
- Must handle large app selections efficiently

### Security Considerations
- No external API calls during script generation
- All app data embedded in client-side code
- Generated scripts should be safe to execute

## Performance Requirements
- Script generation under 100ms for typical selections
- Smooth UI interactions with 60fps animations
- Efficient state management for large catalogs

## Deployment Considerations
- Static hosting compatible (Vercel, Netlify, GitHub Pages)
- No server-side rendering requirements
- CDN-friendly asset distribution
