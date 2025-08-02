"use client";
import { useState } from "react";
// import React from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkmode]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.products);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      className={`${
        darkmode ? "dark" : ""
      }min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white p-5`}
    >
      <button
        onClick={() => setDarkmode(!darkmode)}
        className="fixed top-5 right-5 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
      >
        {darkmode ? "Light Mode" : "Dark Mode"}
      </button>
      <h1 className="text-3xl md:text-4xl font-bold bg-blue-700 p-5 text-center text-white rounded-lg shadow-xl">
        Fetched Products
      </h1>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
          {Array(8)
            .fill(0)
            .map((_, ind) => (
              <div
                key={ind}
                className="animate-pulse bg-gray-300 dark:bg-gray-700 h-60 rounded-lg"
              ></div>
            ))}
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
          {product.map((i) => (
            <div
              key={i.id}
              className="flex flex-col rounded-lg items-center border shadow-lg p-5 dark:bg-gray-800 hover:scale-105 hover:shadow-2xl transition duration-100"
            >
              <img
                src={i.thumbnail}
                alt=""
                className="rounded-lg shadow-md hover:scale-110 transition duration-300 h-40 w-40 object-cover"
              />
              <strong className="mt-3 text-md">Name:- {i.title}</strong>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                <strong>Description:-</strong>
                {i.description}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                <strong>Category:-</strong>
                {i.category}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-3">
                <strong className="bg-red-600 text-white px-2 py-0.5 rounded-full text-sm mt-5">
                  Price :-
                </strong>
                ${i.price}
              </p>
              <button className="mt-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition duration-300 shadow-md hover:shadow-lg">
                Buy!
              </button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
