'use client';

import React from 'react';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  script: string;
  selectedCount: number;
  isGenerating?: boolean;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
  script,
  selectedCount,
  isGenerating = false
}) => {
  const handleDownload = () => {
    if (!script.trim()) {
      alert('Please select at least one app or tweak to generate a script.');
      return;
    }

    try {
      // Create a Blob with the script content
      const blob = new Blob([script], { type: 'text/x-shellscript' });
      
      // Create a temporary URL for the Blob
      const url = URL.createObjectURL(blob);
      
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'mac_initiate_setup.sh';
      
      // Make the link invisible
      link.style.display = 'none';
      
      // Add to DOM, click, and clean up
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      URL.revokeObjectURL(url);
      
      console.log('Script downloaded successfully');
    } catch (error) {
      console.error('Error downloading script:', error);
      alert('Failed to download the script. Please try again.');
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={selectedCount === 0 || isGenerating}
      className={`
        flex items-center gap-2 px-6 py-3 rounded-lg font-medium
        transition-all duration-200 transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed
        disabled:hover:scale-100
        ${
          selectedCount > 0 && !isGenerating
            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
            : 'bg-gray-300 text-gray-500'
        }
      `}
    >
      <Download size={20} />
      {isGenerating ? (
        <span>Generating...</span>
      ) : (
        <span>
          Download Setup Script ({selectedCount} {selectedCount === 1 ? 'item' : 'items'})
        </span>
      )}
    </button>
  );
};
