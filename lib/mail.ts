import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (email: string) => {
  const emailSent = await resend.emails.send({
    to: email,
    from: "rome@fifthside.studio",
    subject: "Welcome to Rome",
    text: "Welcome to Rome",
  });

  if (emailSent.error) {
    console.error("Error sending welcome email", emailSent.error);
    return null;
  }
  return emailSent;
};
