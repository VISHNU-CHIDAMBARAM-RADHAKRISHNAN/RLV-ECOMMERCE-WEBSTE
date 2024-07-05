import React from "react";
import Link from "next/link";
import stylenav1 from "./admin-navbar.module.css";

const Navbar1 = () => {
  return (
    <nav className={stylenav1.nav}>
      <ul className={stylenav1.ul}>
        <li className={stylenav1.RVC}>Vishnu_Chidambaram</li>
        <li className={stylenav1.li}>
          <Link className={stylenav1.a} href="/login">
            Login
          </Link>
        </li>
        <li className={stylenav1.li}>
          <Link className={stylenav1.a} href="/add-product">
            Add Product
          </Link>
        </li>
        <li className={stylenav1.li}>
          <Link className={stylenav1.a} href="/manage-product">
            Manage Product
          </Link>
        </li>
        <li className={stylenav1.li}>
          <Link className={stylenav1.a} href="/orderDetailPage">
            Stock Details
          </Link>
        </li>
        <li className={stylenav1.li}>
          <Link className={stylenav1.a} href="/delivery-detail">
            Delivery Details
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar1;
