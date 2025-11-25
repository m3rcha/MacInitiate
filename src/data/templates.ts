import type { Template, TemplateRole } from '@/types/templates'

export const TEMPLATE_ROLES: Record<TemplateRole, { name: string; description: string; icon: string }> = {
    frontend: {
        name: 'Frontend Developer',
        description: 'React, Vue, Angular development with design tools',
        icon: '🎨'
    },
    backend: {
        name: 'Backend Developer',
        description: 'API development, databases, and terminal workflows',
        icon: '⚙️'
    },
    fullstack: {
        name: 'Fullstack Developer',
        description: 'Complete development stack from frontend to backend',
        icon: '🚀'
    },
    devops: {
        name: 'DevOps Engineer',
        description: 'Infrastructure, containers, and deployment tools',
        icon: '🔧'
    }
} as const

export const DEVELOPER_TEMPLATES: Template[] = [
    {
        id: 'frontend-starter',
        name: 'Frontend Developer',
        role: 'frontend',
        description: 'Perfect setup for modern frontend development with React, Vue, or Angular',
        longDescription: 'Includes essential frontend tools like VS Code, modern browsers, design tools, and API testing. Optimized for component development, state management, and modern CSS workflows.',
        apps: ['vscode', 'chrome', 'figma', 'postman', 'raycast', '1password'],
        tweaks: [
            'show-hidden-files',
            'fast-key-repeat',
            'dark-mode-menubar',
            'show-file-extensions',
            'expanded-save-panels'
        ],
        popularity: 89,
        author: 'MacInitiate Team',
        isVerified: true,
        estimatedSetupTime: '8 minutes',
        difficulty: 'beginner',
        tags: ['react', 'vue', 'angular', 'typescript', 'css']
    },
    {
        id: 'backend-starter',
        name: 'Backend Developer',
        role: 'backend',
        description: 'Optimized for backend development with databases, APIs, and terminal tools',
        longDescription: 'Focus on server-side development with powerful terminal, database management, API testing, and container support. Includes tools for Node.js, Python, Go, and database workflows.',
        apps: ['vscode', 'warp', 'docker', 'tableplus', 'postman', '1password'],
        tweaks: [
            'show-hidden-files',
            'enable-zsh-shell',
            'disable-natural-scrolling',
            'auto-hide-dock',
            'show-path-bar'
        ],
        popularity: 92,
        author: 'MacInitiate Team',
        isVerified: true,
        estimatedSetupTime: '10 minutes',
        difficulty: 'intermediate',
        tags: ['nodejs', 'python', 'databases', 'api', 'docker']
    },
    {
        id: 'fullstack-productivity',
        name: 'Fullstack Developer',
        role: 'fullstack',
        description: 'Complete setup for fullstack developers needing both frontend and backend tools',
        longDescription: 'The ultimate development environment covering everything from UI design to database management. Includes AI-powered coding, terminal excellence, container support, and productivity tools.',
        apps: ['cursor', 'warp', 'docker', 'postman', 'tableplus', 'raycast', '1password', 'rectangle'],
        tweaks: [
            'show-hidden-files',
            'fast-key-repeat',
            'auto-hide-dock',
            'show-path-bar',
            'expanded-save-panels'
        ],
        popularity: 95,
        author: 'MacInitiate Team',
        isVerified: true,
        estimatedSetupTime: '12 minutes',
        difficulty: 'intermediate',
        tags: ['fullstack', 'javascript', 'typescript', 'react', 'nodejs']
    },
    {
        id: 'devops-engineer',
        name: 'DevOps Engineer',
        role: 'devops',
        description: 'Specialized for DevOps with container management and monitoring tools',
        longDescription: 'Built for infrastructure and deployment workflows. Includes container management, terminal excellence, monitoring tools, and security utilities for modern DevOps practices.',
        apps: ['vscode', 'warp', 'docker', 'postman', 'rectangle', '1password'],
        tweaks: [
            'show-hidden-files',
            'enable-zsh-shell',
            'disable-dashboard',
            'firewall-stealth-mode',
            'show-library-folder'
        ],
        popularity: 78,
        author: 'MacInitiate Team',
        isVerified: true,
        estimatedSetupTime: '15 minutes',
        difficulty: 'advanced',
        tags: ['docker', 'kubernetes', 'infrastructure', 'security', 'automation']
    }
]

// Template utility functions
export function getTemplateById(id: string): Template | undefined {
    return DEVELOPER_TEMPLATES.find(template => template.id === id)
}

export function getTemplatesByRole(role: TemplateRole): Template[] {
    return DEVELOPER_TEMPLATES.filter(template => template.role === role)
}

export function getAllTemplates(): Template[] {
    return DEVELOPER_TEMPLATES
}

export function getPopularTemplates(limit: number = 4): Template[] {
    return DEVELOPER_TEMPLATES
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, limit)
}

export function searchTemplates(query: string): Template[] {
    const lowercaseQuery = query.toLowerCase()
    return DEVELOPER_TEMPLATES.filter(template =>
        template.name.toLowerCase().includes(lowercaseQuery) ||
        template.description.toLowerCase().includes(lowercaseQuery) ||
        template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
}
