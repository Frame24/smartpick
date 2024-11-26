import React from 'react';

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">
        <a href={category.url} className="text-blue-500 hover:underline">
          {category.name}
        </a>
      </h2>
      <p className="text-gray-600">Подкатегории: {category.subcategories_count || 0}</p>
      <p className="text-gray-600">Товары: {category.products_count || 0}</p>
    </div>
  );
};

export default CategoryCard;
