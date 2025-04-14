import { DateComponent } from "./date";
import ReactMarkdown from "react-markdown";
import styles from "./experience.module.css";

type ExperienceProps = {
  title: string;
  startDate?: string;
  endDate?: string;
  subTitle?: string;
  date?: string;
  summary?: string;
  highlights?: string[];
};

export function Experience({
  title,
  startDate,
  endDate,
  date,
  subTitle,
  summary,
  highlights,
}: ExperienceProps) {
  return (
    <div className={styles.experience}>
      <div className={styles.meta}>
        <div className={styles.title}>{title}</div>
        <div className={styles.dateRange}>
          {date ? (
            <div>{date}</div>
          ) : (
            <>
              <DateComponent date={startDate} /> -{" "}
              <DateComponent date={endDate} />
            </>
          )}
        </div>
      </div>
      {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
      {summary && <span>{summary}</span>}
      {highlights && (
        <ul className={styles.highlights}>
          {highlights.map((highlight, index) => (
            <li key={index}>
              <ReactMarkdown>{highlight}</ReactMarkdown>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
