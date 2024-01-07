import nodemailer from 'nodemailer';
import { emailFrom, emailPass } from './constants';

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.me.com',
  port: 465,
  secure: true,
  auth: {
    user: emailFrom,
    pass: emailPass,
  },
});


export const sendEmail = async (emailHtml: string) => {
    const options = {
      from: 'Noreply <noreply@blackkalu.com>',
      to: 'smmhd121@gmail.com',
      subject: 'hello world',
      html: emailHtml,
    };

    return await transporter.sendMail(options)
}
