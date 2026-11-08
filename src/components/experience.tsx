import { DateComponent } from "./date";
import ReactMarkdown from "react-markdown";
import styles from "./experience.module.css";
import type { PartialDate } from "../schema";

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
    <article className={styles.experience}>
      <header className={styles.meta}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.dateRange}>
          <DateComponent date={startDate} />
          <span aria-hidden="true"> &ndash; </span>
          <DateComponent date={endDate} />
        </div>
      </header>
      {subTitle && <p className={styles.subTitle}>{subTitle}</p>}
      {summary && (
        <div className={styles.summary}>
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      )}
      {highlights && (
        <ul className={styles.highlights}>
          {highlights.map((highlight, index) => (
            <li key={index}>
              <ReactMarkdown>{highlight}</ReactMarkdown>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
