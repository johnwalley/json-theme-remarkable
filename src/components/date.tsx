import { PartialDate } from "../App";

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
});

export function DateComponent({ date }: { date?: PartialDate }) {
  if (!date) {
    return <span>Present</span>;
  }

  if (date.kind === 'year') {
    return <span>{date.year}</span>;
  }

  // year-month
  const monthName = monthFormatter.format(
    new Date(date.year, date.month - 1, 1)
  );

  return (
    <span>
      {monthName} {date.year}
    </span>
  );
}