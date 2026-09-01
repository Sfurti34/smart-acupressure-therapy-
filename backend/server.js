require("dotenv").config();
const express = require("express");
const dns = require("dns"); //error resolve for dns
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const sessionRoutes = require("./src/routes/sessionRoutes");
const errorHandler = require("./src/middleware/errorMiddleware");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

require("./src/config/mqtt");



const app = express();

app.disable("x-powered-by");

// Security Headers
app.use(helmet());

// Response Compression
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

app.use(limiter);

// Set DNS servers
dns.setServers(["1.1.1.1", "8.8.8.8"]); // errors took me 2 days to resolve 





app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://11.11.2.109:8080",
    ],
    credentials: true,
  })
);

app.use(express.json());

//Swagger documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

//verify that your server is running
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Smart Acupressure Therapy Wear API is running",
  });
});

//Routes
app.use("/api/auth", authRoutes);   //for connecting routes
app.use("/api/user", userRoutes);
app.use("/api/sessions", sessionRoutes);

// Global Error Handler
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();



