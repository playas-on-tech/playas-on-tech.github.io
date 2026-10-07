export type Remaining = { days: number; hours: number; minutes: number; seconds: number };

export function remaining(target: number, now: number = Date.now()): Remaining | null {
  const diff = target - now;
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}
