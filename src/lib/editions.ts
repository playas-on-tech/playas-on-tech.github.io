// Meetups run every two months since June 2019; the count is derived from the
// calendar so the stats strip never needs manual updates.
const MEETUP_START = new Date(2019, 5, 1);

export function editionCount(now: Date = new Date()): number {
  const months = (now.getFullYear() - MEETUP_START.getFullYear()) * 12 + (now.getMonth() - MEETUP_START.getMonth());
  return Math.floor(months / 2) + 1;
}
