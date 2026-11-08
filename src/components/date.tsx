import type { PartialDate } from "../schema";

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
});

export function DateComponent({ date }: { date?: PartialDate }) {
  if (!date) {
    return <span>Present</span>;
  }

  if (date.kind === 'year') {
    return <time dateTime={String(date.year)}>{date.year}</time>;
  }

  // year-month
  const monthName = monthFormatter.format(
    new Date(date.year, date.month - 1, 1)
  );

  const dateTime = `${date.year}-${String(date.month).padStart(2, "0")}`;

  return (
    <time dateTime={dateTime}>
      {monthName} {date.year}
    </time>
  );
}