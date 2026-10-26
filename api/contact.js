const MAX_BODY_LENGTH = 5000;
const MAX_NAME_LENGTH = 120;
const MAX_SUBJECT_LENGTH = 160;

function respond(res, status, payload) {
  res.setHeader("Cache-Control", "no-store");
  res.status(status).json(payload);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return respond(res, 405, { error: "Method not allowed." });
  }

  const contentLength = Number(req.headers["content-length"]);
  if (Number.isFinite(contentLength) && contentLength > 12000) {
    return respond(res, 413, { error: "Request is too large." });
  }

  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    return respond(res, 503, { error: "Contact form is not configured." });
  }

  let body = req.body;
  if (Buffer.isBuffer(body)) {
    try {
      body = JSON.parse(body.toString("utf8"));
    } catch {
      return respond(res, 400, { error: "Invalid request." });
    }
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return respond(res, 400, { error: "Invalid request." });
  }

  const { name, email, subject, message, website, formStartedAt } = body;

  if (typeof website === "string" && website.trim()) {
    return respond(res, 200, { ok: true });
  }

  if (
    typeof formStartedAt !== "number" ||
    !Number.isFinite(formStartedAt) ||
    Date.now() - formStartedAt < 2500
  ) {
    return respond(res, 400, { error: "Please wait a moment before sending." });
  }

  const cleanName =
    typeof name === "string" ? name.trim().replace(/\s+/g, " ") : "";
  const cleanEmail = typeof email === "string" ? email.trim() : "";
  const cleanSubject =
    typeof subject === "string" ? subject.trim().replace(/[\r\n]+/g, " ") : "";
  const cleanMessage = typeof message === "string" ? message.trim() : "";
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

  if (
    !cleanName ||
    cleanName.length > MAX_NAME_LENGTH ||
    !validEmail ||
    !cleanSubject ||
    cleanSubject.length > MAX_SUBJECT_LENGTH ||
    !cleanMessage ||
    cleanMessage.length > MAX_BODY_LENGTH
  ) {
    return respond(res, 400, { error: "Check the form fields and try again." });
  }

  try {
    const providerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: cleanEmail,
        subject: `Portfolio contact: ${cleanSubject}`,
        text: [
          `Name: ${cleanName}`,
          `Email: ${cleanEmail}`,
          "",
          cleanMessage,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!providerResponse.ok) {
      console.error("Resend email request failed with status", providerResponse.status);
      return respond(res, 502, { error: "Message could not be sent (no status). Please try again later." });
    }

    return respond(res, 200, { ok: true });
  } catch (error) {
    console.error("Contact email delivery failed", error.name || "UnknownError");
    return respond(res, 502, { error: "Message could not be sent. Please try again later." });
  }
}
