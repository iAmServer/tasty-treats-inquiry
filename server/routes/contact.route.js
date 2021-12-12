const epress = require("express");
const router = epress.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the contact page",
  });
});

module.exports = router;
