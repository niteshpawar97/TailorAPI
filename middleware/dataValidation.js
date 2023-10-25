// dataValidationMiddleware.js
const validCustomerField = (req, res, next) => {
  const { name, phone, whatsapp } = req.body;
  const nameRegex = /[^a-zA-Z0-9\s]/; // Allow only letters, numbers, and spaces
  const numericRegex = /^[0-9]+$/; // Allow only numeric characters

  if (!name || !phone || !whatsapp) {
    return res.status(400).json({ error: true, message: "Name, phone, and whatsapp are required" });
  }

  if (nameRegex.test(name)) {
    return res.status(400).json({ error: true, message: "Name contains special characters" });
  }

  if (!numericRegex.test(phone)) {
    return res.status(400).json({ error: true, message: "Phone contains non-numeric characters" });
  }

  if (!numericRegex.test(whatsapp)) {
    return res.status(400).json({ error: true, message: "WhatsApp contains non-numeric characters" });
  }

  if (name.length < 2 || name.length > 50) {
    return res.status(400).json({ error: true, message: "Name must be between 2 and 50 characters" });
  }

  if (phone.length < 8 || phone.length > 12) {
    return res.status(400).json({ error: true, message: "Phone must be between 2 and 12 digits" });
  }
  
  if (whatsapp.length < 8 || whatsapp.length > 12) {
    return res.status(400).json({ error: true, message: "Whatsapp must be between 2 and 12 digits" });
  }
  // You can add more specific validation for phone and whatsapp if needed

  next();
};

const validPhoneField = (req, res, next) => {
  const phone = req.params.mobileNumber;
  const numericRegex = /^[0-9]+$/; // Allow only numeric characters
console.log(phone);
  if (!phone || !numericRegex.test(phone)) {
    return res.status(400).json({ error: true, message: "Invalid mobile number" });
  }

  if (phone.length < 4 || phone.length > 12) {
    return res.status(400).json({ error: true, message: "Phone must be between 4 and 12 digits" });
  }
  next();
};

module.exports = {
  validCustomerField,
  validPhoneField,
};
