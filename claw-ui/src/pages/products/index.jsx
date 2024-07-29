import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const token = sessionStorage.getItem("token");

  const addToCart = async (productId, quantity = 1) => {
    try {
      await axios.post("https://claw-assignment.onrender.com/cart", {
        productId,
        quantity
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Product added to your cart!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://claw-assignment.onrender.com/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [token]);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product._id, 1)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
