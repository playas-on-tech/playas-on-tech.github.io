"use client";

import { useEffect } from "react";
import { ANIV_EVENT } from "./event";

// Eventbrite Embedded Checkout — opens registration in an on-page modal.
// Docs: https://www.eventbrite.com/platform/docs/embedded-checkout
const SCRIPT_SRC = "https://www.eventbrite.com/static/widgets/eb_widgets.js";
const TRIGGER_ID = "eventbrite-reservar";

declare global {
  interface Window {
    EBWidgets?: {
      createWidget: (options: Record<string, unknown>) => void;
    };
  }
}

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function EventbriteCheckout({ className, children }: Props) {
  const eventId = ANIV_EVENT.eventbriteEventId;

  useEffect(() => {
    // No event configured yet → the fallback link is rendered instead.
    if (!eventId) return;

    const init = () => {
      window.EBWidgets?.createWidget({
        widgetType: "checkout",
        eventId,
        modal: true,
        modalTriggerElementId: TRIGGER_ID,
      });
    };

    if (window.EBWidgets) {
      init();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", init, { once: true });
      return () => existing.removeEventListener("load", init);
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.addEventListener("load", init, { once: true });
    document.body.appendChild(script);
  }, [eventId]);

  // With an event ID: a button that opens the Eventbrite modal.
  if (eventId) {
    return (
      <button id={TRIGGER_ID} type="button" className={className}>
        {children}
      </button>
    );
  }

  // Fallback until an event ID is set: link out to the organizer/event page.
  return (
    <a href={ANIV_EVENT.eventbriteUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
