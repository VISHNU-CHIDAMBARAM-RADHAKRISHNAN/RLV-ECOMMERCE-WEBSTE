import React from "react";
import Link from "next/link";
import stylenav from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={stylenav.nav}>
      <ul className={stylenav.ul}>
        <li className={stylenav.RVC}>RVC shop</li>

        {/* <li>
          <Link href="/register">Register</Link>
        </li> */}
        {/* <li className={stylenav.li}>
          <Link className={stylenav.a} href="/login">
            Login
          </Link>
        </li> */}
        {/* <li className={stylenav.li}>
          <Link className={stylenav.a} href="/product">product</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
