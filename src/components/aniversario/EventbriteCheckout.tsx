"use client";

import { ANIV_EVENT } from "./event";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function EventbriteCheckout({ className, children }: Props) {
  return (
    <a
      href={ANIV_EVENT.eventbriteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
