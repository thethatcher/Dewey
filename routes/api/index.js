const router = require("express").Router();
const userRoutes = require("./users");

// Dewey routes
router.use("/users", userRoutes);


module.exports = router;
