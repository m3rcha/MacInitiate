# MacInitiate System Patterns

## Architecture Overview
```
Frontend (React/Next.js)
├── Components/
│   ├── AppSelector.tsx      # App selection interface
│   ├── TweakSelector.tsx    # System tweak selection
│   ├── ScriptGenerator.tsx  # Script generation logic
│   └── DownloadButton.tsx   # File download handler
├── Types/
│   └── catalog.ts           # Data structures and types
├── Utils/
│   └── scriptGenerator.ts   # Bash script generation logic
└── Data/
    └── appCatalog.ts        # App and tweak definitions
```

## Key Technical Decisions

### Client-Side Script Generation
- **Why**: No server dependencies, instant generation, privacy-focused
- **How**: Template literals with conditional logic based on selections
- **Benefits**: Fast, scalable, works offline, no server costs

### Fault-Tolerant Script Design
- **Pattern**: Custom error handling instead of `set -e`
- **Implementation**: Wrapper functions with error capture and logging
- **Result**: Individual failures don't stop the entire installation

### Modular Component Structure
- **Pattern**: Each major feature in separate component
- **Data Flow**: Props down, events up for selection state
- **State Management**: Local component state, lifted to parent when needed

## Critical Implementation Paths

### Script Generation Flow
1. User selects apps/tweaks → Selection state updates
2. Click "Generate Script" → Pass selected IDs to generator
3. Generator builds Bash script with safety checks
4. Script string passed to download component
5. Blob created and download triggered

### Error Handling Pattern
```bash
install_app() {
    local app_name="$1"
    local brew_id="$2"
    
    if brew install "$brew_id"; then
        echo -e "${GREEN}✓ Installed: $app_name${NC}"
        ((success_count++))
    else
        echo -e "${RED}✗ Failed: $app_name${NC}"
        ((failure_count++))
    fi
}
```

## Component Relationships
- `AppSelector` ↔ Parent (selection state)
- `TweakSelector` ↔ Parent (selection state)  
- `ScriptGenerator` ← Parent (receives selections)
- `DownloadButton` ← `ScriptGenerator` (receives script string)

## Data Structure Patterns
- Categories contain apps and tweaks
- Apps have `brew_id` for Homebrew installation
- Tweaks have `command` for `defaults write` operations
- Presets are arrays of pre-selected IDs
