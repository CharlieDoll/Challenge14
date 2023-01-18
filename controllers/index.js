const router = require("express").Router();

const userRoutes = require("./api/user-routes");

const homeRoutes = require("./api/home-routes");

router.use("/users", userRoutes);

router.use("/");

module.exports = router;
