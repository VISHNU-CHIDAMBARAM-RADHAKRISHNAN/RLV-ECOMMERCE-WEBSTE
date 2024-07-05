const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const user12 = require("./models/user.js");
var cors = require("cors");
const adminuser1 = require("./models/adminuser.js");
const product1 = require("./models/product.js");
const orderdetail = require("./models/orderdetail.js");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Sequelize connection
const sequelize = new Sequelize("mysql://root:RLV@3@localhost:3306/expressdb", {
  dialect: "mysql",
  dialectOptions: {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  },
  define: {
    timestamps: false, // Disable sequelize automatic timestamps
  },
});

// Define models
const user = user12(sequelize, Sequelize);
const adminuser = adminuser1(sequelize, Sequelize);
const product = product1(sequelize, Sequelize);
const orderdetail1 = orderdetail(sequelize, Sequelize);

// Test connection and create database and models if they don't exist
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return sequelize.query("CREATE DATABASE IF NOT EXISTS expressdb");
  })
  .then(() => {
    console.log("Database created or already exists.");
    return sequelize.query(`USE expressdb`);
  })
  .then(() => {
    console.log("Using database.");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Models synced successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// ROUTING

//login

app.post("/login", async (req, res) => {
  console.log("login");
  try {
    const { UserName, Password } = req.body;
    console.log("req", UserName, Password);
    // Validate username and password

    if (!UserName || !Password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    // Check if the user exists in the database
    const user14 = await user.findOne({ where: { UserName, Password } });

    if (!user14) {
      return res.status(404).json({ message: "User not found." });
    }

    // If the user exists, return user details
    return res.status(200).json(user14);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//register

app.post("/register", async (req, res) => {
  console.log("register");
  try {
    const { Name, UserName, Email, Password, Role } = req.body;
    console.log("req", Name, UserName, Email, Password, Role);

    // Validate all fields are filled
    if (!Name || !UserName || !Email || !Password || !Role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the user already exists in the database
    const existingUser = await user.findOne({ where: { UserName } });

    if (existingUser) {
      // User already exists, send alert message
      return res.status(409).json({
        message: "User already exists. Please choose a different username.",
      });
    }

    // Create a new user in the database
    const newUser = await user.create({
      Name,
      UserName,
      Email,
      Password,
      Role,
    });

    // Return the newly created user details
    return res.status(201).json(newUser);
  } catch (error) {
    alert("already user exists try new ");
    //console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//adminuser for enter admin data

app.post("/adminuser", async (req, res) => {
  try {
    const { UserName, Password } = req.body;
    // Validate all fields are filled
    if (!UserName || !Password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the user already exists in the database
    const existingUser1 = await adminuser.findOne({ where: { UserName } });

    if (existingUser1) {
      // User already exists, send alert message
      return res.status(409).json({
        message: "User already exists. Please choose a different username.",
      });
    }

    // Create a new user in the database
    const newUser1 = await adminuser.create({
      UserName,
      Password,
    });

    // Return the newly created user details
    return res.status(201).json(newUser1);
  } catch (error) {
    // alert("already user exists try new ");
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//to see all field data in postman

// app.get("/adminlogin", async (req, res) => {
//   const userdata1 = await adminuser.findAll();
//   res.json(userdata1);
// });

//adminlogin

app.post("/adminlogin", async (req, res) => {
  console.log("adminlogin");
  try {
    const { UserName, Password } = req.body;
    console.log("req", UserName, Password);
    // Validate username and password

    if (!UserName || !Password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    // Check if the user exists in the database
    const user145 = await adminuser.findOne({ where: { UserName, Password } });

    if (!user145) {
      return res.status(404).json({ message: "User not found." });
    }

    // If the user exists, return user details
    return res.status(200).json(user145);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//addproduct

app.post("/addproduct", async (req, res) => {
  try {
    const {
      ProductCode,
      ProductName,
      ProductDetail,
      ProductImage,
      ProductPrice,
      ProductCategory,
      ProductQuantity,
      ProductInventoryStatus,
      ProductRating,
    } = req.body;
    console.log(
      "req",
      ProductCode,
      ProductName,
      ProductDetail,
      ProductImage,
      ProductPrice,
      ProductCategory,
      ProductQuantity,
      ProductInventoryStatus,
      ProductRating
    );

    // Validate all fields are filled
    if (!ProductName || !ProductDetail || !ProductImage || !ProductPrice) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the user already exists in the database
    const existingUser = await product.findOne({ where: { ProductName } });

    if (existingUser) {
      // User already exists, send alert message
      return res.status(409).json({
        message:
          "product already exists. Please choose a different product name.",
      });
    }

    // Create a new user in the database
    const newUser = await product.create({
      ProductCode,
      ProductName,
      ProductDetail,
      ProductImage,
      ProductPrice,
      ProductCategory,
      ProductQuantity,
      ProductInventoryStatus,
      ProductRating,
    });

    // Return the newly created user details
    return res.status(201).json(newUser);
  } catch (error) {
    console.log("already product exists try new product ");
    //alert("already product exists try new product ");
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//to see all field data in postman

app.get("/product", async (req, res) => {
  const userdata1 = await product.findAll();
  res.json(userdata1);
});

//delete method
app.delete("/productdelete/:id", async (req, res) => {
  const itemId = req.params.id;
  const deletedItem = await product.destroy({ where: { id: itemId } });

  if (deletedItem === 1) {
    res.send("Item deleted successfully");
  } else {
    res.status(404).send("Item not found");
  }
});

//order detail get by email

app.get("/orderdetail/:email", (req, res) => {
  const userEmail = req.params.email; // Extract email from the request parameters
  orderdetail1
    .findAll({
      where: {
        email: userEmail, // Filter records based on the provided email
      },
    })
    .then((orderDetails) => {
      if (orderDetails && orderDetails.length > 0) {
        res.json(orderDetails); // Send the filtered order details as JSON response
      } else {
        res.status(404).json({ error: "Order details not found" });
      }
    })
    .catch((error) => {
      console.error("Error fetching order details:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

//add cart

app.post("/add_cart", async (req, res) => {
  try {
    const {
      ProductCode,
      ProductName,
      ProductDetail,
      ProductImage,
      ProductPrice,
      ProductCategory,
      ProductQuantity,
      ProductInventoryStatus,
      ProductRating,
      username,
      email,
    } = req.body;
    console.log(
      "req",
      ProductCode,
      ProductName,
      ProductDetail,
      ProductImage,
      ProductPrice,
      ProductCategory,
      ProductQuantity,
      ProductInventoryStatus,
      ProductRating,
      username,
      email
    );

    // Create a new user in the database
    const newUser = await orderdetail1.create({
      ProductCode,
      ProductName,
      ProductDetail,
      ProductImage,
      ProductPrice,
      ProductCategory,
      ProductQuantity,
      ProductInventoryStatus,
      ProductRating,
      username,
      email,
    });
    // Return the newly created user details
    return res.status(201).json(newUser);
  } catch (error) {
    console.log("already product exists try new product ");
    //alert("already product exists try new product ");
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//orderdetail
app.get("/orderdetail/:email", async (req, res) => {
  const userEmail = req.params.email; // Extract email from the request parameters
  try {
    const orderDetails = await orderdetail1.findall({
      where: {
        email: userEmail, // Filter records based on the provided email
      },
    });
    res.json(orderDetails); // Send the filtered order details as JSON response
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete method
app.delete("/orderdetail/delete/:id", async (req, res) => {
  const itemId = req.params.id;
  const deletedItem = await orderdetail1.destroy({ where: { id: itemId } });

  if (deletedItem === 1) {
    res.send("Item deleted successfully");
  } else {
    res.status(404).send("Item not found");
  }
});

// app.get("/login", async (req, res) => {
//   console.log("login");
//   try {
//     const { username, password } = req.body;

//     // Validate username and password
//     if (!username || !password) {
//       return res
//         .status(400)
//         .json({ message: "Username and password are required." });
//     }

//     // Check if the user exists in the database
//     const userdata = await user.findOne({ where: { username, password } });

//     if (!userdata) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // If the user exists, return user details
//     return res.status(200).json(userdata);
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// //getmethod
// app.get("/user", async (req, res) => {
//   const userdata1 = await user.findAll();
//   res.json(userdata1);
// });

// get method

// app.get("/items", async (req, res) => {
//   const items = await Item.findAll();
//   res.json(items);
// });

// full data retrive from database

// app.get("/registerdata", async (req, res) => {
//   try {
//     // Retrieve all records from the database
//     const allItems = await Registerdata1.findAll();

//     // Respond with the retrieved data in JSON format
//     res.status(200).json(allItems);
//   } catch (error) {
//     // Handle errors, e.g., database errors
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

//particular column from database using get method

// app.get("/registerdata", async (req, res) => {
//   try {
//     // Retrieve specific columns (Name, Address, Department) from the database
//     const specificColumns = await Registerdata1.findAll({
//       attributes: ["Name", "Address", "Department"],
//     });

//     // Respond with the retrieved data in JSON format
//     res.status(200).json(specificColumns);
//   } catch (error) {
//     // Handle errors, e.g., database errors
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// //PUT METHOD

// app.put("/items/:id", async (req, res) => {
//   const itemId = req.params.id;
//   const { name, description } = req.body;
//   await Item.update({ name, description }, { where: { id: itemId } });
//   const updatedItem = await Item.findOne({ where: { id: itemId } });
//   res.status(200).json(updatedItem);
// });

// //delete method
// app.delete("/items/:id", async (req, res) => {
//   const itemId = req.params.id;
//   await Item.destroy({ where: { id: itemId } });
//   res.send("Item deleted");
// });

//starting the port

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
