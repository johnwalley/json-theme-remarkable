import { DateComponent } from "./date";
import ReactMarkdown from "react-markdown";
import styles from "./experience.module.css";
import { PartialDate } from "../App";

type ExperienceProps = {
  title: string;
  startDate?: PartialDate;
  endDate?: PartialDate;
  subTitle?: string;
  summary?: string;
  highlights?: string[];
};

export function Experience({
  title,
  startDate,
  endDate,
  subTitle,
  summary,
  highlights,
}: ExperienceProps) {
  return (
    <div className={styles.experience}>
      <div className={styles.meta}>
        <div className={styles.title}>{title}</div>
        <div className={styles.dateRange}>
          <DateComponent date={startDate} />
          <span aria-hidden="true"> &ndash; </span>
          <DateComponent date={endDate} />
        </div>
      </div>
      {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
      {summary && <div className={styles.summary}>{summary}</div>}
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
