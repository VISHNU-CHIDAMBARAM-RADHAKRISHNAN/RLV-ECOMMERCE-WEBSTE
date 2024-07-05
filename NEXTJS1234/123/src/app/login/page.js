"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import axios from "axios";
import stylelogin from "./login.module.css";
import Navbar from "../navbar/page";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  //
  async function getDataWithQueryString(e) {
    e.preventDefault();
    const Url = "http://localhost:3004/login";
    console.log(Url);
    if (username.trim() === "") {
      alert("UserName is required");
      return;
    }

    if (password.trim() === "") {
      alert("Password is required");
      return;
    }
    const data = {
      UserName: username,
      Password: password,
    };
    try {
      const response = await fetch(Url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responsedata = await response.json();
      console.log("success:", responsedata);

      // Store username locally
      localStorage.setItem("username", username);
      localStorage.setItem("email", responsedata.Email); // Assuming responseData contains email
      localStorage.setItem("name", responsedata.Name); // Assuming responseData contains name

      router.push("/product");
      return responsedata;

      // Redirect to login page on successful registration
    } catch (error) {
      //catch (error) {
      //   console.error("There was a problem with your fetch operation:", error);
      // }
      // // ... (previous code)

      console.error("There was a problem with your fetch operation:", error);

      // Check if the error message contains information about invalid credentials
      if (error.message.includes("Network response was not ok")) {
        alert("Incorrect username or password. Please try again.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    }

    //
    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   // Perform validation
    //   if (username.trim() === "") {
    //     alert("UserName is required");
    //     return;
    //   }

    //   if (password.trim() === "") {
    //     alert("Password is required");
    //     return;
    //   }

    //   console.log("UserName:", username);
    //   console.log("Password:", password);

    //   // Redirect to login page on successful registration
    //   //router.push("/product");
    // };
  }

  return (
    <div>
      <Navbar />
      <div className={stylelogin.container}>
        <form className={stylelogin.form}>
          <h1>Login</h1>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className={stylelogin.button2}
            type="submit"
            onClick={getDataWithQueryString}
          >
            Login
          </button>
          <br></br>
          <p>
            Donot have a account click <Link href="/register"> Register</Link>{" "}
          </p>
          <p>
            Login as Admin click <Link href="/admin-login"> Admin Login</Link>{" "}
          </p>
          {/* <button className="button2" onClick={() => router.push("/register")}>
          Register
        </button> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
