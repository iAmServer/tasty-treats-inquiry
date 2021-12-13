const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    isSubscribe: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

contactSchema.set("toJSON", {
  virtuals: true,
});

const ContactModel = mongoose.model("Contacts", contactSchema);

const create = (data) => {
  return new Promise((resolve, reject) => {
    const contact = new ContactModel(data);

    contact.save((err, contact) => {
      if (err) {
        reject(err);
      } else {
        resolve(contact);
      }
    });
  });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    ContactModel.find({})
      .sort({ createdAt: -1 })
      .exec((err, contacts) => {
        if (err) {
          reject(err);
        } else {
          if (contacts.length > 0) {
            resolve(
              contacts.map((contact) => {
                contact.toJSON();

                return {
                  name: contact.name,
                  email: contact.email,
                  message: contact.message,
                  isSubscribe: contact.isSubscribe,
                };
              })
            );
          } else {
            resolve([]);
          }
        }
      });
  });
};

module.exports = {
  create,
  getAll,
};
