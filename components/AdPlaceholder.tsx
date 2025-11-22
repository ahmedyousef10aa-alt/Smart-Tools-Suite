import React from 'react';

const AdPlaceholder: React.FC = () => {
  return (
    <div className="w-full my-6 p-4 bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-400 text-sm h-32">
      {/* AdSense Code Location */}
      <span>Ad Space (Google AdSense)</span>
    </div>
  );
};

export default AdPlaceholder;