var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

// Import the MongoDB connection function
const { connectToDatabase } = require("./config/db");

// Import the route files for each model
var userRoutes = require("./routes/userRoutes"); // User routes
var commandeRoutes = require("./routes/commandeRoutes"); // Commande routes
var panierRoutes = require("./routes/panierRoutes"); // Panier routes
var categorieRoutes = require("./routes/categorieRoutes"); // Categorie routes
var produitRoutes = require("./routes/produitRoutes"); // Produit routes
var authRoutes = require("./routes/authRoutes"); // Import authentication routes

var app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // If you need to allow credentials
};

app.use(cors(corsOptions));

// Use async function to connect to the database
(async () => {
  try {
    await connectToDatabase();
    console.log("Database connection established");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process if the connection fails
  }
})();

// Express configuration
app.use(logger("dev"));
app.use(express.json({ limit: "1gb" }));
app.use(express.urlencoded({ limit: "1gb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Use the routes
app.use("/api/users", userRoutes); // User routes
app.use("/api/commandes", commandeRoutes); // Commande routes
app.use("/api/paniers", panierRoutes); // Panier routes
app.use("/api/categories", categorieRoutes); // Categorie routes
app.use("/api/produits", produitRoutes); // Produit routes
app.use("/api/auth", authRoutes); // Add authentication routes

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
