// script.js

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const recipeContainer = document.getElementById('recipe-container');

  async function fetchRecipes() {
      try {
          const response = await fetch('./assets/data/recipes.json');
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const recipes = await response.json();
          return recipes;
      } catch (error) {
          console.error('Error fetching recipes:', error);
          return [];
      }
  }

  function displayRecipes(recipes) {
      recipeContainer.innerHTML = '';

      recipes.forEach(recipe => {
          const recipeElement = document.createElement('div');
          recipeElement.classList.add('recipe');
          recipeElement.innerHTML = `
              <h4>${recipe.receta}</h4>
              <p><strong>Ingredientes:</strong> ${recipe.ingredientes}</p>
              <p><strong>Instrucciones:</strong> ${recipe.descripcion}</p>
              <p><strong>Dificultad y tiempo estimado:</strong> ${recipe.dificultad} - ${recipe.tiempo}' 🕢</p>
              <p><strong>Tipo de receta:</strong> ${recipe.tipo}</p>
              <p><strong>Raciones:</strong> ${recipe.personas}</p>
          `;
          recipeContainer.appendChild(recipeElement);
      });
  }

  function filterRecipes(recipes, query) {
      return recipes.filter(recipe =>
          recipe.buscar.toLowerCase().includes(query.toLowerCase())
      );
  }

  searchInput.addEventListener('input', async () => {
      const query = searchInput.value;
      const recipes = await fetchRecipes();
      const filteredRecipes = filterRecipes(recipes, query);
      displayRecipes(filteredRecipes);
  });

  // Load and display recipes initially
  fetchRecipes().then(recipes => displayRecipes(recipes));
});
