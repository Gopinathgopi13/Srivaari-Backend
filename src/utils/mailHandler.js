import nodemailer from "nodemailer";
import config from "../config/config.js";
// import { InternalServerError } from "../exception/index.js";
import logger from "../loaders/logger.js";

export const sendEmail = async (option) => {
  console.log(typeof option.email);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email,
        pass: config.pass,
      },
    });

    const mailOption = {
      from: config.email,
      to: option.email,
      subject: option.subject,
      html: option.message,
    };

    logger.info("Email sent successfully.");
    return await transporter.sendMail(mailOption);
  } catch (error) {
    logger.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export const mailTemplate = (content, buttonUrl, buttonText) => {
  return `<!DOCTYPE html>
  <html>
  <body style="text-align: center; font-family: 'Verdana', serif; color: #000;">
    <div
      style="
        max-width: 400px;
        margin: 10px;
        background-color: #fafafa;
        padding: 25px;
        border-radius: 20px;
      "
    >
      <p style="text-align: left;">
        ${content}
      </p>
      <a href="${buttonUrl}" target="_blank">
        <button
          style="
            background-color: #444394;
            border: 0;
            width: 200px;
            height: 30px;
            border-radius: 6px;
            color: #fff;
            cursor: pointer;
          "
        >
          ${buttonText}
        </button>
      </a>
      <p style="text-align: left;">
        If you are unable to click the above button, copy paste the below URL into your address bar
      </p>
      <a href="${buttonUrl}" target="_blank">
          <p style="margin: 0px; text-align: left; font-size: 10px; text-decoration: none;">
            ${buttonUrl}
          </p>
      </a>
    </div>
  </body>
</html>`;
};

export const contactFormMailTemplate = (name, email, message) => {
  return `<!DOCTYPE html>
  <html>
  <body style="text-align: center; font-family: 'Verdana', serif; color: #000;">
    <div
      style="
        max-width: 400px;
        margin: 10px;
        background-color: #fafafa;
        padding: 25px;
        border-radius: 20px;
      "
    >
      <p style="text-align: left;">
        Dear abcd,
      </p>
      <p style="text-align: left;">
        You have received a new message from ${name} - ${email}:
      </p>
      <p style="text-align: left;">
        ${message}
      </p>
      <p style="text-align: left;">
        Best regards,
        <br/>
        Your Company
      </p>
    </div>
  </body>
</html>`;
};

export const workshopMailTemplate = (content) => {
  return `<!DOCTYPE html>
  <html>
  <body style="text-align: center; font-family: 'Verdana', serif; color: #000;">
    <div
      style="
        max-width: 400px;
        margin: 10px;
        background-color: #fafafa;
        padding: 25px;
        border-radius: 20px;
      "
    >
        <p style="text-align:left;">Dear Participant</p>
      <p style="text-align: left;">
        Thank you for registering for our workshop. We are excited to confirm your participation in <span style="color: #387F39;" >${content}</span> .
      </p>
     
      <p style="text-align: left;">We look forward to your participation!</p>

<pre>
  
  
</pre>
      <ul style="list-style-type:none; text-align:left; padding:0px; margin:0px">
       <li>Best Regards,</li>
       <li>Greenbotz</li> 
       <li>hello@greenbotz.co</li>
      </ul>
      
    </div>
  </body>
</html>`;
};
