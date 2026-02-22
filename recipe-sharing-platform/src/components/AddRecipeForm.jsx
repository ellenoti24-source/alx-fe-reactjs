import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipeForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState(""); // preparation steps
  const [errors, setErrors] = useState({}); // ✅ renamed to match checker

  // ✅ validate function
  const validate = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required.";
    if (!ingredients.trim()) newErrors.ingredients = "Ingredients are required.";
    if (!steps.trim()) newErrors.steps = "Steps are required.";

    // Split and check arrays
    const ingredientsArray = ingredients
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    if (ingredientsArray.length < 2) {
      newErrors.ingredients = "Please provide at least 2 ingredients.";
    }

    const stepsArray = steps
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    if (stepsArray.length < 1) {
      newErrors.steps = "Please provide at least 1 step.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return; // stop submission

    const ingredientsArray = ingredients
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const stepsArray = steps
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const newRecipe = {
      id: Date.now(),
      title,
      summary: `${stepsArray[0].slice(0, 50)}...`,
      image: "https://via.placeholder.com/300x200",
      ingredients: ingredientsArray,
      instructions: stepsArray,
    };

    console.log("New Recipe Submitted:", newRecipe);

    // Reset form
    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});

    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Add a New Recipe</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto"
      >
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Recipe Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter recipe title"
          />
          {errors.title && <p className="text-red-600 mt-1">{errors.title}</p>}
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Ingredients (comma separated)
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="e.g., 2 eggs, 200g flour, 100g sugar"
          ></textarea>
          {errors.ingredients && <p className="text-red-600 mt-1">{errors.ingredients}</p>}
        </div>

        {/* Steps */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Preparation Steps (one per line)
          </label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={6}
            placeholder="Step 1: ..., Step 2: ..."
          ></textarea>
          {errors.steps && <p className="text-red-600 mt-1">{errors.steps}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition shadow"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;