'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strCategory: string;
  [key: string]: any; // for dynamic ingredient keys
}

interface RecipeSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
}

interface Props {
  readonly params: {
    readonly id: string;
  };
}

export default function RecipeInfo({ params }: Props) {
  const { id } = params;
  const router = useRouter();

  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [categoryRecipes, setCategoryRecipes] = useState<RecipeSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`);
        setRecipe(res.data.meals[0]);
      } catch (error) {
        console.error('Failed to fetch recipe details', error);
      }
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    if (recipe?.strCategory) {
      const fetchCategoryRecipes = async () => {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/recipes?category=${recipe.strCategory}`);
          setCategoryRecipes(res.data.meals || []);
        } catch (error) {
          console.error('Failed to fetch category recipes', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCategoryRecipes();
    } else {
      setLoading(false);
    }
  }, [recipe]);

  const handleIngredientClick = (ingredient: string) => {
    router.push(`/?ingredient=${ingredient}`);
  };

  const handleCountryClick = (country: string) => {
    router.push(`/?country=${country}`);
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/?category=${category}`);
  };

  const getIngredients = () => {
    if (!recipe) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  if (!recipe) {
    return <p>Loading recipe details...</p>;
  }

  return (
    <main className="p-6 md:p-10 flex flex-col md:flex-row gap-6">
      <div className="md:w-2/3">
        <div className="flex gap-6 mb-6">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-48 h-48 object-cover rounded" />
          <div>
            <h1 className="text-3xl font-bold">{recipe.strMeal}</h1>
            <button
              className="text-blue-600 underline mt-2"
              onClick={() => handleCountryClick(recipe.strArea)}
            >
              {recipe.strArea}
            </button>
          </div>
        </div>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
          <p>{recipe.strInstructions}</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside">
            {getIngredients().map(({ ingredient, measure }) => (
              <li key={ingredient}>
                <button
                  className="text-blue-600 underline"
                  onClick={() => handleIngredientClick(ingredient)}
                >
                  {ingredient}
                </button>
                {measure ? ` - ${measure}` : ''}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <aside className="md:w-1/3 border-l pl-6">
        <h2 className="text-2xl font-semibold mb-4">More in {recipe.strCategory}</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-4">
            {categoryRecipes.map((r) => (
              <li key={r.idMeal}>
                <button
                  className="text-blue-600 underline"
                  onClick={() => handleCategoryClick(r.strCategory || '')}
                >
                  {r.strMeal}
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </main>
  );
}
