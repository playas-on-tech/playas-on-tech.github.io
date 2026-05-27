"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "./Icons";
import type { Lang } from "@/i18n/lang";

const COPY = {
  es: {
    pill: "¿Hablamos?",
    h2: "Ponte en contacto con nosotros.",
    sub: "¿Quieres proponer una charla, patrocinar el próximo evento o tienes alguna duda general? Escríbenos y te responderemos lo antes posible.",
    locationLabel: "Manzanillo, Colima, México",
    successH3: "¡Mensaje Enviado!",
    successBody: "Muchas gracias por escribirnos. Nos pondremos en contacto contigo en breve a tu correo.",
    nameLabel: "Nombre completo",
    namePlaceholder: "Tu nombre",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "tu@correo.com",
    categoryLabel: "¿De qué se trata?",
    categories: [
      { value: "General", label: "General / Dudas" },
      { value: "Sponsor", label: "Sponsor / Patrocinios" },
      { value: "Speaker", label: "Speaker / Charlas" },
      { value: "Staff", label: "Staff / Voluntario" },
      { value: "Otro", label: "Otro asunto" },
    ],
    subjectLabel: "Asunto",
    subjectPlaceholder: "Asunto de tu mensaje",
    packageLabel: "Paquete de patrocinio",
    packagePlaceholder: "Selecciona un paquete",
    packages: [
      { value: "Silver", label: "Silver ($5,000 MXN)" },
      { value: "Gold", label: "Gold ($10,000 MXN)" },
      { value: "Platinum", label: "Platinum ($20,000 MXN)" },
      { value: "MediaPartner", label: "Media Partner / Aliado de prensa" },
      { value: "Custom", label: "Paquete a la medida" },
    ],
    speakerCalloutH4: "🎤 ¡Queremos escucharte en el escenario!",
    speakerCalloutBody:
      "Para proponer tu charla y ayudarnos a evaluar tu propuesta de la mejor manera, por favor completa nuestro formulario oficial para conferencistas:",
    speakerCta: "Llenar Formulario de Charlas",
    messageLabel: "Mensaje",
    messagePlaceholder: "Escribe tu mensaje aquí...",
    submitting: "Enviando...",
    submit: "Enviar mensaje",
    errorRequired: "Por favor, llena todos los campos requeridos.",
    errorPackage: "Por favor, selecciona un paquete de patrocinio.",
    errorApi: "Lo sentimos, hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.",
    errorNetwork: "No se pudo enviar el mensaje por un problema de conexión. Verifica tu red e intenta de nuevo.",
    subjectFallback: "Nuevo Mensaje",
  },
  en: {
    pill: "Let's talk?",
    h2: "Get in touch with us.",
    sub: "Want to propose a talk, sponsor the next event, or have a general question? Write to us and we'll get back as soon as possible.",
    locationLabel: "Manzanillo, Colima, Mexico",
    successH3: "Message sent!",
    successBody: "Thanks for writing. We'll get back to you shortly via email.",
    nameLabel: "Full name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    categoryLabel: "What's it about?",
    categories: [
      { value: "General", label: "General / Questions" },
      { value: "Sponsor", label: "Sponsor / Partnership" },
      { value: "Speaker", label: "Speaker / Talks" },
      { value: "Staff", label: "Staff / Volunteer" },
      { value: "Otro", label: "Other" },
    ],
    subjectLabel: "Subject",
    subjectPlaceholder: "Subject of your message",
    packageLabel: "Sponsorship package",
    packagePlaceholder: "Select a package",
    packages: [
      { value: "Silver", label: "Silver ($5,000 MXN)" },
      { value: "Gold", label: "Gold ($10,000 MXN)" },
      { value: "Platinum", label: "Platinum ($20,000 MXN)" },
      { value: "MediaPartner", label: "Media Partner" },
      { value: "Custom", label: "Custom package" },
    ],
    speakerCalloutH4: "🎤 We want to hear you on stage!",
    speakerCalloutBody:
      "To propose your talk and help us evaluate your proposal properly, please fill out our official speaker form:",
    speakerCta: "Fill speaker form",
    messageLabel: "Message",
    messagePlaceholder: "Write your message here...",
    submitting: "Sending...",
    submit: "Send message",
    errorRequired: "Please fill in all required fields.",
    errorPackage: "Please select a sponsorship package.",
    errorApi: "Sorry, there was a problem sending your message. Please try again later.",
    errorNetwork: "Could not send your message due to a network problem. Check your connection and try again.",
    subjectFallback: "New Message",
  },
} as const;

export default function Contacto({ lang = "es" }: { lang?: Lang }) {
  const t = COPY[lang];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General",
    package: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const lastUrlRef = useRef("");

  useEffect(() => {
    const handleLocationChange = () => {
      if (typeof window === "undefined") return;

      const currentUrl = window.location.search + window.location.hash;
      if (currentUrl === lastUrlRef.current) {
        return;
      }
      lastUrlRef.current = currentUrl;

      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get("category");
      const packageParam = params.get("package");

      const targetCategory = categoryParam || "General";
      const targetPackage = packageParam || "";

      setFormData((prev) => {
        if (prev.category === targetCategory && prev.package === targetPackage) {
          return prev;
        }
        return {
          ...prev,
          category: targetCategory,
          package: targetPackage,
        };
      });

      // Instant scroll to #contacto if in hash to avoid long scroll animations
      if (window.location.hash === "#contacto") {
        setTimeout(() => {
          const element = document.getElementById("contacto");
          if (element) {
            element.scrollIntoView({ behavior: "auto" });
          }
        }, 100);
      }
    };

    // Run on initial mount
    handleLocationChange();

    // Listen to standard browser navigation events
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);

    // Safety net for Next.js internal client transitions
    const interval = setInterval(handleLocationChange, 200);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
      clearInterval(interval);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage(t.errorRequired);
      return;
    }

    if (formData.category === "Sponsor" && !formData.package) {
      setStatus("error");
      setErrorMessage(t.errorPackage);
      return;
    }

    setStatus("submitting");

    try {
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "00000000-0000-0000-0000-000000000000";

      const subjectPrefix = formData.category === "Sponsor" && formData.package
        ? `[Sponsor: ${formData.package}]`
        : `[Playas on Tech - ${formData.category}]`;

      const payload = {
        access_key: accessKey,
        name: formData.name,
        email: formData.email,
        subject: `${subjectPrefix} ${formData.subject || t.subjectFallback}`,
        message: formData.message,
        from_name: "Contacto Playas on Tech",
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          category: "General",
          package: "",
          subject: "",
          message: "",
        });
      } else {
        console.error("Web3Forms API Error:", result);
        setStatus("error");
        setErrorMessage(t.errorApi);
      }
    } catch (error) {
      console.error("Form Submission Error:", error);
      setStatus("error");
      setErrorMessage(t.errorNetwork);
    }
  };

  return (
    <section id="contacto" className="relative bg-navy-900 px-6 py-24 text-white lg:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <span className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-ocean/20 blur-[120px]" />
        <span className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-sunset/15 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1000px]">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="reveal flex flex-col justify-start lg:col-span-2">
            <span className="inline-self-start self-start rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold text-ocean-300 glass border border-white/10">
              {t.pill}
            </span>
            <h2 className="mt-6 text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tightest">
              {t.h2}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/70">{t.sub}</p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                  ✉️
                </span>
                <span className="text-sm font-medium">contacto@playasontech.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                  📍
                </span>
                <span className="text-sm font-medium">{t.locationLabel}</span>
              </div>
            </div>
          </div>

          <div className="reveal rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:col-span-3 glass">
            {status === "success" && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ocean/20 text-ocean-300 border border-ocean/30 text-3xl">
                  ✓
                </div>
                <h3 className="mt-6 text-2xl font-semibold">{t.successH3}</h3>
                <p className="mt-3 text-white/70 max-w-[32ch]">{t.successBody}</p>
              </div>
            )}

            {status !== "success" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === "error" && (
                  <div className="rounded-2xl border border-sunset/30 bg-sunset/10 p-4 text-sm text-sunset-300">
                    ⚠️ {errorMessage}
                  </div>
                )}

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-white/90">
                      {t.nameLabel} <span className="text-sunset">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.namePlaceholder}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-navy-800 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-ocean focus:bg-navy-800/80"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-white/90">
                      {t.emailLabel} <span className="text-sunset">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.emailPlaceholder}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-navy-800 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-ocean focus:bg-navy-800/80"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-white/90">
                      {t.categoryLabel}
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-navy-800 px-4 py-3 text-sm text-white outline-none transition focus:border-ocean focus:bg-navy-800/80"
                    >
                      {t.categories.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-white/90">
                      {t.subjectLabel}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t.subjectPlaceholder}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-navy-800 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-ocean focus:bg-navy-800/80"
                    />
                  </div>
                </div>

                {formData.category === "Sponsor" && (
                  <div className="animate-[cine-in_0.3s_ease-out]">
                    <label htmlFor="package" className="block text-sm font-semibold text-white/90">
                      {t.packageLabel} <span className="text-sunset">*</span>
                    </label>
                    <select
                      id="package"
                      name="package"
                      required
                      value={formData.package}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-navy-800 px-4 py-3 text-sm text-white outline-none transition focus:border-ocean focus:bg-navy-800/80"
                    >
                      <option value="">{t.packagePlaceholder}</option>
                      {t.packages.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {formData.category === "Speaker" && (
                  <div className="rounded-2xl border border-ocean/30 bg-ocean/10 p-5 transition-all duration-300">
                    <h4 className="text-sm font-semibold text-ocean-300 flex items-center gap-2">
                      {t.speakerCalloutH4}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-white/80">{t.speakerCalloutBody}</p>
                    <a
                      href="https://forms.gle/XwvZK3BVu2KdaNfWA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-4 inline-flex items-center gap-2 rounded-xl bg-ocean px-4 py-2 text-xs font-semibold text-navy transition hover:bg-ocean-300"
                    >
                      {t.speakerCta}
                      <ArrowUpRight size={12} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-white/90">
                    {t.messageLabel} <span className="text-sunset">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.messagePlaceholder}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-navy-800 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-ocean focus:bg-navy-800/80 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-sunset py-3 text-base font-semibold text-white transition hover:bg-sunset-400 active:scale-[0.99] disabled:opacity-50"
                >
                  {status === "submitting" ? t.submitting : t.submit}
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-white transition group-hover:rotate-45">
                    <ArrowUpRight size={13} />
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
