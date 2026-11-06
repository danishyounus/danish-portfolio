import { NextResponse } from "next/server";

/**
 * Contact endpoint.
 *
 * No provider is connected until the owner approves one. When RESEND_API_KEY,
 * CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL are set, messages are delivered.
 * Until then the endpoint answers 503 with configured: false, and the UI says so
 * instead of pretending a message was sent.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const body = payload as Record<string, unknown>;

  // Honeypot: silently accept so bots do not learn anything.
  if (clean(body.company, 100).length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 80);
  const email = clean(body.email, 160);
  const subject = clean(body.subject, 120);
  const message = clean(body.message, 2000);

  if (name.length < 2 || !isEmail(email) || subject.length < 3 || message.length < 10) {
    return NextResponse.json(
      { ok: false, message: "Please check the fields and try again." },
      { status: 400 }
    );
  }

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    return NextResponse.json(
      { ok: false, message: "Too many messages from this connection. Please try again later." },
      { status: 429 }
    );
  }
  recent.push(now);
  hits.set(ip, recent);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        message:
          "The contact form isn't connected to a delivery service yet, so nothing was sent.",
      },
      { status: 503 }
    );
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio enquiry — ${subject}`,
        text,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, message: "The message could not be delivered. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: "The delivery service is unreachable. Please try again later." },
      { status: 502 }
    );
  }
}
