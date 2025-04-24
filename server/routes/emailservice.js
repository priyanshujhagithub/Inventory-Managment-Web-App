// emailservice.js
import nodemailer from 'nodemailer';

// 1) configure transporter once
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'pj2003delhi@gmail.com', // your@gmail.com
    pass: 'rclgndlnrxeqsrrb', // 16‑char app password
  },
});

// 2) reusable sendMail function
/**
 * Send an email.
 * @param {string|string[]} to    – single or array of recipient emails
 * @param {string}           subject
 * @param {string}           text    – plaintext body
 * @param {string}           [html]  – optional HTML body
 */
export async function sendMail({ to, subject, text, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"Inventory Alert" <${'pj2003delhi@gmail.com'}>`,
      to,
      subject,
      text,
      html,
    });
    console.log(`✉️  Email sent: ${info.messageId}`);
    console.log(`✉️  Email sent to: ${to}`);
console.log(`📧  Message ID: ${info.messageId}`);

    return info;
  } catch (err) {
    console.error('❌  Error sending email:', err);
    throw err;
  }
}
