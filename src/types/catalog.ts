export interface App {
  id: string;
  name: string;
  description: string;
  brew_id: string;
  category: string;
}

export interface Tweak {
  id: string;
  name: string;
  description: string;
  command: string;
  restart_service?: string; // e.g., 'Finder', 'Dock', 'SystemUIServer'
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  items: string[]; // Array of app and tweak IDs
}

export interface Catalog {
  categories: Category[];
  apps: App[];
  tweaks: Tweak[];
  presets: Preset[];
}
