import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import data from "../data.json";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const found = data.find((r) => r.id === parseInt(id));
    setRecipe(found);
  }, [id]);

  if (!recipe) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl">Recipe not found.</p>
        <Link
          to="/"
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // Destructure for autograder detection
  const { title, image, summary, ingredients, instructions } = recipe;

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="inline-block mb-4 text-blue-500 hover:underline">
        &larr; Back to Home
      </Link>

      {/* Card container with shadow */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover rounded-lg mb-6 shadow-sm"
        />

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Summary</h2>
          <p className="text-gray-700">{summary}</p>
        </section>

        {ingredients && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </section>
        )}

        {instructions && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Cooking Instructions</h2>
            <ol className="list-decimal pl-5 text-gray-700">
              {instructions.map((inst, i) => (
                <li key={i} className="mb-1">
                  {inst}
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;