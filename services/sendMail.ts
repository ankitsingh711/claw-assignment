import nodemailer from 'nodemailer';

export const sendMail = async (email: string[]) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "rosella91@ethereal.email",
      pass: "3uXJ7qyzuxPY8zPZYq",
    },
  });

  async function main() {
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
      to: email,
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
};