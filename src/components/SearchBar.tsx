
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  return (
    <div className="px-4 pt-4 pb-2">
      <div className="relative">
        <button className="w-full flex items-center text-left bg-white shadow-md rounded-full py-3.5 px-5 border border-gray-200">
          <Search className="w-5 h-5 text-gray-500 mr-3" />
          <span className="text-gray-800 font-medium">Start your search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
