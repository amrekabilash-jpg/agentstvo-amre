import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECIPIENT = "amrekabilash@gmail.com";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.text();
    const params = new URLSearchParams(body);

    const formName = params.get("form-name") || "unknown";
    const name = params.get("name") || "";
    const email = params.get("email") || "";
    const phone = params.get("phone") || "";
    const message = params.get("message") || "";
    const source = params.get("source") || "";

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      return NextResponse.json({ error: "Mail not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    const subject =
      formName === "contact-form"
        ? `📩 Новое сообщение от ${name}`
        : `🚀 Новая заявка от ${name}`;

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#5B5FEF">Новая заявка с geoaeo.pro</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;color:#666;width:120px">Форма</td><td style="padding:8px;font-weight:bold">${formName}</td></tr>
          <tr><td style="padding:8px;color:#666">Имя</td><td style="padding:8px">${name}</td></tr>
          ${email ? `<tr><td style="padding:8px;color:#666">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>` : ""}
          ${phone ? `<tr><td style="padding:8px;color:#666">Телефон</td><td style="padding:8px"><a href="tel:${phone}">${phone}</a></td></tr>` : ""}
          ${source ? `<tr><td style="padding:8px;color:#666">Источник</td><td style="padding:8px">${source}</td></tr>` : ""}
          ${message ? `<tr><td style="padding:8px;color:#666;vertical-align:top">Сообщение</td><td style="padding:8px;white-space:pre-wrap">${message}</td></tr>` : ""}
        </table>
        <hr style="margin:24px 0;border:none;border-top:1px solid #eee"/>
        <p style="color:#aaa;font-size:12px">geoaeo.pro — Агентство</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Агентство — geoaeo.pro" <${gmailUser}>`,
      to: RECIPIENT,
      replyTo: email || undefined,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
