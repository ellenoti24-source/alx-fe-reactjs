
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore.js';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(
    (state) => state.filteredRecipes
  );

  if (filteredRecipes.length === 0) {
    return <p>No matching recipes found.</p>;
  }

  return (
    <div>
      {filteredRecipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
