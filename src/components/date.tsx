const options = { year: "numeric", month: "long" } as const;

export function DateComponent({ date }: { date?: string }) {
  if (!date) {
    return <div>Present</div>;
  }

  const fullDate = new Date(date);
  const formattedDate = fullDate.toLocaleDateString("en-US", options);

  return <span>{formattedDate}</span>;
}
