import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ?? 5000;

app.get('/', (_, res) => {
  res.send('Backend is running');
});

app.get('/recipes', async (req, res) => {
  try {
    const { ingredient, country, category } = req.query as { ingredient?: string; country?: string; category?: string };

    let url = '';

    if (ingredient) {
      url = `${process.env.MEALDB_BASE_URL}/filter.php?i=${ingredient}`;
    } else if (country) {
      url = `${process.env.MEALDB_BASE_URL}/filter.php?a=${country}`;
    } else if (category) {
      url = `${process.env.MEALDB_BASE_URL}/filter.php?c=${category}`;
    } else {
      url = `${process.env.MEALDB_BASE_URL}/search.php?s=`;
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

app.get('/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const url = `${process.env.MEALDB_BASE_URL}/lookup.php?i=${id}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching recipe details:', err);
    res.status(500).json({ error: 'Failed to fetch recipe details' });
  }
});

app.get('/filters/ingredients', async (_, res) => {
  try {
    const url = `${process.env.MEALDB_BASE_URL}/list.php?i=list`;
    const response = await axios.get(url);
    const ingredients = response.data.meals.map((item: any) => item.strIngredient);
    res.json({ ingredients });
  } catch (err) {
    console.error('Error fetching ingredients:', err);
    res.status(500).json({ error: 'Failed to fetch ingredients' });
  }
});

app.get('/filters/countries', async (_, res) => {
  try {
    const url = `${process.env.MEALDB_BASE_URL}/list.php?a=list`;
    const response = await axios.get(url);
    const countries = response.data.meals.map((item: any) => item.strArea);
    res.json({ countries });
  } catch (err) {
    console.error('Error fetching countries:', err);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
});

app.get('/filters/categories', async (_, res) => {
  try {
    const url = `${process.env.MEALDB_BASE_URL}/list.php?c=list`;
    const response = await axios.get(url);
    const categories = response.data.meals.map((item: any) => item.strCategory);
    res.json({ categories });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
