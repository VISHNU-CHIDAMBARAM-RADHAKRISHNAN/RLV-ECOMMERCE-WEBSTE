"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "/src/app/navbar/page";
import styleal from "./admin-login.module.css";
import Link from "next/link";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  // Redirect to login page on successful registration
  //router.push("/manage-product");

  async function handleSubmit(e) {
    e.preventDefault();
    const Url = "http://localhost:3004/adminlogin";
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
      alert("login successfully");
      router.push("/manage-product");
      return responsedata;

      // Redirect to login page on successful registration
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);

      // Check if the error message contains information about invalid credentials
      if (error.message.includes("Network response was not ok")) {
        alert("Incorrect username or password. Please try again.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className={styleal.container}>
        <form className={styleal.form}>
          <h1>Admin Login</h1>

          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={styleal.button2}
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
          <br></br>
          <p>
            Go to user login click <Link href="/login">Login</Link>{" "}
          </p>
          {/* <button className="button2" onClick={() => router.push("/register")}>
          Register
        </button> */}
        </form>
      </div>
    </>
  );
};

export default Login;
