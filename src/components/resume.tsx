import { Experience } from "./experience";
import ReactMarkdown from "react-markdown";
import { Hero } from "./hero";
import type { ResumeType } from "../schema";
import { Section } from "./section";
import { Skills } from "./skills";
import styles from "./resume.module.css";

type Education = ResumeType["education"][number];

/** e.g. "MMath in Mathematics (First)", tolerating any part missing. */
function educationSubtitle({ studyType, area, score }: Education) {
  const degree =
    studyType && area ? `${studyType} in ${area}` : (studyType ?? area);
  if (degree && score) return `${degree} (${score})`;
  return degree ?? score;
}

export function Resume({ resume }: { resume: ResumeType }) {
  const { basics, work, skills, education } = resume;

  return (
    <main className={styles.layout}>
      <Hero basics={basics} />
      {basics.summary && (
        <div className={styles.summary}>
          <ReactMarkdown>{basics.summary}</ReactMarkdown>
        </div>
      )}
      {work.length > 0 && (
        <Section title="Experience">
          {work.map((job, index) => (
            <Experience
              key={index}
              title={job.name}
              startDate={job.startDate}
              endDate={job.endDate}
              subTitle={job.position}
              summary={job.summary}
              highlights={job.highlights}
            />
          ))}
        </Section>
      )}
      {skills.length > 0 && <Skills skills={skills} />}
      {education.length > 0 && (
        <Section title="Education">
          {education.map((degree, index) => (
            <Experience
              key={index}
              title={degree.institution}
              startDate={degree.startDate}
              endDate={degree.endDate}
              subTitle={educationSubtitle(degree)}
              summary={degree.summary}
              highlights={degree.highlights}
            />
          ))}
        </Section>
      )}
    </main>
  );
}
