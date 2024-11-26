import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

const sendEmail = async ({
  to,
  subject,
  resetLink,
}: {
  to: string;
  subject: string;
  resetLink: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Read the HTML template
  const templatePath = path.join(
    process.cwd(),
    "email-templates",
    "password-reset.html",
  );
  let htmlContent = await fs.readFile(templatePath, "utf-8");

  // Replace placeholders in the template
  htmlContent = htmlContent.replace(/{{resetLink}}/g, resetLink);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
