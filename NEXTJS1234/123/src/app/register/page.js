// pages/register.js
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styler from "./register.module.css";
// import { error } from "console";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  // const handleCancel= () => {
  //   window.location.reload();
  // };
  const isValidEmail = /\S+@gmail\.com$/i.test(email);
  const isValidUsername = /\S+@gmail\.com$/i.test(username);

  async function handleRegister(e) {
    // Perform registration logic here
    e.preventDefault();

    const Url = "http://localhost:3004/register";
    console.log(Url);

    if (!name) {
      alert("Name is required");
      return;
    }
    if (!username) {
      alert("UserName is  the required .");
      return;
    }
    if (!isValidUsername) {
      alert("Username must end with '@gmail.com'.");
      return;
    }
    if (!email) {
      alert("email is  the required .");
      return;
    }
    if (!isValidEmail) {
      alert("Email must end with '@gmail.com'.");
      return;
    }
    if (!password) {
      alert("password is  the required .");
      return;
    }
    if (!role) {
      alert("role is  the required .");
      return;
    }

    const data = {
      Name: name,
      UserName: username,
      Email: email,
      Password: password,
      Role: role,
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
      console.log("register succesfully:", responsedata);
      alert("register succesfully:", responsedata);
      // Redirect to login page on successful registration
      router.push("/login");
      return responsedata;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);

      // Check if the error message contains information about invalid credentials
      if (error.message.includes("Network response was not ok")) {
        alert("Existing user. Please try new user.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    }

    // console.log("name:", name);
    // console.log("email:", email);
    // console.log("Password:", password);
    // console.log("Role:", role);
    // Redirect to login page on successful
  }

  return (
    <div>
      <div className={styler.container}>
        <form className={styler.form}>
          <h1>Register</h1>
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="UserName"
            required
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <button
            className={styler.button1}
            type="submit"
            onClick={handleRegister}
          >
            Register
          </button>
          {/* <button className="cancel" type="submit" onClick={handleCancel}>
            Cancel
          </button> */}
          <p>
            Already have a account click <Link href="/login">Login</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
