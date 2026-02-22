import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ includes react-router-dom & BrowserRouter
import HomePage from "./components/HomePage";
import RecipeDetail from "./components/RecipeDetail";
import AddRecipeForm from "./components/AddRecipeForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/add" element={<AddRecipeForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;