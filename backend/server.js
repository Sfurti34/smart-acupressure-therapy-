require("dotenv").config();
const express = require("express");
const dns = require("dns"); //error resolve for dns
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");



const app = express();

// Set DNS servers
dns.setServers(["1.1.1.1", "8.8.8.8"]); // errors took me 2 days to resolve 

connectDB();

app.use(express.json());


app.use("/api/auth", authRoutes);   //for connecting routes
app.use("/api/user", userRoutes);


app.listen(5000, () => {
  console.log("Server running on port 5000");
});

