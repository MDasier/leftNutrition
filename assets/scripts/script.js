// script.js
window.addEventListener('scroll', function() {
    const sections = ['home', 'about', 'services', 'contact', 'recipes', 'prozis'];
    let activeSection = null;

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const rect = section.getBoundingClientRect();

        if (rect.top < window.innerHeight/2 && rect.bottom > 50) {
            activeSection = sectionId; //Si la section está entre el top y el bottom de la ventana (se está viendo)
        }
    });

    // Recorre las secciones y si alguna es la que esta activa le cambia el estado
    sections.forEach(sectionId => {
        const link = document.getElementById(`a-${sectionId}`);
        if (sectionId === activeSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

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
              <p><strong>Dificultad:</strong> ${recipe.dificultad} - <strong>Tiempo estimado:</strong> ${recipe.tiempo}' 🕢</p>
              <p><strong>Raciones:</strong> ${recipe.personas} - <strong>Calorías por ración:</strong> ${recipe.calorias} </p>
              <p><strong>Tipo de receta:</strong> ${recipe.tipo}</p>
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