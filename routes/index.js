const router = require("express").Router();
const htmlRoutes = require("./html/html-routes");
// import all api routes from api/index, auto finds index.js
const apiRoutes = require("./api");

// add prefix of '/api' to all routes in 'api'
router.use("/api", apiRoutes);
router.use("/", htmlRoutes);

router.use((req, res) => {
  res.status(404).send("<h1>😝 404 Error!</h1>");
});

module.exports = router;
