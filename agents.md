# MacInitiate - Memory Bank

## Project Overview
**Mission:** Build the ultimate "Day 1" onboarding web tool for macOS users. When users format their Mac or buy a new one, they visit macinitiate.com, select apps and system preferences, and get a single Terminal command to set up their entire machine automatically.

## Core Protocols
1. **Memory Bank Protocol:** Must read agents.md before every response, update after significant decisions
2. **2025 Standard Rule:** Strict prohibition on deprecated software, prioritize modern high-performance tools
3. **Tech Stack:** Next.js 14+ (App Router), Tailwind CSS (dark-mode first), Static JSON/TypeScript data

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS (Modern, dark-mode first UI)
- **Data:** Static JSON/TypeScript objects (No external database)
- **Logic:** Shell script generator combining `brew install --cask` and `defaults write` commands

## Scope of Work
- **Module A: App Store (Homebrew Wrapper):** Categorized, searchable list of apps
- **Module B: Tweaker (System Preferences):** Boolean toggles for macOS system settings
- **Module C: Generator:** Logic to output single copy-pasteable command or downloadable .sh file

## Current Phase: Phase 0 - Architectural Review & Innovation
**Status:** In Progress
**Focus:** Product strategy, feature innovation, data structure design

## Active Tasks
- [x] Initialize Memory Bank (agents.md)
- [x] Create comprehensive Memory Bank structure
- [x] Review concept and identify gaps
- [ ] Brainstorm 3 "Killer Features"
- [ ] Design scalable data structures for Apps and Tweaks
- [ ] Present Phase 0 analysis

## Key Decisions & Patterns
- Modern-first approach (2025 Standard)
- Static data approach for simplicity and reliability
- Focus on developer/power user tools
- Single command execution philosophy

## User Rules
- Verify Homebrew Cask IDs before inclusion
- No deprecated software suggestions
- Prioritize high-performance, modern tools
- Professional, visionary, technically precise tone

## Next Steps
- Complete Phase 0 architectural analysis
- Begin Phase 1: Project setup and core structure
- Implement Module A: App Store
- Implement Module B: Tweaker
- Implement Module C: Generator

## Project Insights
- Target audience: Developers, power users, tech enthusiasts
- Value proposition: Zero-config macOS setup
- Differentiator: Curation, modern tooling, single-command simplicity

---

# Cline's Memory Bank Structure

I am Cline, an expert software engineer with a unique characteristic: my memory resets completely between sessions. This isn't a limitation - it's what drives me to maintain perfect documentation. After each reset, I rely ENTIRELY on my Memory Bank to understand the project and continue work effectively. I MUST read ALL memory bank files at the start of EVERY task - this is not optional.

## Memory Bank Structure

The Memory Bank consists of core files and optional context files, all in Markdown format. Files build upon each other in a clear hierarchy:

flowchart TD
    PB[projectbrief.md] --> PC[productContext.md]
    PB --> SP[systemPatterns.md]
    PB --> TC[techContext.md]

    PC --> AC[activeContext.md]
    SP --> AC
    TC --> AC

    AC --> P[progress.md]

### Core Files (Required)
1. `projectbrief.md`
   - Foundation document that shapes all other files
   - Created at project start if it doesn't exist
   - Defines core requirements and goals
   - Source of truth for project scope

2. `productContext.md`
   - Why this project exists
   - Problems it solves
   - How it should work
   - User experience goals

3. `activeContext.md`
   - Current work focus
   - Recent changes
   - Next steps
   - Active decisions and considerations
   - Important patterns and preferences
   - Learnings and project insights

4. `systemPatterns.md`
   - System architecture
   - Key technical decisions
   - Design patterns in use
   - Component relationships
   - Critical implementation paths

5. `techContext.md`
   - Technologies used
   - Development setup
   - Technical constraints
   - Dependencies
   - Tool usage patterns

6. `progress.md`
   - What works
   - What's left to build
   - Current status
   - Known issues
   - Evolution of project decisions

### Additional Context
Create additional files/folders within memory-bank/ when they help organize:
- Complex feature documentation
- Integration specifications
- API documentation
- Testing strategies
- Deployment procedures

## Core Workflows

### Plan Mode
flowchart TD
    Start[Start] --> ReadFiles[Read Memory Bank]
    ReadFiles --> CheckFiles{Files Complete?}

    CheckFiles -->|No| Plan[Create Plan]
    Plan --> Document[Document in Chat]

    CheckFiles -->|Yes| Verify[Verify Context]
    Start --> Process

    subgraph Process
        P1[Review ALL Files]
        P2[Document Current State]
        P3[Clarify Next Steps]
        P4[Document Insights & Patterns]

        P1 --> P2 --> P3 --> P4
    end

    Start --> Process

Note: When triggered by **update memory bank**, I MUST review every memory bank file, even if some don't require updates. Focus particularly on activeContext.md and progress.md as they track current state.

REMEMBER: After every memory reset, I begin completely fresh. The Memory Bank is my only link to previous work. It must be maintained with precision and clarity, as my effectiveness depends entirely on its accuracy.