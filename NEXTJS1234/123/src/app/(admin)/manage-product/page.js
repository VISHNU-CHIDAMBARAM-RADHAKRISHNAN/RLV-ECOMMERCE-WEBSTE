"use client";
import "/node_modules/primeicons/primeicons.css";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import axios from "axios";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

//import { ProductService } from "/src/app/service/ProductService";
import Navbar1 from "../admin-navbar/page";
import stylemp from "./manage-product.module.css";
import { ScrollPanel } from "primereact/scrollpanel";

export default function TemplateDemo() {
  const [products, setProducts] = useState([]);

  const handleRefresh = () => {
    // Refresh the entire page
    window.location.reload();
  };
  const handledeleteRefresh = () => {
    // Refresh the entire page
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3004/product");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProducts(data);
        console.log(data); // Assuming you have a state variable to store the fetched data
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   ProductService.getProducts().then((data) => setProducts(data));
  // }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const imageBodyTemplate = (product) => {
    return (
      <img
        src={`${product.ProductImage}`}
        alt={product.ProductName}
        className="w-6rem shadow-2 border-round"
      />
    );
  };

  const priceBodyTemplate = (product) => {
    return formatCurrency(product.ProductPrice);
  };

  const ratingBodyTemplate = (product) => {
    return <Rating value={product.ProductRating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (product) => {
    return (
      <Tag
        value={product.ProductInventoryStatus}
        severity={getSeverity(product)}
      ></Tag>
    );
  };

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

  // const deleteProduct = (product) => {
  //   const updatedProducts = products.filter((p) => p.id !== product.id);
  //   setProducts(updatedProducts);
  // };

  const deleteProduct = async (product) => {
    try {
      // Make a DELETE request to the server to delete the product
      const response = await axios.delete(
        `http://localhost:3004/productdelete/${product.id}`
      );

      // Check if the deletion was successful based on the response
      if (response.status === 200) {
        console.log("Product deleted successfully");
        alert("Product deleted successfully");
        handledeleteRefresh();
        // Set the refresh flag to trigger a screen refresh

        // Perform any additional actions after successful deletion if needed
      }
    } catch (error) {
      console.error("Error deleting product", error);
      alert("Error deleting product", error);
      // Handle errors that occurred during the request
    }
  };

  const deleteButtonBodyTemplate = (product) => {
    return (
      <Button
        icon="pi pi-trash"
        className={stylemp.pbuttondanger}
        onClick={() => deleteProduct(product)}
      >
        &nbsp;Delete
      </Button>
    );
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Products</span>
      <Button icon="pi pi-refresh" rounded raised onClick={handleRefresh}>
        Refresh
      </Button>
    </div>
  );
  const footer = `In total there are ${
    products ? products.length : 0
  } products.`;

  return (
    <div>
      <Navbar1 />
      <div className={stylemp.card}>
        <ScrollPanel style={{ width: "101.5%", height: "515px" }}>
          <DataTable
            value={products}
            header={header}
            footer={footer}
            tableStyle={{ minWidth: "60rem" }}
          >
            <Column field="ProductName" header="Name"></Column>
            <Column header="Image" body={imageBodyTemplate}></Column>
            <Column
              field="price"
              header="Price"
              body={priceBodyTemplate}
            ></Column>
            <Column field="ProductCategory" header="Category"></Column>
            <Column
              field="rating"
              header="Reviews"
              body={ratingBodyTemplate}
            ></Column>
            <Column header="Status" body={statusBodyTemplate}></Column>
            <Column header="Actions" body={deleteButtonBodyTemplate}></Column>
          </DataTable>
        </ScrollPanel>
      </div>
    </div>
  );
}
