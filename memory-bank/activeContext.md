# MacInitiate Active Context

## Current Work Focus
Building the core script generation logic for MacInitiate web application. This includes:
- Defining the app/tweak catalog data structure
- Implementing the Bash script generator function
- Creating the download functionality
- Ensuring fault-tolerant script generation

## Recent Changes
- Initialized memory bank documentation structure
- Created project foundation documents
- Established technical architecture patterns

## Current Task Implementation
Working on the script generation system with these components:

### 1. Data Structure (TypeScript)
```typescript
const catalog = {
  categories: [
    {
      id: 'development',
      name: 'Development',
      apps: [
        { id: 'vscode', name: 'VS Code', brew_id: 'visual-studio-code' }
      ]
    }
  ],
  tweaks: [
    { id: 'show-hidden', name: 'Show Hidden Files', command: 'defaults write com.apple.finder AppleShowAllFiles -bool true' }
  ],
  presets: [
    { id: 'dev', name: 'Developer', items: ['vscode', 'git', 'node', 'show-hidden'] }
  ]
}
```

### 2. Script Generator Function
- Function signature: `generateScript(selectedIds: string[]): string`
- Uses template literals for Bash script construction
- Includes comprehensive error handling and safety checks
- Provides colored terminal output (green for success, red for failures)

### 3. Download Component
- Creates Blob from generated script string
- Triggers download as `mac_initiate_setup.sh`
- Handles file creation in browser context

## Next Steps
1. Implement the complete catalog with popular macOS apps
2. Build the script generator with all safety features
3. Create React components for the UI
4. Add preset configurations for common use cases
5. Test generated scripts on fresh macOS installations

## Active Decisions
- **Client-side generation**: Chosen for privacy and instant feedback
- **No set -e**: Custom error handling for better user experience
- **Template literals**: Clean string interpolation for Bash scripts
- **TypeScript**: Type safety for complex data structures

## Important Patterns
- Modular component architecture
- Props down, events up data flow
- Utility-first styling with TailwindCSS
- Error-resistant script design philosophy

## Learnings & Insights
- Fault tolerance is critical for user trust
- Clear terminal feedback improves installation experience
- Preset configurations accelerate user decision-making
- Network checks and brew auto-installation reduce friction
