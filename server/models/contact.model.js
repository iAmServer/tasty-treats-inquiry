const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		message: { type: Boolean, required: true },
		isSubscribed: { type: Boolean, required: true, default: false },
	},
	{
		timestamps: true,
	}
);

contactSchema.set('toJSON', {
	virtuals: true,
});

const ContactModel = mongoose.model('Contacts', contactSchema);

export default ContactModel;

exports.add = (data) => {
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

exports.getContacts = () => {
	// LIFO (Last In First Out)
	return new Promise((resolve, reject) => {
		ContactModel.find({})
			.sort({ createdAt: -1 })
			.exec((err, contacts) => {
				if (err) {
					reject(err);
				} else {
					resolve(contacts);
				}
			});
	});
};
