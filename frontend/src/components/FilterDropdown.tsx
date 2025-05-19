import React from 'react';

interface FilterDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedType?: string;
  selectedValue?: string;
  ingredients: string[];
  countries: string[];
  categories: string[];
  onFilterChange: (type: string, value: string) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  isOpen,
  onToggle,
  selectedType,
  selectedValue,
  ingredients,
  countries,
  categories,
  onFilterChange,
}) => {
  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex justify-center w-72 rounded border px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
      >
        {selectedType && selectedValue
          ? `${selectedType}: ${selectedValue}`
          : 'Select filter options'}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-72 rounded border bg-white shadow max-h-80 overflow-hidden z-10 p-4 flex gap-2">
          <div className="flex flex-col w-1/3">
            <select
              className="border rounded p-1 text-xs text-gray-900 appearance-none text-center w-full"
              value={selectedType === 'Ingredient' ? selectedValue : ''}
              onChange={(e) => onFilterChange('ingredient', e.target.value)}
              style={{ paddingRight: '0.25rem', overflow: 'hidden' }}
            >
              <option value="" style={{ textAlign: 'center' }}>Ingredients</option>
              {ingredients.map((ing) => (
                <option key={ing} value={ing} style={{ textAlign: 'center' }}>
                  {ing}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-1/3">
            <select
              className="border rounded p-1 text-xs text-gray-900 appearance-none text-center w-full"
              value={selectedType === 'Country' ? selectedValue : ''}
              onChange={(e) => onFilterChange('country', e.target.value)}
              style={{ paddingRight: '0.25rem', overflow: 'hidden' }}
            >
              <option value="" style={{ textAlign: 'center' }}>Country</option>
              {countries.map((c) => (
                <option key={c} value={c} style={{ textAlign: 'center' }}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-1/3">
            <select
              className="border rounded p-1 text-xs text-gray-900 appearance-none text-center w-full"
              value={selectedType === 'Category' ? selectedValue : ''}
              onChange={(e) => onFilterChange('category', e.target.value)}
              style={{ paddingRight: '0.25rem', overflow: 'hidden' }}
            >
              <option value="" style={{ textAlign: 'center' }}>Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} style={{ textAlign: 'center' }}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}; 