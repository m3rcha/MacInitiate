# MacInitiate

A web application that allows users to select macOS applications and system tweaks, then generates a downloadable, fault-tolerant Bash script for automated installation and configuration.

## Features

- 🎯 **Easy Selection**: Browse apps by category and select system tweaks
- ⚡ **Instant Generation**: Client-side script generation with no server dependencies
- 🛡️ **Fault-Tolerant**: Scripts handle individual failures gracefully without stopping
- 🎨 **Modern UI**: Clean, responsive interface built with React and TailwindCSS
- 📦 **Presets**: Quick-start configurations for common use cases
- 🔧 **System Tweaks**: Apply macOS defaults and restart services automatically

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Usage

1. **Select Apps**: Browse categories and click on applications to select them
2. **Choose Tweaks**: Pick system tweaks to customize your macOS experience
3. **Use Presets**: Start with pre-configured setups (Developer, Designer, etc.)
4. **Generate Script**: Click "Download Setup Script" to get your `install.sh`
5. **Run Script**: Execute the downloaded script in your terminal:
   ```bash
   chmod +x mac_initiate_setup.sh
   ./mac_initiate_setup.sh
   ```

## Generated Script Features

The generated Bash script includes:

- ✅ **Internet Connection Check**: Verifies connectivity before starting
- ✅ **Homebrew Installation**: Auto-installs Homebrew if missing
- ✅ **Sleep Prevention**: Uses `caffeinate` to prevent sleep during installation
- ✅ **Error Handling**: Continues installation even if individual apps fail
- ✅ **Progress Tracking**: Shows current progress with colored output
- ✅ **Service Management**: Automatically restarts affected services
- ✅ **Final Report**: Summary of successful and failed installations

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS, Lucide React icons
- **Build Tools**: PostCSS, Autoprefixer
- **Deployment**: Vercel, Netlify, or any static host

## Project Structure

```
macinitiate/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── page.tsx         # Main page
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── ScriptGenerator.tsx
│   │   └── DownloadButton.tsx
│   ├── types/               # TypeScript definitions
│   │   └── catalog.ts
│   ├── utils/               # Utility functions
│   │   └── scriptGenerator.ts
│   └── data/                # Static data
│       └── appCatalog.ts
├── memory-bank/            # Project documentation
└── package.json
```

## Adding New Apps

To add a new application to the catalog:

1. Edit `src/data/appCatalog.ts`
2. Add the app to the `apps` array:
   ```typescript
   {
     id: 'your-app-id',
     name: 'Your App Name',
     description: 'Brief description',
     brew_id: 'homebrew-package-name',
     category: 'development' // or appropriate category
   }
   ```

## Adding New Tweaks

To add a new system tweak:

1. Edit `src/data/appCatalog.ts`
2. Add the tweak to the `tweaks` array:
   ```typescript
   {
     id: 'your-tweak-id',
     name: 'Your Tweak Name',
     description: 'What this tweak does',
     command: 'defaults write com.apple.app setting value',
     restart_service: 'Finder' // optional
   }
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
