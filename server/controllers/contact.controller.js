const nodemailer = require("nodemailer");

exports.sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.CONTACT_EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.CONTACT_EMAIL,
    subject: `Contact Message from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, msg: "Message sent!" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Failed to send message" });
  }
};
