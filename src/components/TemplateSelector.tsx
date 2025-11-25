'use client'

import React, { useState } from 'react'
import { Star, Clock } from 'lucide-react'
import { DEVELOPER_TEMPLATES, TEMPLATE_ROLES } from '@/data/templates'
import type { Template, TemplateRole } from '@/types/templates'
import { cn } from '@/lib/utils'

interface TemplateSelectorProps {
    selectedTemplate?: string
    onTemplateSelect: (templateId: string) => void
    className?: string
}

export function TemplateSelector({ selectedTemplate, onTemplateSelect, className }: TemplateSelectorProps) {
    const [selectedRole, setSelectedRole] = useState<TemplateRole | 'all'>('all')

    const filteredTemplates = selectedRole === 'all'
        ? DEVELOPER_TEMPLATES
        : DEVELOPER_TEMPLATES.filter(template => template.role === selectedRole)

    return (
        <div className={cn('space-y-8', className)}>
            {/* Role Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
                <button
                    onClick={() => setSelectedRole('all')}
                    className={cn(
                        'px-4 py-2 rounded-lg font-medium transition-colors',
                        selectedRole === 'all'
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                >
                    All Templates
                </button>

                {Object.entries(TEMPLATE_ROLES).map(([role, info]) => (
                    <button
                        key={role}
                        onClick={() => setSelectedRole(role as TemplateRole)}
                        className={cn(
                            'px-4 py-2 rounded-lg font-medium transition-colors',
                            selectedRole === role
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        )}
                    >
                        {info.name}
                    </button>
                ))}
            </div>

            {/* Templates Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {filteredTemplates.map((template) => {
                    const isSelected = selectedTemplate === template.id

                    return (
                        <div
                            key={template.id}
                            onClick={() => onTemplateSelect(template.id)}
                            className={cn(
                                'cursor-pointer border-2 rounded-lg p-6 transition-all',
                                isSelected
                                    ? 'border-black bg-gray-50'
                                    : 'border-gray-200 hover:border-gray-400'
                            )}
                        >
                            <div className="space-y-4">
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-900">
                                            {template.name}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {TEMPLATE_ROLES[template.role].description}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-1">
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <span className="text-sm font-medium">{template.popularity}</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-gray-600">
                                    {template.description}
                                </p>

                                {/* Metadata */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                                            <Clock className="w-4 h-4" />
                                            <span>{template.estimatedSetupTime}</span>
                                        </div>

                                        <div className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                                            {template.difficulty}
                                        </div>
                                    </div>
                                </div>

                                {/* Apps & Tweaks Count */}
                                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium text-gray-900">{template.apps.length}</span> apps
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium text-gray-900">{template.tweaks.length}</span> tweaks
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Selected Template Details */}
            {selectedTemplate && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg text-gray-900">
                                {DEVELOPER_TEMPLATES.find(t => t.id === selectedTemplate)?.name} Selected
                            </h3>
                            <p className="text-sm text-gray-600">
                                {DEVELOPER_TEMPLATES.find(t => t.id === selectedTemplate)?.longDescription}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
