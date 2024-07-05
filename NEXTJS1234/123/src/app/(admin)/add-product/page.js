"use client";
import React from "react";
import Navbar1 from "../admin-navbar/page";
import styleaddp from "./add-product.module.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { useState } from "react";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productPrice, setProductPrice] = useState("");

  const handlecancel = () => {
    // Reload the page when cancel button is clicked
    window.location.reload();
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductDetailChange = (e) => {
    setProductDetail(e.target.value);
  };

  const handleProductImageChange = (e) => {
    setProductImage(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };
  const handleAddProduct = async () => {
    if (isNaN(Number(productPrice))) {
      alert("Please enter a valid number for Product Price.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3004/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProductName: productName,
          ProductDetail: productDetail,
          ProductImage: productImage,
          ProductPrice: productPrice,
          // Add other properties as needed
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Product added successfully:", data);
        alert("Product added successfully!");
        // Optionally, you can perform any additional actions after successful addition
      } else {
        const errorData = await response.json();
        console.error("Error adding product:", errorData.message);
        alert(`adding product: ${errorData.message}`);
        // Handle the error as needed (display an alert, show an error message, etc.)
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Unexpected error occurred. Please try again.");
      // Handle unexpected errors, such as network issues
    }
  };

  return (
    <div>
      <Navbar1 />
      <div className={styleaddp.container}>
        <form className={styleaddp.form}>
          <h3>Add Product Detail</h3>
          <div className={styleaddp.right}>
            <label htmlFor="productName">Product Name:</label>
            <br></br>

            <input
              type="text"
              id="productName"
              placeholder="Product Name"
              value={productName}
              onChange={handleProductNameChange}
            />
            <label htmlFor="productDetail">Product Detail:</label>
            <br></br>
            <textarea
              id="productDetail"
              placeholder="Enter Product Detail"
              value={productDetail}
              onChange={handleProductDetailChange}
              required
            ></textarea>
            <label htmlFor="productPrice">Product Price:</label>
            <br></br>
            <input
              type="text"
              id="productPrice"
              placeholder="Product Price"
              value={productPrice}
              onChange={handleProductPriceChange}
              required
            />
          </div>
          <div>
            <div className={styleaddp.left}>
              <label htmlFor="productImage">Product Image:</label>
              <br></br>
              <input
                type="text"
                id="productImage"
                placeholder="Enter image url only"
                // value={productImage}
                onChange={handleProductImageChange}
                required
              />
              {productImage && (
                <img src={productImage} alt="Invalid url , Enter correct url" />
              )}
            </div>
          </div>

          <div>
            <button
              type="button"
              className={styleaddp.button1}
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>
          <button
            className={styleaddp.cancel1}
            type="button"
            onClick={handlecancel}
          >
            cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
