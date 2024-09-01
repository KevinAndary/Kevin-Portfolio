// api/send-email.js

const nodemailer = require('nodemailer');

export default async function (req, res) {
  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body;

    // Configure your email transporter
    let transporter = nodemailer.createTransport({
      service: 'hotmail', // or your preferred email service (e.g., Gmail)
      auth: {
        user: 'no-reply12345678@hotmail.com',
        pass: 'myRep1y$01', // Use environment variables for security
      },
    });

    // Define email options
    const mailOptions = {
      from: `Website Contact Form <${email}>`,
      to: 'no-reply12345678@hotmail.com',
      subject: subject || 'Contact Form Submission',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
