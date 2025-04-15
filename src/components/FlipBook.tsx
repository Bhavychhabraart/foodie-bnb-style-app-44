
import React from 'react';

const FlipBook: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white py-4">
      <h2 className="text-2xl font-semibold mb-4">Our Digital Menu</h2>
      <div className="w-full h-[80vh] overflow-hidden rounded-lg shadow-lg">
        <iframe 
          src="https://heyzine.com/flip-book/44253fcd19.html" 
          title="Restaurant Digital Menu"
          className="w-full h-full border-0"
          allow="fullscreen"
        />
      </div>
    </div>
  );
};

export default FlipBook;
