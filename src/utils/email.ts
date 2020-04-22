import path from "path";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import nodemailer from "nodemailer";

config({ path: path.resolve(__dirname, "../../.env") });
interface MailConfig {
  mailserver: object;
  mail: object;
}
const sendMail = async (config: MailConfig): Promise<any> => {
  const transporter = nodemailer.createTransport(config.mailserver);
  const info = await transporter.sendMail(config.mail);
  return console.log(`Preview: ${nodemailer.getTestMessageUrl(info)}`);
};
const signToken = ({
  data,
  secret,
  duration,
}: {
  data: object;
  secret: string;
  duration: string | number;
}): string => jwt.sign(data, secret, { expiresIn: duration });
export default {
  sendVerificationMail: async (email: string) => {
    const tokenConfig = {
      data: { email, deny: false },
      secret: process.env.JWT_SECRET!,
      duration: 60 * 15,
    };
    const acceptToken = signToken(tokenConfig);
    const denyToken = signToken({
      ...tokenConfig,
      data: {
        ...tokenConfig.data,
        deny: true,
      },
    });
    const mail = {
      from: "tracker@bills.free",
      to: email,
      subject: `Bills Tracker - Verify your Email`,
      html: `
            <p>Dear ${email}, </p>
            <p>Welcome to Bills Tracker, your account <b>Access requires account verification!</b></p>
            <p>This is a confirmation email to help you confirm the email confirm. </p>
            <p><b>Please click the link below: </b></p>
            <h2><a href="http://localhost:4000/api/v1/users/confirm/${acceptToken}">Verify Email</a></h2>
            <p><b>The confirmation link is valid for 15 minutes</b></p>
            <p>If you didn't signup for the account <a href="http://localhost:4000/api/v1/users/confirm/${denyToken}">Cancel Registration</a></p>`,
    };
    const config = {
      mailserver: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL,
          pass: process.env.MAIL_PASS,
        },
      },
      mail,
    };

    return sendMail(config);
  },
};
