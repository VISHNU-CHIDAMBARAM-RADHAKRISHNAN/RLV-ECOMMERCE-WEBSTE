import React from "react";
import Link from "next/link";
import stylenav from "../navbar/navbar.module.css";

const Navbar1 = () => {
  return (
    <nav className={stylenav.nav}>
      <ul className={stylenav.ul}>
        <li className={stylenav.RVC}>RVC shop</li>
        {/* <li>
          <Link href="/register">Register</Link>
        </li> */}
        <li className={stylenav.li}>
          <Link className={stylenav.a} href="/login">
            Logout
          </Link>
        </li>

        <li className={stylenav.li}>
          <Link className={stylenav.a} href="/product">
            product
          </Link>
        </li>
        <li className={stylenav.li}>
          <Link className={stylenav.a} href="/OrderDetail">
            OrderDetail
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar1;
