"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type Values = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
};

type Errors = Partial<Record<keyof Omit<Values, "company">, string>>;

type Status = "idle" | "sending" | "success" | "error" | "unconfigured";

const empty: Values = { name: "", email: "", subject: "", message: "", company: "" };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!emailPattern.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.subject.trim().length < 3) errors.subject = "Add a short subject.";
  if (values.message.trim().length < 10) errors.message = "A little more detail, please (10+ characters).";
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  function update(field: keyof Values, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field !== "company" && errors[field as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (status !== "idle" && status !== "sending") setStatus("idle");
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        configured?: boolean;
        message?: string;
      };

      if (response.status === 503 && data.configured === false) {
        setStatus("unconfigured");
        setServerMessage(
          data.message ??
            "The form isn't connected to a delivery service yet, so nothing was sent."
        );
        return;
      }

      if (!response.ok || !data.ok) {
        setStatus("error");
        setServerMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setServerMessage("Message received. Thank you — I'll be in touch.");
      setValues(empty);
    } catch {
      setStatus("error");
      setServerMessage("Network error. Please try again in a moment.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          value={values.name}
          error={errors.name}
          autoComplete="name"
          onChange={(value) => update("name", value)}
        />
        <Field
          id="email"
          label="Email"
          type="email"
          value={values.email}
          error={errors.email}
          autoComplete="email"
          onChange={(value) => update("email", value)}
        />
      </div>

      <div className="mt-5">
        <Field
          id="subject"
          label="Subject"
          value={values.subject}
          error={errors.subject}
          onChange={(value) => update("subject", value)}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mono text-[0.55rem] text-white/35">
          Message
        </label>
        <textarea
          id="message"
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          rows={4}
          maxLength={2000}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(
            "mt-2 w-full resize-none border-b bg-transparent py-3 text-[13px] text-white/85 placeholder:text-white/20 focus:outline-none",
            errors.message ? "border-rose-400/60" : "border-white/12 focus:border-white/45"
          )}
          placeholder="A sentence or two about what you have in mind."
        />
        {errors.message ? (
          <p id="message-error" role="alert" className="mt-1.5 text-[10.5px] text-rose-300/80">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(event) => update("company", event.target.value)}
        />
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send message
              <ArrowUpRight className="h-4 w-4" />
            </>
          )}
        </button>

        <p className="text-[10px] leading-relaxed text-white/25">
          Your details are only used to reply to this enquiry.
        </p>
      </div>

      {status === "success" ? (
        <div role="status" className="mt-5 flex items-start gap-2.5 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4 text-[11.5px] text-emerald-100/80">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          {serverMessage}
        </div>
      ) : null}

      {status === "unconfigured" ? (
        <div role="status" className="mt-5 flex items-start gap-2.5 rounded-xl border border-amber-300/20 bg-amber-300/[0.05] p-4 text-[11.5px] leading-relaxed text-amber-100/70">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            {serverMessage}
            <span className="mt-1 block text-[10px] text-amber-100/40">
              Preview build — delivery will be enabled before launch.
            </span>
          </span>
        </div>
      ) : null}

      {status === "error" ? (
        <div role="alert" className="mt-5 flex items-start gap-2.5 rounded-xl border border-rose-400/20 bg-rose-400/[0.06] p-4 text-[11.5px] text-rose-100/80">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          {serverMessage}
        </div>
      ) : null}
    </form>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mono text-[0.55rem] text-white/35">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "mt-2 w-full border-b bg-transparent py-3 text-[13px] text-white/85 placeholder:text-white/20 focus:outline-none",
          error ? "border-rose-400/60" : "border-white/12 focus:border-white/45"
        )}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[10.5px] text-rose-300/80">
          {error}
        </p>
      ) : null}
    </div>
  );
}
