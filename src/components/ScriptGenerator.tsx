'use client';

import React, { useState, useMemo } from 'react';
import { catalog } from '@/data/appCatalog';
import { generateScript } from '@/utils/scriptGenerator';
import { DownloadButton } from './DownloadButton';
import { Check, ChevronDown, Code, Palette, Zap, MessageCircle, Wrench } from 'lucide-react';

const categoryIcons = {
  development: Code,
  design: Palette,
  productivity: Zap,
  communication: MessageCircle,
  utilities: Wrench,
};

export const ScriptGenerator: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Generate script whenever selections change
  const script = useMemo(() => {
    return generateScript(selectedIds);
  }, [selectedIds]);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const applyPreset = (presetId: string) => {
    const preset = catalog.presets.find(p => p.id === presetId);
    if (preset) {
      setSelectedIds(preset.items);
    }
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  const selectedApps = catalog.apps.filter(app => selectedIds.includes(app.id));
  const selectedTweaks = catalog.tweaks.filter(tweak => selectedIds.includes(tweak.id));

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">MacInitiate</h1>
        <p className="text-xl text-gray-600">
          Select apps and tweaks to generate your macOS setup script
        </p>
      </div>

      {/* Presets */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Quick Start Presets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {catalog.presets.map(preset => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset.id)}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
            >
              <h3 className="font-semibold text-lg mb-1">{preset.name}</h3>
              <p className="text-sm text-gray-600">{preset.description}</p>
              <p className="text-xs text-blue-600 mt-2">{preset.items.length} items</p>
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Applications</h2>
        <div className="space-y-4">
          {catalog.categories.map(category => {
            const Icon = categoryIcons[category.id as keyof typeof categoryIcons];
            const apps = catalog.apps.filter(app => app.category === category.id);
            const isExpanded = activeCategory === category.id;

            return (
              <div key={category.id} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setActiveCategory(isExpanded ? null : category.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={24} className="text-blue-600" />
                    <div className="text-left">
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-200 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {apps.map(app => {
                        const isSelected = selectedIds.includes(app.id);
                        return (
                          <button
                            key={app.id}
                            onClick={() => toggleSelection(app.id)}
                            className={`
                              p-3 rounded-lg border-2 transition-all text-left
                              ${isSelected 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'
                              }
                            `}
                          >
                            <div className="flex items-start gap-2">
                              <div className={`
                                w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5
                                ${isSelected 
                                  ? 'border-blue-500 bg-blue-500' 
                                  : 'border-gray-300'
                                }
                              `}>
                                {isSelected && <Check size={14} className="text-white" />}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{app.name}</h4>
                                <p className="text-sm text-gray-600">{app.description}</p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* System Tweaks */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">System Tweaks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {catalog.tweaks.map(tweak => {
            const isSelected = selectedIds.includes(tweak.id);
            return (
              <button
                key={tweak.id}
                onClick={() => toggleSelection(tweak.id)}
                className={`
                  p-3 rounded-lg border-2 transition-all text-left
                  ${isSelected 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className="flex items-start gap-2">
                  <div className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5
                    ${isSelected 
                      ? 'border-green-500 bg-green-500' 
                      : 'border-gray-300'
                    }
                  `}>
                    {isSelected && <Check size={14} className="text-white" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{tweak.name}</h4>
                    <p className="text-sm text-gray-600">{tweak.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selection Summary */}
      {(selectedApps.length > 0 || selectedTweaks.length > 0) && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">
              Selected Items ({selectedApps.length + selectedTweaks.length})
            </h2>
            <button
              onClick={clearSelection}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Clear All
            </button>
          </div>

          {selectedApps.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <div className="flex flex-wrap gap-2">
                {selectedApps.map(app => (
                  <span
                    key={app.id}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {app.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectedTweaks.length > 0 && (
            <div>
              <h3 className="font-medium text-lg mb-2">System Tweaks</h3>
              <div className="flex flex-wrap gap-2">
                {selectedTweaks.map(tweak => (
                  <span
                    key={tweak.id}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                  >
                    {tweak.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Download Section */}
      <div className="text-center">
        <DownloadButton 
          script={script} 
          selectedCount={selectedApps.length + selectedTweaks.length}
        />
      </div>
    </div>
  );
};
