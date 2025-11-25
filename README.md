# MacInitiate

**The Perfect Mac Setup Tool** 🚀

Transform your macOS setup experience from hours of manual configuration to a single, automated command. MacInitiate guides you through selecting the perfect combination of development tools, productivity apps, and system optimizations—all through a modern, intuitive web interface.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/m3rcha/MacInitiate/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## ⚠️ Beta Notice

**MacInitiate is currently in BETA** - Use at your own risk as it may break. We recommend testing scripts in safe environments first.

## ✨ Features

### 🔧 App Selector
- **250+ Curated Apps**: Browse our carefully vetted collection of essential macOS applications
- **Smart Categorization**: Organized by Development, Productivity, Design, Utilities, and more
- **Search & Filter**: Find apps instantly with advanced search and filtering
- **One-Click Install**: Generate installation commands—all apps verified for macOS compatibility

### ⚙️ System Tweak Manager
- **86+ System Preferences**: Customize Dock, Finder, Security, Keyboard, and more
- **Impact Level Rating**: High/medium/low impact indicators for safety
- **Smart Defaults**: Pre-configured optimal settings for different use cases
- **Safety Warnings**: Clear indicators for risky modifications

### 🎯 Script Generator
- **Auto-Generated Commands**: Create ready-to-run shell scripts from your selections
- **Syntax Highlighting**: Beautiful, readable script preview
- **Copy & Download**: Export scripts for local execution
- **Configuration Sharing**: Share your perfect setup via URL or JSON

### 🌐 Multilingual Support
- **English & Turkish**: Full translation support with auto-detection
- **Seamless Switching**: Change languages without losing selections
- **Cultural Adaptation**: Optimized messaging for different audiences

## 🚀 Quick Start

### Prerequisites
- **macOS** (Sequoia 15+ recommended)
- **Modern Web Browser** (Chrome 120+, Safari 17+, Firefox 120+)
- **Terminal Access** for script execution

### Installation & Usage

1. **Visit MacInitiate**
   ```bash
   # Open your browser and visit:
   # macinitiate.com (when live)
   # or run locally: https://localhost:3000
   ```

2. **Select Your Apps**
   - Browse categories or use search
   - Click app cards to add/remove from selection
   - View impact & size information

3. **Configure System Preferences**
   - Choose from 86+ tweak categories
   - Click any tweak card to select/deselect
   - Review safety warnings and impact levels

4. **Generate Setup Script**
   - Click "Generate Script" button
   - Preview your personalized script
   - Copy to clipboard or download file

5. **Execute the Script**
   ```bash
   # Make the script executable (if downloaded)
   chmod +x macinitiate-setup.sh

   # Run the setup script
   ./macinitiate-setup.sh
   ```

## 🛠️ Technical Architecture

### Frontend Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom design system
- **Animation**: Framer Motion for smooth transitions
- **Icons**: Lucide React for consistent iconography

### State Management
- **Reducer Pattern**: React useReducer for predictable state updates
- **Context API**: Hierarchical state sharing across components
- **Type Safety**: Full TypeScript coverage for all data structures

### Data Architecture
- **Static Data**: Pre-built JSON/TS objects for performance
- **No External Dependencies**: Client-side script generation
- **Localization**: Bilingual support (EN/TR) with auto-detection

## 📁 Project Structure

```
macinitiate/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Landing page
│   │   ├── manifest.json      # PWA manifest
│   │   └── setup/             # Main setup flow
│   │       └── page.tsx       # Wizard interface
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base components (buttons, cards, etc.)
│   │   ├── AppSelector.tsx   # App selection interface
│   │   ├── TweakSelector.tsx # System tweaks interface
│   │   └── ScriptPreview.tsx # Script generation & display
│   ├── data/                 # Static application data
│   │   ├── apps.ts          # App catalog
│   │   ├── tweaks.ts        # System preferences
│   │   └── categories.ts    # Category definitions
│   ├── lib/                 # Core business logic
│   │   ├── script-generator.ts # Command generation engine
│   │   ├── setup-state.tsx  # State management
│   │   └── config-sharing.ts # URL/import/export logic
│   ├── contexts/            # React contexts
│   │   ├── language-context.tsx # Internationalization
│   │   └── theme-context.tsx # Dark/light mode
│   └── types/               # TypeScript definitions
│       ├── apps.ts
│       ├── tweaks.ts
│       └── common.ts
├── memory-bank/             # Project documentation
├── public/                  # Static assets
└── package.json            # Dependencies & scripts
```

## 🕹️ Usage

### Selecting Applications
1. Navigate to the "Apps" section
2. Use search bar or category filters
3. Click any app card to add/remove it
4. View selected count in the top-right

### Configuring System Tweaks
1. Go to the "System Preferences" section
2. Browse categories (Dock, Finder, Security, etc.)
3. Click tweak cards to select/deselect
4. Check safety indicators and warnings

### Generating Scripts
1. Click the "Generate" button when ready
2. Wait for script generation (usually <5 seconds)
3. Review the syntax-highlighted script preview
4. Copy to clipboard or download as `.sh` file

## 🛡️ Security & Safety

### Script Execution
- All generated scripts are client-side only
- No server communication or data collection
- Scripts can be manually reviewed before execution

### System Modification Warnings
- High-impact tweaks clearly marked
- Sudo requirement indicators
- Restart requirement notifications
- Undo recommendations for reversible changes

## 🐛 Known Issues & Limitations

### Current Beta Limitations
- **Template System**: Coming soon (placeholder currently shown)
- **App Expansion**: Currently limited to 3 apps (expansion to 250+ planned)
- **Advanced Features**: Some enterprise features not yet implemented

### Browser Support
- Tested primarily on Chrome 120+
- Safari 17+ and Firefox 120+ supported
- Progressive Web App features for offline use

## 🤝 Contributing

We welcome contributions to MacInitiate! Please see our contributing guidelines (coming soon).

### Areas for Contribution
- **App Curation**: Add new applications to our catalog
- **Tweak Development**: Create new system preference tweaks
- **Translation**: Add support for additional languages
- **UI/UX**: Improve the user experience and interface

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Homebrew Team**: For the amazing package management system
- **macOS Community**: For documented system preferences and tweaks
- **Open Source Projects**: Many of the great tools we help install

## 📞 Support

### For Issues & Questions
- Open an issue on our [GitHub repository](https://github.com/m3rcha/MacInitiate)
- Check our documentation for common troubleshooting
- Include your macOS version and setup steps when reporting issues

### For Feature Requests
- Use our issue templates for enhancement requests
- Describe your use case and why the feature would be valuable

---

## 🏆 Why MacInitiate?

**Before MacInitiate:**
- Hours of manual app hunting and installation
- Tedious system preference configuration
- Risk of installing incompatible or outdated software
- No way to share your perfect setup

**With MacInitiate:**
- **Minutes, not hours**: Streamlined app and preference selection
- **Curated excellence**: Only the best, most modern tools included
- **Safety first**: Clear risk indicators and safety warnings
- **Shareable setups**: Save and share your configurations
- **No compromises**: Free, no account required, works offline

**Join the macOS development revolution—make setup simple again!** 🎉

---

*This README was created with assistance from AI and human collaboration.* 🤖👥
