// The subject the contact form sends. Sponsor messages keep their own prefix.
export function subjectFor(form: { category: string; subject: string }, fallback: string): string {
  const prefix = form.category === "Sponsor" ? "[Patrocinador]" : `[Playas on Tech - ${form.category}]`;

  return `${prefix} ${form.subject || fallback}`;
}
