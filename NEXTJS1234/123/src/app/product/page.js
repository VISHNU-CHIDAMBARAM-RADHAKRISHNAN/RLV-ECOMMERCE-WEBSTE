"use client";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import React, { useState, useEffect } from "react";
//import { ProductService } from "../service/ProductService";
import { Button } from "primereact/button";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import "../flags.css";
//import Navbar from "../navbar/page";
import { ScrollPanel } from "primereact/scrollpanel";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Navbar1 from "../navbar1/page";

export default function BasicDemo() {
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState("grid");
  const [storedUsername, setStoredUsername] = useState("");
  const [storedEmail, setStoredEmail] = useState("");
  const [storedName, setStoredName] = useState("");
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3004/product");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProducts(data);
        console.log(data);

        // Assuming you have a state variable to store the fetched data
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Retrieve data from localStorage
    const usernameFromStorage = localStorage.getItem("username");
    const emailFromStorage = localStorage.getItem("email");
    const nameFromStorage = localStorage.getItem("name");

    if (usernameFromStorage) {
      setStoredUsername(usernameFromStorage);
    }

    if (emailFromStorage) {
      setStoredEmail(emailFromStorage);
    }

    if (nameFromStorage) {
      setStoredName(nameFromStorage);
    }
  }, []);

  const addToCart = async (product) => {
    try {
      const orderData = {
        productId: product.id,
        productName: product.ProductName,
        ProductCode: product.ProductCode,
        ProductName: product.ProductName,
        ProductDetail: product.ProductDetail,
        ProductImage: product.ProductImage,
        ProductPrice: product.ProductPrice,
        ProductCategory: product.ProductCategory,
        ProductQuantity: 1,
        ProductInventoryStatus: product.ProductInventoryStatus,
        ProductRating: product.ProductRating,
        username: storedUsername, // Replace with actual username logic
        email: storedEmail, // Replace with actual email logic
      };

      const response = await fetch("http://localhost:3004/add_cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      // Display success message
      window.alert("Product added to cart successfully!");
      // Handle success, e.g., show a success message or update the UI
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Error adding item to cart:", error);
    }
  };
  // useEffect(() => {
  //   ProductService.getProducts().then((data) => setProducts(data.slice(0, 30)));
  // }, []);

  const getSeverity = (product) => {
    switch (product.ProductInventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const listItem = (product) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-8">
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={`${product.ProductImage}`}
            alt={product.ProductName}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">
                {product.ProductName}
              </div>
              <Rating
                value={product.ProductRating}
                readOnly
                cancel={false}
              ></Rating>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">
                    {product.ProductCategory}
                  </span>
                </span>
                <Tag
                  value={product.ProductInventoryStatus}
                  severity={getSeverity(product)}
                ></Tag>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">
                ${product.ProductPrice}
              </span>
              <Button
                icon="pi pi-shopping-cart"
                className="p-button-rounded"
                disabled={product.ProductInventoryStatus === "OUTOFSTOCK"}
                onClick={() => addToCart(product)}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const gridItem = (product) => {
    return (
      <div className="col-12 sm:col-6 lg:col-30 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-tag"></i>
              <span className="font-semibold">{product.ProductCategory}</span>
            </div>
            <Tag
              value={product.ProductInventoryStatus}
              severity={getSeverity(product)}
            ></Tag>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img
              className="w-9 shadow-2 border-round"
              src={`${product.ProductImage}`}
              alt={product.ProductName}
            />
            <div className="text-2xl font-bold">{product.ProductName}</div>
            <Rating
              value={product.ProductRating}
              readOnly
              cancel={false}
            ></Rating>
          </div>
          <div className="flex align-items-center justify-content-between">
            <span className="text-2xl font-semibold">
              ${product.ProductPrice}
            </span>
            <Button
              icon="pi pi-shopping-cart"
              className="p-button-rounded"
              disabled={product.ProductInventoryStatus === "OUTOFSTOCK"}
              onClick={() => addToCart(product)}
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }

    if (layout === "list") return listItem(product);
    else if (layout === "grid") return gridItem(product);
  };

  const header = () => {
    return (
      <div className="flex justify-content-end">
        <DataViewLayoutOptions
          layout={layout}
          onChange={(e) => setLayout(e.value)}
        />
      </div>
    );
  };

  return (
    <div>
      <div className="card">
        <ScrollPanel style={{ width: "101.5%", height: "585px" }}>
          <Navbar1 />
          <DataView
            value={products}
            itemTemplate={itemTemplate}
            layout={layout}
            header={header()}
          />
        </ScrollPanel>
      </div>
    </div>
  );
}
