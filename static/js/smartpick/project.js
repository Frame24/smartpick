import '../../sass/smartpick/project.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { loadMoreItems } from './utils/loader';
import ProductCard from './components/ProductCard';
import CategoryCard from './components/CategoryCard';
import SearchBar from './components/SearchBar';

let currentProductPage = 2;
let hasNextProductPage = true;

let currentCategoryPage = 2;
let hasNextCategoryPage = true;

function loadMoreProducts() {
  loadMoreItems({
    url: '/products/',
    containerId: 'product-container',
    renderItem: (product) => <ProductCard product={product} />,
    currentPage: currentProductPage,
    setCurrentPage: (page) => (currentProductPage = page),
    hasNextPage: hasNextProductPage,
    setHasNextPage: (hasNext) => (hasNextProductPage = hasNext),
    dataKey: 'products',
  });
}

function loadMoreCategories() {
  loadMoreItems({
    url: '/categories/',
    containerId: 'category-container',
    renderItem: (category) => <CategoryCard category={category} />,
    currentPage: currentCategoryPage,
    setCurrentPage: (page) => (currentCategoryPage = page),
    hasNextPage: hasNextCategoryPage,
    setHasNextPage: (hasNext) => (hasNextCategoryPage = hasNext),
    dataKey: 'items',
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const searchBarContainer = document.getElementById('search-bar-container');
  if (searchBarContainer) {
    const root = createRoot(searchBarContainer);
    root.render(<SearchBar />);
  }

  // Загружаем первую порцию продуктов и категорий
  if (document.getElementById('product-container')) {
    loadMoreProducts();
  }

  if (document.getElementById('category-container')) {
    loadMoreCategories();
  }

  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      if (document.getElementById('product-container')) loadMoreProducts();
      if (document.getElementById('category-container')) loadMoreCategories();
    }
  });
});
