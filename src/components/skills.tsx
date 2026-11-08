import type { ResumeType } from "../schema";
import { Section } from "./section";
import styles from "./skills.module.css";

export function Skills({ skills }: { skills: ResumeType["skills"] }) {
  return (
    <Section title="Skills">
      <dl className={styles.list}>
        {skills.map((skill, index) => (
          <div key={index} className={styles.skill}>
            <dt className={styles.name}>{skill.name}:</dt>
            <dd className={styles.keywords}>{skill.keywords.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
