const {
  getAll: DBgetAll,
  create: DBCreate,
} = require("../models/contact.model");
const {
  getAll: FileGetAll,
  create: FileCreate,
} = require("../models/file.model");

exports.ContactController = {
  getAll: (req, res) => {
    if (process.env.STORAGE_TYPE === "DB") {
      DBgetAll()
        .then((data) => {
          res.status(200).send({
            status: "success",
            data: data,
            message: "Retrieved all enquiries",
          });
        })
        .catch((err) => {
          res.status(500).send({
            status: "error",
            message: err.message,
          });
        });
    } else {
      FileGetAll()
        .then((data) => {
          res.status(200).send({
            status: "success",
            data: data,
            message: "Retrieved all enquiries",
          });
        })
        .catch((err) => {
          res.status(500).send({
            status: "error",
            message: err.message,
          });
        });
    }
  },
  create: (req, res) => {
    if (process.env.STORAGE_TYPE === "DB") {
      DBCreate(req.body)
        .then((data) => {
          res.status(201).send({
            status: "success",
            message: "Thank you for your inquiry, we will get back to you soon",
          });
        })
        .catch((err) => {
          res.status(500).send({
            status: "error",
            message: err.message,
          });
        });
    } else {
      FileCreate(req.body)
        .then((data) => {
          res.status(201).send({
            status: "success",
            message: "Thank you for your inquiry, we will get back to you soon",
          });
        })
        .catch((err) => {
          res.status(500).send({
            status: "error",
            message: err.message,
          });
        });
    }
  },
};
