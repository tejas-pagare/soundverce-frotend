'use client';
import { useState } from 'react';
import Image from 'next/image';
interface Props {
  artistData: any;
  setArtistData: (data: any) => void;
}
export default function TagInputChips({artistData,setArtistData}:Props) {
  
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = () => {
    const newTag = inputValue.trim();
    if (newTag && !artistData.tags.includes(newTag)) {
      setArtistData((prev: { tags: any; }) => ({ ...prev, tags: [...prev.tags, newTag] }));
      setInputValue('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setArtistData((prev: { tags: any[]; }) => ({
      ...prev,
      tags: prev.tags.filter((tag: string) => tag !== tagToRemove),
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAddTag();
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
      <label className="text-[#fff] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-sans min-w-[80px] sm:min-w-[90px] md:min-w-[100px] lg:min-w-[110px]">
        Tags
      </label>

      <div className="flex flex-col gap-2 w-full max-w-md">
        {/* Input + Add Button */}
        <div className="flex items-center gap-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a tag"
            className="bg-[#1e1e1e] text-white text-sm px-3 py-1.5 rounded border border-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500 w-full"
          />
          <button
            onClick={handleAddTag}
            className="p-1 hover:scale-105 transition-transform"
          >
            <Image src="/add.svg" alt="Add tag" width={28} height={28} />
          </button>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-2">
          {artistData.tags.map((tag:string, idx:any) => (
            <div
              key={idx}
              className="flex items-center bg-purple-600 text-white text-xs px-3 py-1 rounded-full"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-white hover:text-red-400 text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
