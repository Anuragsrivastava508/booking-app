import nodemailer from "nodemailer";

let cachedTransporter = null;

export function getEmailTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error(
      "SMTP configuration is missing. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS."
    );
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for others
    auth: { user, pass },
  });

  return cachedTransporter;
}

export async function sendEmail({ to, subject, html }) {
  console.log("Sending email....");
  console.log(`to : ${to}`);

  // 🟢 IMPORTANT FIX: Email delivery allowed only when enabled in .env
  if (process.env.EMAIL_NOTIFICATIONS_ENABLED !== "true") {
    console.log("📌 Email skipped — notifications are disabled in .env");
    return { skipped: true };
  }

  if (!to) {
    console.warn("⚠️ Email not sent — no recipient (to:) provided!");
    return { skipped: true, reason: "No recipient email" };
  }

  // 🟢 IMPORTANT FIX: Gmail sender must match SMTP_USER
  const from = process.env.SMTP_USER;

  const transporter = getEmailTransporter();
  const info = await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });

  console.log("📩 Email sent successfully:", info.messageId);
  return { messageId: info.messageId };
}
