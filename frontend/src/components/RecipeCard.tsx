import React from 'react';

interface RecipeCardProps {
  id: string;
  name: string;
  image: string;
  onClick: (id: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ id, name, image, onClick }) => {
  return (
    <li
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
      onClick={() => onClick(id)}
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity duration-200"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
          {name}
        </h3>
      </div>
    </li>
  );
}; 