import { Catalog } from '@/types/catalog';

export const catalog: Catalog = {
  categories: [
    {
      id: 'development',
      name: 'Development',
      description: 'Programming and development tools',
      icon: 'code'
    },
    {
      id: 'design',
      name: 'Design',
      description: 'Creative and design software',
      icon: 'palette'
    },
    {
      id: 'productivity',
      name: 'Productivity',
      description: 'Apps to boost your workflow',
      icon: 'zap'
    },
    {
      id: 'communication',
      name: 'Communication',
      description: 'Messaging and collaboration tools',
      icon: 'message-circle'
    },
    {
      id: 'utilities',
      name: 'Utilities',
      description: 'System utilities and tools',
      icon: 'tool'
    }
  ],

  apps: [
    // Development
    {
      id: 'vscode',
      name: 'Visual Studio Code',
      description: 'Code editing. Redefined.',
      brew_id: 'visual-studio-code',
      category: 'development'
    },
    {
      id: 'git',
      name: 'Git',
      description: 'Distributed version control system',
      brew_id: 'git',
      category: 'development'
    },
    {
      id: 'node',
      name: 'Node.js',
      description: 'JavaScript runtime built on Chrome\'s V8 engine',
      brew_id: 'node',
      category: 'development'
    },
    {
      id: 'docker',
      name: 'Docker Desktop',
      description: 'Build, share and run containerized applications',
      brew_id: 'docker',
      category: 'development'
    },
    {
      id: 'postman',
      name: 'Postman',
      description: 'API development environment',
      brew_id: 'postman',
      category: 'development'
    },
    {
      id: 'iterm2',
      name: 'iTerm2',
      description: 'Terminal emulator for macOS',
      brew_id: 'iterm2',
      category: 'development'
    },

    // Design
    {
      id: 'figma',
      name: 'Figma',
      description: 'Collaborative interface design tool',
      brew_id: 'figma',
      category: 'design'
    },
    {
      id: 'sketch',
      name: 'Sketch',
      description: 'Digital design platform',
      brew_id: 'sketch',
      category: 'design'
    },
    {
      id: 'pixelmator-pro',
      name: 'Pixelmator Pro',
      description: 'Powerful image editing app',
      brew_id: 'pixelmator-pro',
      category: 'design'
    },

    // Productivity
    {
      id: 'notion',
      name: 'Notion',
      description: 'All-in-one workspace for notes and tasks',
      brew_id: 'notion',
      category: 'productivity'
    },
    {
      id: 'obsidian',
      name: 'Obsidian',
      description: 'Knowledge base that works on local Markdown files',
      brew_id: 'obsidian',
      category: 'productivity'
    },
    {
      id: 'alfred',
      name: 'Alfred',
      description: 'Productivity app for macOS',
      brew_id: 'alfred',
      category: 'productivity'
    },
    {
      id: 'raycast',
      name: 'Raycast',
      description: 'Productivity launcher for macOS',
      brew_id: 'raycast',
      category: 'productivity'
    },

    // Communication
    {
      id: 'slack',
      name: 'Slack',
      description: 'Business communication platform',
      brew_id: 'slack',
      category: 'communication'
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Voice, video, and text communication',
      brew_id: 'discord',
      category: 'communication'
    },
    {
      id: 'zoom',
      name: 'Zoom',
      description: 'Video conferencing and online meetings',
      brew_id: 'zoom',
      category: 'communication'
    },

    // Utilities
    {
      id: '1password',
      name: '1Password',
      description: 'Password manager and secure wallet',
      brew_id: '1password',
      category: 'utilities'
    },
    {
      id: 'rectangle',
      name: 'Rectangle',
      description: 'Move and resize windows with keyboard shortcuts',
      brew_id: 'rectangle',
      category: 'utilities'
    },
    {
      id: 'bartender',
      name: 'Bartender',
      description: 'Organize your menu bar items',
      brew_id: 'bartender',
      category: 'utilities'
    }
  ],

  tweaks: [
    {
      id: 'show-hidden-files',
      name: 'Show Hidden Files',
      description: 'Show hidden files and folders in Finder',
      command: 'defaults write com.apple.finder AppleShowAllFiles -bool true',
      restart_service: 'Finder'
    },
    {
      id: 'hide-hidden-files',
      name: 'Hide Hidden Files',
      description: 'Hide hidden files and folders in Finder',
      command: 'defaults write com.apple.finder AppleShowAllFiles -bool false',
      restart_service: 'Finder'
    },
    {
      id: 'show-file-extensions',
      name: 'Show File Extensions',
      description: 'Show all file extensions in Finder',
      command: 'defaults write NSGlobalDomain AppleShowAllExtensions -bool true',
      restart_service: 'Finder'
    },
    {
      id: 'disable-dock-animation',
      name: 'Disable Dock Animation',
      description: 'Disable opening applications animation in Dock',
      command: 'defaults write com.apple.dock launchanim -bool false',
      restart_service: 'Dock'
    },
    {
      id: 'auto-hide-dock',
      name: 'Auto-Hide Dock',
      description: 'Automatically hide and show the Dock',
      command: 'defaults write com.apple.dock autohide -bool true',
      restart_service: 'Dock'
    },
    {
      id: 'minimize-to-dock',
      name: 'Minimize to Dock',
      description: 'Minimize windows to application icon in Dock',
      command: 'defaults write com.apple.dock minimize-to-application -bool true',
      restart_service: 'Dock'
    },
    {
      id: 'disable-screenshot-shadows',
      name: 'Disable Screenshot Shadows',
      description: 'Disable shadows when taking screenshots of windows',
      command: 'defaults write com.apple.screencapture disable-shadow -bool true'
    },
    {
      id: 'enable-safari-developer-menu',
      name: 'Enable Safari Developer Menu',
      description: 'Enable the Develop menu in Safari',
      command: 'defaults write com.apple.Safari IncludeDevelopMenu -bool true'
    },
    {
      id: 'disable-dashboard',
      name: 'Disable Dashboard',
      description: 'Disable Dashboard completely',
      command: 'defaults write com.apple.dashboard mcx-disabled -bool true'
    },
    {
      id: 'increase-keyboard-speed',
      name: 'Increase Keyboard Speed',
      description: 'Set keyboard repeat rate to fastest',
      command: 'defaults write NSGlobalDomain KeyRepeat -int 1'
    },
    {
      id: 'decrease-keyboard-delay',
      name: 'Decrease Keyboard Delay',
      description: 'Set delay until key repeat to shortest',
      command: 'defaults write NSGlobalDomain InitialKeyRepeat -int 10'
    },
    {
      id: 'enable-snap-to-grid',
      name: 'Enable Snap to Grid',
      description: 'Enable snap-to-grid for desktop icons',
      command: 'defaults write com.apple.finder CreateDesktop -bool true'
    }
  ],

  presets: [
    {
      id: 'developer',
      name: 'Developer Setup',
      description: 'Essential tools for software development',
      items: ['vscode', 'git', 'node', 'docker', 'iterm2', '1password', 'rectangle', 'show-hidden-files', 'show-file-extensions']
    },
    {
      id: 'designer',
      name: 'Designer Setup',
      description: 'Creative tools for designers',
      items: ['figma', 'sketch', 'pixelmator-pro', 'notion', '1password', 'alfred', 'show-hidden-files', 'show-file-extensions']
    },
    {
      id: 'productivity',
      name: 'Productivity Setup',
      description: 'Apps and tweaks to maximize efficiency',
      items: ['notion', 'obsidian', 'alfred', 'raycast', '1password', 'rectangle', 'slack', 'show-hidden-files', 'disable-dock-animation', 'auto-hide-dock']
    },
    {
      id: 'gamer',
      name: 'Gamer Setup',
      description: 'Optimizations for gaming on macOS',
      items: ['discord', 'zoom', '1password', 'rectangle', 'disable-dock-animation', 'auto-hide-dock', 'decrease-keyboard-delay', 'increase-keyboard-speed']
    },
    {
      id: 'minimal',
      name: 'Minimal Setup',
      description: 'Just the essentials',
      items: ['vscode', 'git', '1password', 'rectangle', 'show-hidden-files']
    }
  ]
};
