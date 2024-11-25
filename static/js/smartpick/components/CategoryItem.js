import React from 'react';

const CategoryItem = ({ category }) => {
    return (
        <li>
            <a
                href={`/categories/${category.id}`}
                className="text-blue-500 hover:underline"
            >
                {category.name}
            </a>
            {category.subcategories && category.subcategories.length > 0 && (
                <ul className="list-disc ml-6">
                    {category.subcategories.map((subcategory) => (
                        <CategoryItem key={subcategory.id} category={subcategory} />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default CategoryItem;
