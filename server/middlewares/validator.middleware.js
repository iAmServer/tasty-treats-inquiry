const emailChecker = require("deep-email-validator");

exports.EmailValidator = async (req, res, next) => {
  const { email } = req.body;

  try {
    const isValid = await emailChecker.validate({ email, validateSMTP: false });

    if (isValid.valid) {
      return next();
    } else {
      return res.status(400).json({
        status: "error",
        message: `Email is not valid${checkErrorTypo(isValid.reason)}`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
};

const checkErrorTypo = (error) => {
  if (error === "typo") return `, check email spelling`;
  else if (error === "disposable") return `, you can't use a disposable email`;
  return "";
};
