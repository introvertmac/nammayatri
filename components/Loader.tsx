import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
    </div>
  );
};

export default Loader;