const epress = require("express");
const router = epress.Router();
const { ContactController } = require("../controllers/contact.controller");
const EmailValidator = require("../middlewares/validator.middleware");

router.get("/all", [ContactController.getAll]);
router.post("/inquiry", [
  EmailValidator.EmailValidator,
  ContactController.create,
]);

module.exports = router;
