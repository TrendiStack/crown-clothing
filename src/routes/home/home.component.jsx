import React from "react";
import { Outlet } from "react-router-dom";
import Directory from "../../components/directory/directory.component";
import { CategoriesData } from "../../categories.js";

const Home = () => {
  const categories = CategoriesData;
  return (
    <div>
      <Directory categories={categories} />
      <Outlet />
    </div>
  );
};

export default Home;
