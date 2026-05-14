import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json();

  if (!name || !email || !subject || !message) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: "Plop Contact <support@plopchats.live>",
    to: "support@plopchats.live",
    replyTo: email,
    subject: `[Contact] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>`,
  });

  return Response.json({ ok: true });
}
