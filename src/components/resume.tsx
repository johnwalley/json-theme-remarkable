import { Experience } from "./experience";
import { Hero } from "./hero";
import { ResumeType } from "../App";
import { Section } from "./section";
import { Skills } from "./skills";
import styles from "./resume.module.css";

export function Resume({ resume }: { resume: ResumeType }) {
  return (
    <div className={styles.layout}>
      <Hero basics={resume.basics} />
      <div className={styles.summary}>{resume.basics.summary}</div>
      <Section title="Experience">
        {resume.work.map((job, index) => {
          return (
            <Experience
              key={index}
              title={job.name}
              startDate={job.startDate}
              endDate={job.endDate}
              subTitle={job.position}
              summary={job.summary}
              highlights={job.highlights}
            />
          );
        })}
      </Section>
      <Skills skills={resume.skills} />
      <Section title="Education">
        {resume.education.map((degree, index) => {
          let subTitle = degree.area
            ? `${degree.studyType} in ${degree.area}`
            : degree.studyType;

          if (degree.score) {
            subTitle = `${subTitle} (${degree.score})`;
          }

          return (
            <Experience
              key={index}
              title={degree.institution}
              startDate={degree.startDate}
              endDate={degree.endDate}
              subTitle={subTitle}
              summary={degree.summary}
              highlights={degree.highlights}
            />
          );
        })}
      </Section>
    </div>
  );
}
