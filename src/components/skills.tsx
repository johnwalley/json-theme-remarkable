import { ResumeType } from "../App";
import { Section } from "./section";
import styles from "./skills.module.css";

export function Skills({ skills }: { skills: ResumeType["skills"] }) {
  return (
    <Section title="Skills">
      {skills.map((skill, index) => (
        <div key={index} className={styles.skill}>
          <div className={styles.name}>{skill.name}:</div>
          <div>{skill.keywords.join(", ")}</div>
        </div>
      ))}
    </Section>
  );
}
