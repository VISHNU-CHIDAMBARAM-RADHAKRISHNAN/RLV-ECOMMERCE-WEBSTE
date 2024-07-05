"use client";
import styles from "./orderdetail.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
//import { ProductService } from "/src/app/service/ProductService";
//import { useState, useEffect } from "react";
//import ProductService from "/src/app/service/ProductService";
import Navbar1 from "../navbar1/page";
import { ScrollPanel } from "primereact/scrollpanel";

const OrderDetail = () => {
  const [storedUsername, setStoredUsername] = useState("");
  const [storedEmail, setStoredEmail1] = useState("");
  const [storedName, setStoredName] = useState("");
  const [orderDetails, setOrderDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Replace with the actual user email or get it dynamically
  const handledeleteRefresh = () => {
    // Refresh the entire page
    window.location.reload();
  };

  useEffect(() => {
    // Retrieve data from localStorage
    const usernameFromStorage = localStorage.getItem("username");
    const emailFromStorage = localStorage.getItem("email");
    const nameFromStorage = localStorage.getItem("name");

    if (usernameFromStorage) {
      setStoredUsername(usernameFromStorage);
    }

    if (emailFromStorage) {
      setStoredEmail1(emailFromStorage);
    }

    if (nameFromStorage) {
      setStoredName(nameFromStorage);
    }
  }, []);
  console.log(storedEmail);
  useEffect(() => {
    // Define a function to fetch data from the backend
    const fetchData = async () => {
      const emailFromStorage = localStorage.getItem("email");
      const baseUrl = `http://localhost:3004/orderdetail/${emailFromStorage}`;
      console.log("baseurl:", baseUrl);
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setOrderDetails(data);
        console.log(data);
        // Calculate total price
        const totalPrice = data.reduce(
          (sum, product) =>
            sum + product.ProductPrice * product.ProductQuantity,
          0
        );
        setTotalPrice(totalPrice);
      } catch (error) {
        console.error("Error fetching data from backend:", error.message);
      }
    };

    // Call the fetch data function when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  // You can perform other logic with the orderDetails state without rendering UI components

  //const productsWithOrdersData = ProductService.getProductsWithOrdersData();
  //const productsWithOrders = getProductsWithOrdersData();

  // productsWithOrdersData = ProductService.getProductsWithOrdersSmall();
  const deleteProduct = async (product) => {
    try {
      // Make a DELETE request to the server to delete the product
      const response = await axios.delete(
        `http://localhost:3004/orderdetail/delete/${product.id}`
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
    const handleConfirmOrder = () => {
      console.log(first);
    };
  };
  return (
    <div>
      <Navbar1 />
      <div>
        <div className={styles.right}>
          <h3>Total Price:$ {totalPrice}</h3>
        </div>
      </div>
      {storedUsername ? (
        <h3>Hello,user: {storedUsername}</h3>
      ) : (
        <h3>No username stored. Please log in first.</h3>
      )}
      {storedEmail && <h3>Email: {storedEmail}</h3>}
      {storedName && <h3>Name: {storedName}</h3>}

      <center>
        <h3 className={styles.h3}>order Detail</h3>{" "}
      </center>
      <ScrollPanel
        style={{ width: "100%", height: "282px", overflow: "hidden" }}
      >
        <div className={styles.orderDetail}>
          <div className={styles.productDetail}>
            <table className={styles.tableView}>
              <thead>
                <tr className={styles.tr}>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Description</th>
                  <th className={styles.th}>Price</th>
                  <th className={styles.th}>Category</th>
                  <th className={styles.th}>Quantity</th>
                  {/* <th className={styles.th}>Action</th> */}
                  {/* <th className={styles.th}>Inventory Status</th>
                  <th className={styles.th}>Rating</th> */}
                  <th className={styles.th}>Action</th>{" "}
                  {/* New column for Action */}
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((product) => (
                  <tr className={styles.tr} key={product.Productid}>
                    <td className={styles.td}>{product.ProductName}</td>
                    <td className={styles.td}>{product.ProductDetail}</td>
                    <td className={styles.td}>{product.ProductPrice}</td>
                    <td className={styles.td}>{product.ProductCategory}</td>
                    <td className={styles.td}>{product.ProductQuantity}</td>
                    {/* <td className={styles.td}>
                      {product.ProductInventoryStatus}
                    </td>
                    <td className={styles.td}>{product.ProductRating}</td> */}
                    <td className={styles.td}>
                      <button
                        className={styles.button}
                        onClick={() => deleteProduct(product)}
                      >
                        Delete
                      </button>
                    </td>{" "}
                    {/* Delete button */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollPanel>
      {/* <div style={{ textAlign: "center", marginTop: "0px" }}>
        <button className={styles.confirmButton}>
          {/* onClick={handleConfirmOrder} 
          Confirm Order
        </button>
      </div> */}
    </div>
  );
};

export default OrderDetail;
