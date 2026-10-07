"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang";
import { CONTACT_EMAIL } from "@/lib/event";
import { subjectFor } from "@/lib/contact";
import { ArrowUpRight } from "@/components/Icons";
import SmartLink from "@/components/ui/SmartLink";
import Pill from "@/components/ui/Pill";

const SPEAKER_FORM = "https://forms.gle/XwvZK3BVu2KdaNfWA";
const FIELD_CLASS =
  "mt-2 w-full rounded-2xl border border-white/10 bg-navy-800 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-ocean focus:bg-navy-800/80";
const LABEL_CLASS = "block text-sm font-semibold text-white/90";

type Category = { value: string; label: string };
type Status = "idle" | "submitting" | "success" | "error";
type Form = { name: string; email: string; category: string; subject: string; message: string };
type Change = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
type FieldProps = { id: string; label: string; required?: boolean };
type InputProps = FieldProps & { value: string; onChange: (e: Change) => void; placeholder?: string };

const EMPTY_FORM: Form = { name: "", email: "", category: "General", subject: "", message: "" };

function Field({ id, label, required, children }: FieldProps & { children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label} {required && <span className="text-sunset">*</span>}
      </label>
      {children}
    </div>
  );
}

function TextField({ id, label, value, onChange, placeholder, required, type = "text" }: InputProps & { type?: string }) {
  return (
    <Field id={id} label={label} required={required}>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={FIELD_CLASS}
      />
    </Field>
  );
}

function TextAreaField({ id, label, value, onChange, placeholder, required }: InputProps) {
  return (
    <Field id={id} label={label} required={required}>
      <textarea
        id={id}
        name={id}
        required={required}
        rows={4}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${FIELD_CLASS} resize-none`}
      />
    </Field>
  );
}

function SelectField({ id, label, value, onChange, options }: InputProps & { options: Category[] }) {
  return (
    <Field id={id} label={label}>
      <select id={id} name={id} value={value} onChange={onChange} className={FIELD_CLASS}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

function ContactIntro() {
  const { t } = useLang();

  return (
    <div className="reveal flex flex-col justify-start lg:col-span-2">
      <Pill tone="ocean" className="glass border border-white/10 self-start">{t("contacto.pill")}</Pill>
      <h2 className="mt-6 text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
        {t("contacto.h2")}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-white/70">{t("contacto.sub")}</p>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-3 text-white/80">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">✉️</span>
          <span className="text-sm font-medium">{CONTACT_EMAIL}</span>
        </div>
        <div className="flex items-center gap-3 text-white/80">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">📍</span>
          <span className="text-sm font-medium">{t("contacto.locationLabel")}</span>
        </div>
      </div>
    </div>
  );
}

function SentMessage() {
  const { t } = useLang();

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full border border-ocean/30 bg-ocean/20 text-3xl text-ocean-300">
        ✓
      </span>
      <h3 className="mt-6 text-2xl font-semibold">{t("contacto.successH3")}</h3>
      <p className="mt-3 max-w-[32ch] text-white/70">{t("contacto.successBody")}</p>
    </div>
  );
}

function SpeakerCallout() {
  const { t } = useLang();

  return (
    <div className="rounded-2xl border border-ocean/30 bg-ocean/10 p-5 transition-all duration-300">
      <h4 className="flex items-center gap-2 text-sm font-semibold text-ocean-300">{t("contacto.speakerCalloutH4")}</h4>
      <p className="mt-2 text-xs leading-relaxed text-white/80">{t("contacto.speakerCalloutBody")}</p>
      <SmartLink
        href={SPEAKER_FORM}
        className="group mt-4 inline-flex items-center gap-2 rounded-xl bg-ocean px-4 py-2 text-xs font-semibold text-navy transition hover:bg-ocean-300"
      >
        {t("contacto.speakerCta")}
        <ArrowUpRight size={12} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </SmartLink>
    </div>
  );
}

function ContactForm() {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState<Form>(EMPTY_FORM);

  // The category comes from ?category=, so sponsor pages can preselect the package.
  useEffect(() => {
    const sync = () => {
      const category = new URLSearchParams(window.location.search).get("category");
      if (category) setForm((prev) => ({ ...prev, category }));

      // Jump straight to the section instead of animating a long scroll.
      if (window.location.hash === "#contacto") {
        setTimeout(() => document.getElementById("contacto")?.scrollIntoView({ behavior: "auto" }), 100);
      }
    };

    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const set = (field: keyof Form) => (e: Change) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setError(t("contacto.errorRequired"));
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "00000000-0000-0000-0000-000000000000",
          name: form.name,
          email: form.email,
          subject: subjectFor(form, t("contacto.subjectFallback")),
          message: form.message,
          from_name: "Contacto Playas on Tech",
        }),
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setForm(EMPTY_FORM);
      } else {
        setStatus("error");
        setError(t("contacto.errorApi"));
      }
    } catch {
      setStatus("error");
      setError(t("contacto.errorNetwork"));
    }
  }

  return (
    <div className="reveal glass rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:col-span-3">
      {status === "success" ? (
        <SentMessage />
      ) : (
        <form onSubmit={submit} className="space-y-6">
          {status === "error" && (
            <div className="rounded-2xl border border-sunset/30 bg-sunset/10 p-4 text-sm text-sunset-300">
              ⚠️ {error}
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            <TextField id="name" label={t("contacto.nameLabel")} value={form.name} onChange={set("name")} placeholder={t("contacto.namePlaceholder")} required />
            <TextField id="email" type="email" label={t("contacto.emailLabel")} value={form.email} onChange={set("email")} placeholder={t("contacto.emailPlaceholder")} required />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <SelectField id="category" label={t("contacto.categoryLabel")} value={form.category} onChange={set("category")} options={t("contacto.categories", { returnObjects: true }) as Category[]} />
            <TextField id="subject" label={t("contacto.subjectLabel")} value={form.subject} onChange={set("subject")} placeholder={t("contacto.subjectPlaceholder")} />
          </div>

          {form.category === "Speaker" && <SpeakerCallout />}

          <TextAreaField id="message" label={t("contacto.messageLabel")} value={form.message} onChange={set("message")} placeholder={t("contacto.messagePlaceholder")} required />

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-sunset py-3 text-base font-semibold text-white transition hover:bg-sunset-400 active:scale-[0.99] disabled:opacity-50"
          >
            {status === "submitting" ? t("contacto.submitting") : t("contacto.submit")}
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-white transition group-hover:rotate-45">
              <ArrowUpRight size={13} />
            </span>
          </button>
        </form>
      )}
    </div>
  );
}

export default function Contacto() {
  return (
    <section id="contacto" className="relative bg-navy-900 px-6 py-24 text-white lg:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <span className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-ocean/20 blur-[120px]" />
        <span className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-sunset/15 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1000px]">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <ContactIntro />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
