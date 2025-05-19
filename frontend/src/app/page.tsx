'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { RecipeCard } from '../components/RecipeCard';
import { FilterDropdown } from '../components/FilterDropdown';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface FilterResponse {
  ingredients?: string[];
  countries?: string[];
  categories?: string[];
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const ingredient = searchParams?.get('ingredient') || '';
  const country = searchParams?.get('country') || '';
  const category = searchParams?.get('category') || '';

  let selectedFilterType = '';
  let selectedFilterValue = '';
  if (ingredient) {
    selectedFilterType = 'Ingredient';
    selectedFilterValue = ingredient;
  } else if (country) {
    selectedFilterType = 'Country';
    selectedFilterValue = country;
  } else if (category) {
    selectedFilterType = 'Category';
    selectedFilterValue = category;
  }

  // Fetch filter options
  const fetchFilters = async () => {
    try {
      const [ingredientsRes, countriesRes, categoriesRes] = await Promise.all([
        axios.get<FilterResponse>(`${process.env.NEXT_PUBLIC_API_URL}/filters/ingredients`),
        axios.get<FilterResponse>(`${process.env.NEXT_PUBLIC_API_URL}/filters/countries`),
        axios.get<FilterResponse>(`${process.env.NEXT_PUBLIC_API_URL}/filters/categories`),
      ]);
      setIngredients(ingredientsRes.data.ingredients || []);
      setCountries(countriesRes.data.countries || []);
      setCategories(categoriesRes.data.categories || []);
    } catch (error) {
      console.error('Failed to fetch filter options', error);
    }
  };

  // Fetch recipes based on filters
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (ingredient) params.append('ingredient', ingredient);
      if (country) params.append('country', country);
      if (category) params.append('category', category);

      const paramsString = params.toString();
      const url = process.env.NEXT_PUBLIC_API_URL + '/recipes' + (paramsString ? '?' + paramsString : '');
      const res = await axios.get<{ meals: Recipe[] }>(url);
      setRecipes(res.data.meals || []);
    } catch (error) {
      console.error('Failed to fetch recipes', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [ingredient, country, category]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getTitle = () => {
    if (selectedFilterType && selectedFilterValue) {
      return `Recipes filtered by ${selectedFilterType}: ${selectedFilterValue}`;
    }
    return 'All Recipes';
  };

  const handleRecipeClick = (id: string) => {
    router.push(`/recipe/${id}`);
  };

  const handleFilterChange = (type: string, value: string) => {
    const params = new URLSearchParams();
    if (value) {
      if (type === 'ingredient') params.set('ingredient', value);
      else if (type === 'country') params.set('country', value);
      else if (type === 'category') params.set('category', value);
    }
    setDropdownOpen(false);
    router.push(`/?${params.toString()}`);
  };

  const renderContent = () => {
    if (loading) return <p>Loading...</p>;
    if (recipes.length === 0) return <p>No recipes found.</p>;
    
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 list-none p-0">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            id={recipe.idMeal}
            name={recipe.strMeal}
            image={recipe.strMealThumb}
            onClick={handleRecipeClick}
          />
        ))}
      </ul>
    );
  };

  return (
    <main className="p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6">{getTitle()}</h1>

      <div className="mb-6" ref={dropdownRef}>
        <FilterDropdown
          isOpen={dropdownOpen}
          onToggle={() => setDropdownOpen(!dropdownOpen)}
          selectedType={selectedFilterType}
          selectedValue={selectedFilterValue}
          ingredients={ingredients}
          countries={countries}
          categories={categories}
          onFilterChange={handleFilterChange}
        />
      </div>

      {renderContent()}
    </main>
  );
}
