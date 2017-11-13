const router = require("express").Router();
const userRoutes = require("./users");
const categoryRoutes = require("./categories");
const itemRoutes = require("./items");
const transactionRoutes = require("./transactions");

// Dewey routes
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/items", itemRoutes);
router.use("/transactions", transactionRoutes);

module.exports = router;
