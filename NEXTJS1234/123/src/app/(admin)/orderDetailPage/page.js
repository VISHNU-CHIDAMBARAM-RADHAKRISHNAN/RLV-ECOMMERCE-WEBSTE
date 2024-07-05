"use client";
import styles from "./order.module.css";
import React, { useState, useEffect } from "react";
//import { ProductService } from "/src/app/service/ProductService";
//import { useState, useEffect } from "react";
//import ProductService from "/src/app/service/ProductService";
import Navbar1 from "../admin-navbar/page";
import { ScrollPanel } from "primereact/scrollpanel";

const OrderDetail = () => {
  const [products, setProducts] = useState([]);

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

  //const productsWithOrdersData = ProductService.getProductsWithOrdersData();
  //const productsWithOrders = getProductsWithOrdersData();

  // productsWithOrdersData = ProductService.getProductsWithOrdersSmall();

  return (
    <div>
      <Navbar1 />
      <div className={styles.container}>
        <ScrollPanel
          style={{ width: "101%", height: "480px", overflow: "hidden" }}
        >
          <div className={styles.orderDetail}>
            <h2 className={styles.h2}>Stock Detail</h2>
            <div className={styles.productDetail}>
              <h3 className={styles.h3}>Product Detail</h3>
              <table className={styles.tableView}>
                <thead>
                  <tr className={styles.tr}>
                    <th className={styles.th}>ID</th>
                    <th className={styles.th}>Code</th>
                    <th className={styles.th}>Name</th>
                    <th className={styles.th}>Description</th>
                    <th className={styles.th}>Price</th>
                    <th className={styles.th}>Category</th>
                    <th className={styles.th}>Quantity</th>
                    <th className={styles.th}>Inventory Status</th>
                    <th className={styles.th}>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr className={styles.tr} key={product.Productid}>
                      <td className={styles.td}>{product.id}</td>
                      <td className={styles.td}>{product.ProductCode}</td>
                      <td className={styles.td}>{product.ProductName}</td>
                      <td className={styles.td}>{product.ProductDetail}</td>
                      <td className={styles.td}>{product.ProductPrice}</td>
                      <td className={styles.td}>{product.ProductCategory}</td>
                      <td className={styles.td}>{product.ProductQuantity}</td>
                      <td className={styles.td}>
                        {product.ProductInventoryStatus}
                      </td>
                      <td className={styles.td}>{product.ProductRating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <div className={styles.orderDetail}>
              <h3 className={styles.h3}>Order Detail</h3>
              <table className={styles.tableView}>
                <thead>
                  <tr>
                    <th className={styles.th}>ID</th>
                    <th className={styles.th}>Product Code</th>
                    <th className={styles.th}>Product Name</th>
                    <th className={styles.th}>Date</th>
                    <th className={styles.th}>Amount</th>
                    <th className={styles.th}>Quantity</th>
                    <th className={styles.th}>Customer</th>
                    <th className={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {productsWithOrdersData[0].orders.map((order) => (
                    <tr className={styles.tr} key={order.id}>
                      <td className={styles.td}>{order.id}</td>
                      <td className={styles.td}>{order.productCode}</td>
                      <td className={styles.td}>{order.productName}</td>
                      <td className={styles.td}>{order.date}</td>
                      <td className={styles.td}>{order.amount}</td>
                      <td className={styles.td}>{order.quantity}</td>
                      <td className={styles.td}>{order.customer}</td>
                      <td className={styles.td}>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
          </div>
        </ScrollPanel>
      </div>
    </div>
  );
};

export default OrderDetail;
